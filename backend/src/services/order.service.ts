import { Order } from '../models/order.model';
import mongoose from 'mongoose';

// Loose Customer model to avoid TS union issues
const Customer: any =
  (mongoose as any).models?.Customer ||
  (mongoose as any).model(
    'Customer',
    new (mongoose as any).Schema({}, { strict: false })
  );

interface OrderItemInput {
  productName: string;
  category: string;
  quantity: number;
  price: number;
}

interface CreateOrderInput {
  customerDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
  };
  items: OrderItemInput[];
  paymentMethod: 'COD' | 'Online';
  total: number;
  customerId?: string;
  orderNumber?: string;
}

export async function recomputeCustomerStatsByEmail(email: string, fullName?: string) {
  if (!email) return;
  const docs = await Order.find({ 'customerDetails.email': email })
    .select('total customerDetails createdAt')
    .lean()
    .exec();
  const totalOrders = docs.length;
  const totalSpent = docs.reduce((sum: number, o: any) => sum + Number(o.total || 0), 0);
  const type = totalOrders > 1 ? 'Returning' : 'New';
  const memberSince = docs.length ? docs[docs.length - 1]?.createdAt : undefined;

  await Customer.updateOne(
    { email },
    {
      $set: {
        email,
        fullName: fullName || docs[0]?.customerDetails?.fullName || email,
        totalOrders,
        totalSpent,
        type,
        ...(memberSince ? { memberSince } : {}),
      },
    },
    { upsert: true }
  ).exec();
}

function docToPlain(d: any) {
  const o = d.toObject ? d.toObject() : d;
  const itemsArr = Array.isArray(o.items)
    ? o.items.map((it: any) => ({
        ...it,
        subtotal: (it.price || 0) * (it.quantity || 0),
      }))
    : [];
  return {
    id: o._id,            // alias for frontend table libs
    _id: o._id,
    orderNumber: o.orderNumber,
    customerDetails: o.customerDetails,
    customerName: o.customerDetails?.fullName || '',      // alias
    items: itemsArr,
    itemsCount: itemsArr.length,                          // alias
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    paymentStatusLower: (o.paymentStatus || '').toLowerCase(), // alias
    orderStatus: o.orderStatus,
    status: o.orderStatus,                                // alias
    total: o.total,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  };
}

// Create
export async function createOrderService(input: CreateOrderInput): Promise<any> {
  const paymentStatus = input.paymentMethod === 'COD' ? 'Pending' : 'Paid';
  const doc = await Order.create({
    customerId: input.customerId,
    customerDetails: input.customerDetails,
    items: input.items,
    paymentMethod: input.paymentMethod,
    paymentStatus,
    total: input.total,
    orderNumber: input.orderNumber,
  });

  // Immediate incremental update for customer totals
  try {
    await Customer.updateOne(
      { email: input.customerDetails.email },
      {
        $setOnInsert: {
          email: input.customerDetails.email,
          fullName: input.customerDetails.fullName,
          memberSince: doc.createdAt,
          type: 'New',
        },
        $inc: {
          totalOrders: 1,
          totalSpent: Number(input.total || 0),
        },
      },
      { upsert: true }
    ).exec();
  } catch {}

  // Robust recompute to correct any drift
  try {
    await recomputeCustomerStatsByEmail(input.customerDetails.email, input.customerDetails.fullName);
  } catch {}

  return docToPlain(doc);
}

// List all
export async function getAllOrdersService(): Promise<any[]> {
  const docs = await Order.find().sort({ createdAt: -1 }).lean().exec();
  return docs.map(docToPlain);
}

// Get one
export async function getOrderByIdService(id: string): Promise<any | null> {
  const doc = await Order.findById(id).lean().exec();
  return doc ? docToPlain(doc) : null;
}

// Update limited fields
export async function updateOrderService(
  id: string,
  update: { orderStatus?: string; paymentStatus?: string }
): Promise<any | null> {
  const allowedStatus = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
  const allowedPay = ['Paid', 'Pending'];
  const doc = await Order.findById(id).exec();
  if (!doc) return null;
  if (update.orderStatus && allowedStatus.includes(update.orderStatus)) {
    doc.orderStatus = update.orderStatus as any;
  }
  if (update.paymentStatus && allowedPay.includes(update.paymentStatus)) {
    doc.paymentStatus = update.paymentStatus as any;
  }
  await doc.save();

  // Recompute and persist customer stats
  try {
    const email = doc.customerDetails?.email;
    const name = doc.customerDetails?.fullName;
    await recomputeCustomerStatsByEmail(email, name);
  } catch {}

  return docToPlain(doc);
}
