// ...existing code...
import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';

const router = Router();

// Create category
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

// Get single category by slug
router.get('/:slug', getCategoryBySlug);

// Update category by id
router.put('/:id', updateCategory);

// Delete category by id
router.delete('/:id', deleteCategory);

export default router;
// ...existing code...