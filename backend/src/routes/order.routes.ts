import { Router } from 'express';
// FIX: ensure plural 'controllers'
import { createOrder, getAllOrders, getOrder, updateOrder } from '../controllers/order.controller';
import * as orderService from '../services/order.service';

const router = Router();

router.post('/create', createOrder);
// Return all orders on both /all and /
router.get('/all', getAllOrders);
router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);

router.post('/recompute-customer', async (req, res) => {
  try {
    const { email, fullName } = req.body || {};
    if (!email) return res.status(400).json({ success: false, message: 'email required' });
    await orderService.recomputeCustomerStatsByEmail(String(email), fullName ? String(fullName) : undefined);
    return res.json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e?.message || 'server error' });
  }
});

export default router;
