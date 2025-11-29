import CustomerModel from '../models/customer.model';
import bcrypt from 'bcryptjs';

export async function createCustomer(payload: {
  fullName: string;
  email: string;
  password: string;
}): Promise<any> {
  const customer = new CustomerModel({
    fullName: payload.fullName,
    email: payload.email.toLowerCase(),
    password: payload.password,
    totalOrders: 0,
    totalSpent: 0,
    memberSince: new Date(),
    type: 'New',
  });
  await customer.save();
  return customer;
}

export async function findByEmail(email: string): Promise<any> {
  const result: any = await CustomerModel.findOne({ email: email.toLowerCase() });
  return result ?? null;
}

export async function findById(id: string): Promise<any> {
  const result: any = await CustomerModel.findById(id);
  return result ?? null;
}

export async function listAll(): Promise<any[]> {
  const docs: any = await CustomerModel.find().sort({ memberSince: -1 }).select('-password -__v');
  return (docs as any[]).map((d: any) => (d.toObject ? d.toObject() : d));
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/**
 * Call this when a customer completes an order.
 * Increments totalOrders and totalSpent, and updates type to "Returning" if applicable.
 */
export async function recordOrder(customerId: string, orderAmount: number): Promise<any> {
  const customer: any = await CustomerModel.findById(customerId);
  if (!customer) return null;

  customer.totalOrders = (customer.totalOrders || 0) + 1;
  customer.totalSpent = (customer.totalSpent || 0) + orderAmount;

  // Update type to "Returning" after first order
  if (customer.totalOrders >= 1 && customer.type === 'New') {
    customer.type = 'Returning';
  }

  await customer.save();
  return customer;
}
