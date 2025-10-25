import mongoose, { Schema, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  mainHeading?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[]; // changed to array
  createdAt?: Date;
  updatedAt?: Date;
}

// Replace the generic-typed Schema with a non-generic one to avoid TS2590
const CategorySchema = new mongoose.Schema<any>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  image: { type: String, trim: true },
  mainHeading: { type: String, maxlength: 120, trim: true },
  content: { type: String, maxlength: 1000, trim: true },
  metaTitle: { type: String, maxlength: 60, trim: true },
  metaDescription: { type: String, maxlength: 160, trim: true },
  keywords: { type: [String], default: [] }, // array of strings
}, { timestamps: true });

// Export model using any to avoid complex type inference
export default mongoose.model<any>('Category', CategorySchema);