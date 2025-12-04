import { Router } from 'express';
import categoryRoutes from './category.routes';
import productRoutes from './product.routes';
import customerRoutes from './customer.routes'; // <-- add this
import orderRoutes from './order.routes'; // <-- add this
import paymentRouter from './payment'; // <-- add this

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes); // <-- mount the customer routes
router.use('/orders', orderRoutes); // <-- mount the orders routes
router.use('/payment', paymentRouter); // <-- mount Stripe payment routes

export default router;
