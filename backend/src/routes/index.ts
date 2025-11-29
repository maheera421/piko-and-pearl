import { Router } from 'express';
import categoryRoutes from './category.routes';
import productRoutes from './product.routes';
import customerRoutes from './customer.routes'; // <-- add this

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes); // <-- mount the customer routes

export default router;
