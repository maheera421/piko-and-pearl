import * as ProductModule from '../models/product.model';
// Try to obtain model (works whether model is exported as named 'Product' or default)
const Product: any = (ProductModule as any).Product ?? (ProductModule as any).default ?? ProductModule;

// Avoid strict type coupling until model/types are aligned
export const createProduct = async (productData: any): Promise<any> => {
  const product = new Product(productData);
  return await product.save();
};

export const getAllProducts = async (): Promise<any[]> => {
  return await Product.find();
};

export const getProductById = async (id: string): Promise<any> => {
  const product = await Product.findById(id);
  if (!product) {
    // throw a plain error — leave custom error handling to middleware
    throw new Error('Product not found');
  }
  return product;
};

export const updateProduct = async (id: string, productData: any): Promise<any> => {
  const product = await Product.findByIdAndUpdate(id, productData, { new: true });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};