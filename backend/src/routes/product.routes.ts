import { Router } from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { validateProduct, validateProductUpdate } from '../validators/product.validator';

const router = Router();

// Route to add a new product
router.post('/', validateProduct, addProduct);

// Route to get all products
router.get('/', getProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to update a product by ID (partial updates allowed)
router.put('/:id', validateProductUpdate, updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

export default router;