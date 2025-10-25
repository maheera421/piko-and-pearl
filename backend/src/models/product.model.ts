import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  previousPrice?: number;
  stock: number;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  rating?: number;
  reviews?: string[];
}

// Use Schema<any> and model<any> to avoid complex union type inference (TS2590)
const productSchema: Schema<any> = new Schema<any>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  previousPrice: { type: Number },
  stock: { type: Number, required: true },
  image1: { type: String, required: true },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  featured: { type: Boolean, default: false },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: [String] },
  rating: { type: Number, default: 0 },
  reviews: { type: [String] },
}, { timestamps: true });

// Export model using any to avoid complex type inference errors
export const Product = mongoose.model<any>('Product', productSchema);