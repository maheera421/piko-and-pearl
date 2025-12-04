import type { Request, Response } from "express";
import Stripe from "stripe";
import fetch from "node-fetch";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey as string, { apiVersion: "2025-11-17.clover" });

// Helper to get backend base URL (same host handling proxies)
const getBackendBase = (req: Request) => `${req.protocol}://${req.get("host")}`;

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const {
      lineItems,
      customerDetails,
      success_redirect,
      cancel_url,
      total,
    } = req.body as {
      lineItems: { name: string; price: number; quantity: number }[];
      customerDetails: {
        fullName: string;
        email: string;
        phoneNumber: string;
        address: string;
        city: string;
        postalCode?: string;
        country: string;
      };
      success_redirect: string; // final frontend URL
      cancel_url: string;
      total: number;
    };

    if (!stripeSecretKey) return res.status(500).json({ error: "Stripe secret key not configured." });
    if (!Array.isArray(lineItems) || lineItems.length === 0) return res.status(400).json({ error: "lineItems required" });
    if (!success_redirect || !cancel_url) return res.status(400).json({ error: "success_redirect and cancel_url required" });

    // Build absolute success URL to our backend handler that will create the order then redirect to frontend
    const backendBase = getBackendBase(req);
    const success_url = `${backendBase}/api/payment/success?redirect=${encodeURIComponent(success_redirect)}&session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "pkr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
      })),
      success_url,
      cancel_url,
      customer_email: customerDetails?.email,
      shipping_address_collection: { allowed_countries: ["PK"] },
      metadata: {
        // Persist minimal order payload in metadata so the success handler can reconstruct the order
        customerDetails: JSON.stringify(customerDetails || {}),
        total: String(total || 0),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err?.message || "Stripe error" });
  }
};

export const handleCheckoutSuccess = async (req: Request, res: Response) => {
  try {
    const { session_id, redirect } = req.query as { session_id?: string; redirect?: string };
    if (!session_id || !redirect) {
      return res.status(400).send("Missing session_id or redirect.");
    }

    // Retrieve session (confirm paid status and get metadata)
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] });
    if (session.payment_status !== "paid") {
      // Not paid; send to cancel or home
      return res.redirect(redirect as string);
    }

    // Build order payload from metadata and line items
    let customerDetails: any = {};
    try {
      customerDetails = session.metadata?.customerDetails ? JSON.parse(session.metadata.customerDetails) : {};
    } catch {
      customerDetails = {};
    }

    const items =
      session.line_items?.data.map((li: any) => ({
        productName: li.price?.product?.name || li.description || "Item",
        category: "Stripe", // category unknown here
        quantity: li.quantity || 1,
        price: Math.round((li.price?.unit_amount || 0) / 100),
      })) || [];

    const total = Number(session.metadata?.total || Math.round((session.amount_total || 0) / 100));

    const payload = {
      customerDetails,
      items,
      paymentMethod: "Online",
      total,
      // If your orders API supports optional customerId, you can pass it here via metadata in the future
    };

    // Call your existing orders create endpoint so the order lands in MongoDB using your current logic
    const backendBase = getBackendBase(req);
    const resp = await fetch(`${backendBase}/api/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Failed to create order after Stripe success:", errText);
      // Redirect anyway (without order number)
      return res.redirect(redirect as string);
    }

    const data: any = await resp.json();
    const orderNumber = data?.orderNumber as string | number | undefined;

    const url = new URL(redirect as string);
    if (orderNumber !== undefined) {
      url.searchParams.set("orderNumber", String(orderNumber));
      url.searchParams.set("orderPlaced", "true");
    }
    return res.redirect(url.toString());
  } catch (err: any) {
    console.error("Stripe success handler error:", err);
    // Fallback redirect
    const redirect = typeof req.query.redirect === "string" ? req.query.redirect : "/";
    return res.redirect(redirect);
  }
};
