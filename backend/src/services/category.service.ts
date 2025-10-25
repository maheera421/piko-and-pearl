import { Category } from '../models/category.model';
import { ICategory } from '../types/index.d';

export const createCategory = async (categoryData: ICategory) => {
  const category = new Category(categoryData);
  return await category.save();
};

export const getAllCategories = async () => {
  return await Category.find();
};

export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

export const updateCategory = async (id: string, categoryData: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, categoryData, { new: true });
};

export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};