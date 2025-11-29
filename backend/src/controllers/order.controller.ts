import { Request, Response } from 'express';
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
} from '../services/order.service';
import mongoose, { Schema, model, models } from 'mongoose';

// ----------------------
// Counter model for unique orderNumber (minimal typing)
// ----------------------
const CounterSchema = new Schema(
  { _id: { type: String, required: true }, seq: { type: Number, required: true, default: 0 } },
  { collection: 'counters', versionKey: false }
);

function getCounterModel(): mongoose.Model<any> {
  const existing = (models as any)['Counter'];
  if (existing) return existing as mongoose.Model<any>;
  return (model as any)('Counter', CounterSchema) as mongoose.Model<any>;
}

// ----------------------
// Atomic order number generator
// ----------------------
async function getNextOrderNumber(): Promise<string> {
  const Counter = getCounterModel();
  const res: any = await Counter.findOneAndUpdate(
    { _id: 'orderNumber' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  ).lean();
  const seq = res?.seq ?? 1;
  return String(seq).padStart(4, '0'); // e.g., "0001"
}

// ----------------------
// Create Order
// ----------------------
export async function createOrder(req: Request, res: Response) {
  try {
    const { customerDetails, items, paymentMethod, total, customerId } = req.body;

    if (
      !customerDetails?.fullName ||
      !customerDetails?.email ||
      !customerDetails?.phoneNumber ||
      !customerDetails?.address ||
      !customerDetails?.city ||
      !customerDetails?.country
    ) {
      return res.status(400).json({ message: 'Missing required customer details' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items required' });
    }

    if (paymentMethod !== 'COD' && paymentMethod !== 'Online') {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    if (typeof total !== 'number' || !Number.isFinite(total) || total < 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    let orderNumber = await getNextOrderNumber();

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const order = await createOrderService({
          customerDetails,
          items,
          paymentMethod,
          total,
          customerId,
          orderNumber,
        });

        return res.status(201).json(order);
      } catch (e: any) {
        if (e?.code === 11000 && e?.keyPattern?.orderNumber) {
          orderNumber = await getNextOrderNumber();
          continue;
        }
        throw e;
      }
    }

    return res.status(500).json({ message: 'Failed to generate unique order number' });
  } catch (e: any) {
    console.error('createOrder error', e);
    return res.status(500).json({ message: e.message });
  }
}

// ----------------------
// Get all orders
// ----------------------
export async function getAllOrders(_req: Request, res: Response) {
  try {
    const orders = await getAllOrdersService();
    return res.json(orders);
  } catch (e: any) {
    console.error('getAllOrders error', e);
    return res.status(500).json({ message: e.message });
  }
}

// ----------------------
// Get one order by ID
// ----------------------
export async function getOrder(req: Request, res: Response) {
  try {
    const order = await getOrderByIdService(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    return res.json(order);
  } catch (e: any) {
    console.error('getOrder error', e);
    return res.status(500).json({ message: e.message });
  }
}

// ----------------------
// Update order
// ----------------------
export async function updateOrder(req: Request, res: Response) {
  try {
    const updated = await updateOrderService(req.params.id, {
      orderStatus: req.body.orderStatus,
      paymentStatus: req.body.paymentStatus,
    });

    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json(updated);
  } catch (e: any) {
    console.error('updateOrder error', e);
    return res.status(500).json({ message: e.message });
  }
}
