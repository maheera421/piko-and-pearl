import { Request, Response, NextFunction } from 'express';

/**
 * Basic validator middleware for creating a product.
 * Ensures required fields exist. Returns 400 with missingFields if any.
 */
export function validateProduct(req: Request, res: Response, next: NextFunction) {
  const required = ['name', 'category', 'slug', 'sku', 'price', 'stock'];
  const missing: string[] = required.filter((f) => {
    const v = req.body?.[f];
    return v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
  });

  if (missing.length > 0) {
    return res.status(400).json({ message: 'Missing required fields', missingFields: missing });
  }

  next();
}

/**
 * Validator middleware for updating a product.
 * Accepts partial updates; validates numeric fields if present.
 */
export function validateProductUpdate(req: Request, res: Response, next: NextFunction) {
  const errors: string[] = [];

  if (req.body.price !== undefined && isNaN(Number(req.body.price))) errors.push('price must be numeric');
  if (req.body.previousPrice !== undefined && isNaN(Number(req.body.previousPrice))) errors.push('previousPrice must be numeric');
  if (req.body.stock !== undefined && !Number.isInteger(Number(req.body.stock))) errors.push('stock must be an integer');

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
}

export default validateProduct;