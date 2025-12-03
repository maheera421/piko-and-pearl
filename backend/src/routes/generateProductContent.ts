import express from 'express';
import fetch from 'cross-fetch'; // <-- cross-fetch works in CommonJS & ESM

const router = express.Router();

type GenerateRequestBody = {
  productName: string;
  categoryName: string;
  keywords: string;
};

type GenerateResponse = {
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

// Type for OpenRouter response
type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      role?: string;
      content?: string;
    };
  }>;
};

router.post('/', async (req: express.Request, res: express.Response) => {
  const { productName, categoryName, keywords } = req.body as GenerateRequestBody;

  if (!productName || !categoryName || !keywords)
    return res.status(400).json({ error: 'productName, categoryName, and keywords are required.' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured.' });

  const prompt = `
You are an e-commerce SEO assistant.

Input:
- Product Name: ${productName}
- Category: ${categoryName}
- Existing Keywords: ${keywords}

Tasks:
1) Generate a detailed, compelling product description (150-250 words) suitable for an online store.
2) Generate an SEO-optimized Meta Title (<=60 chars) specific to this product.
3) Generate an SEO-optimized Meta Description (<=160 chars).
4) Suggest additional long-tail keywords relevant to the product and its category. Include brand-neutral, purchase-intent, and descriptive phrases.

Return strictly JSON with keys: description, metaTitle, metaDescription, suggestedKeywords.
Do not include markdown or commentary.
`;

  try {
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a helpful e-commerce SEO assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: `OpenRouter error: ${text}` });
    }

    const json = (await resp.json()) as OpenRouterChatResponse;
    const content = json?.choices?.[0]?.message?.content;

    if (!content || typeof content !== 'string') return res.status(500).json({ error: 'Empty AI response.' });

    let parsed: {
      description?: string;
      metaTitle?: string;
      metaDescription?: string;
      suggestedKeywords?: string | string[];
    } | null = null;

    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
    }

    if (!parsed || !parsed.description || !parsed.metaTitle || !parsed.metaDescription)
      return res.status(500).json({ error: 'Invalid AI response.' });

    const suggested = Array.isArray(parsed.suggestedKeywords)
      ? parsed.suggestedKeywords.join(', ')
      : parsed.suggestedKeywords ?? '';

    const combinedKeywords = [keywords, suggested]
      .filter(Boolean)
      .join(', ')
      .replace(/\s+,/g, ',')
      .replace(/,\s+/g, ', ')
      .trim();

    const result: GenerateResponse = {
      description: parsed.description,
      metaTitle: parsed.metaTitle,
      metaDescription: parsed.metaDescription,
      keywords: combinedKeywords,
    };

    return res.json(result);
  } catch (err: any) {
    console.error('generateProductContent error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to generate content.' });
  }
});

export default router;
