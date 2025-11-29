import { Router } from 'express';
import categoryRoutes from './category.routes';
import productRoutes from './product.routes';
import customerRoutes from './customer.routes'; // <-- add this
import orderRoutes from './order.routes'; // <-- add this

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes); // <-- mount the customer routes
router.use('/orders', orderRoutes); // <-- mount the orders routes

export default router;
