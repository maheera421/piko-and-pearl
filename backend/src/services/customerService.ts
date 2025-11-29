import CustomerModel, { ICustomer } from '../models/customer.model';
import bcrypt from 'bcryptjs';

export async function createCustomer(payload: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ICustomer> {
  const customer = new CustomerModel({
    fullName: payload.fullName,
    email: payload.email.toLowerCase(),
    password: payload.password,
    totalOrders: 0,
    totalSpent: 0,
    memberSince: Date.now(),
    type: 'New'
  });
  await customer.save();
  return customer;
}

export async function findByEmail(email: string): Promise<ICustomer | null> {
  return CustomerModel.findOne({ email: email.toLowerCase() }).exec();
}

export async function listAll(): Promise<Partial<ICustomer>[]> {
  return CustomerModel.find().sort({ memberSince: -1 }).select('-password -__v').exec();
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export * from './customer.service';
