import { Request, Response } from 'express';
import CategoryModel, { ICategory } from '../models/category.model';

/**
 * Create a new category
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    // read body as any to avoid complex union inference
    const body = req.body as any;
    const name: string = body.name;
    const slug: string = body.slug;
    const image: string | undefined = body.image;
    const mainHeading: string | undefined = body.mainHeading;
    const content: string | undefined = body.content;
    const metaTitle: string | undefined = body.metaTitle;
    const metaDescription: string | undefined = body.metaDescription;
    const keywords: any = body.keywords;

    if (!name || !slug) {
      return res.status(400).json({ message: 'name and slug are required' });
    }

    // convert keywords -> string[] (explicit loops to avoid complex union types)
    let keywordsArr: string[] = [];
    if (typeof keywords === 'string') {
      const parts = keywords.split(',');
      for (const part of parts) {
        const s = part.trim();
        if (s) keywordsArr.push(s);
      }
    } else if (Array.isArray(keywords)) {
      for (const k of keywords) {
        if (k === null || k === undefined) continue;
        const s = typeof k === 'string' ? k.trim() : String(k).trim();
        if (s) keywordsArr.push(s);
      }
    }

    // ensure slug uniqueness
    const existing = await (CategoryModel as any).findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: 'Category slug already exists' });
    }

    const categoryData: Partial<ICategory> = {
      name,
      slug,
      image,
      mainHeading,
      content,
      metaTitle,
      metaDescription,
      keywords: keywordsArr,
    };

    const category = await (CategoryModel as any).create(categoryData);
    return res.status(201).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || 'Server error' });
  }
};

/**
 * Get all categories
 */
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await (CategoryModel as any).find().sort({ name: 1 }).lean();
    return res.json(categories);
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || 'Server error' });
  }
};

/**
 * Get single category by slug
 */
export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await (CategoryModel as any).findOne({ slug }).lean();
    if (!category) return res.status(404).json({ message: 'Category not found' });
    return res.json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || 'Server error' });
  }
};

/**
 * Update category by id
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // read body as any to avoid complex union inference
    const body = req.body as any;
    const name: string | undefined = body.name;
    const slug: string | undefined = body.slug;
    const image: string | undefined = body.image;
    const mainHeading: string | undefined = body.mainHeading;
    const content: string | undefined = body.content;
    const metaTitle: string | undefined = body.metaTitle;
    const metaDescription: string | undefined = body.metaDescription;
    const keywords: any = body.keywords;

    // convert keywords -> string[] (explicit loops)
    let keywordsArr: string[] = [];
    if (typeof keywords === 'string') {
      const parts = keywords.split(',');
      for (const part of parts) {
        const s = part.trim();
        if (s) keywordsArr.push(s);
      }
    } else if (Array.isArray(keywords)) {
      for (const k of keywords) {
        if (k === null || k === undefined) continue;
        const s = typeof k === 'string' ? k.trim() : String(k).trim();
        if (s) keywordsArr.push(s);
      }
    }

    const update: Partial<ICategory> = {
      name,
      slug,
      image,
      mainHeading,
      content,
      metaTitle,
      metaDescription,
      keywords: keywordsArr,
    };

    const updated = await (CategoryModel as any).findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || 'Server error' });
  }
};

/**
 * Delete category by id
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await (CategoryModel as any).findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    return res.json({ message: 'Category deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || 'Server error' });
  }
};