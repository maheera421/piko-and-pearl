import { Request, Response } from 'express';
import * as ProductService from '../services/product.service';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await ProductService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    // Log full error on server for debugging
    console.error('addProduct error:', error);

    // Handle Mongoose validation errors
    if (error && (error as any).name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: (error as any).errors });
    }

    // Handle duplicate key (unique index) errors
    if (error && (error as any).code === 11000) {
      // try to extract field that caused duplicate
      const key = Object.keys((error as any).keyValue || {}).join(', ');
      const msg = key ? `Duplicate value for field(s): ${key}` : 'Duplicate key error';
      return res.status(409).json({ message: msg, code: 11000, keyValue: (error as any).keyValue });
    }

    return res.status(500).json({ message: (error as any)?.message || 'Error adding product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await ProductService.updateProduct(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};