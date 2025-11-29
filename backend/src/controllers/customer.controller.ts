import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as customerService from '../services/customer.service';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export async function signup(req: Request, res: Response) {
  try {
    console.log('POST /api/customers/signup body:', req.body); // <- debug log

    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    const existing = await customerService.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Account already exists' });
    }

    const customer = await customerService.createCustomer({ fullName, email, password });

    // create token and return it so client can auto-login
    try {
      const token = jwt.sign({ id: (customer as any)._id, email: (customer as any).email }, JWT_SECRET, { expiresIn: '7d' });
      const cust = customer.toObject ? (customer.toObject() as any) : customer;
      delete cust.password;
      delete cust.__v;
      return res.json({ success: true, token, customer: cust });
    } catch (tokenErr) {
      console.warn('signup: token creation failed', tokenErr);
      const cust = customer.toObject ? (customer.toObject() as any) : customer;
      delete cust.password;
      delete cust.__v;
      return res.json({ success: true, customer: cust }); // still return customer if token fails
    }
  } catch (err: any) {
    console.error('signup error', err);

    // Handle Mongo duplicate key error gracefully if it slipped through
    if (err && (err.code === 11000 || (err.name === 'MongoError' && err.code === 11000))) {
      return res.status(409).json({ success: false, message: 'Account already exists' });
    }

    // Return the error message to client for easier debugging (safe in dev)
    const msg = err?.message || 'Server error';
    return res.status(500).json({ success: false, message: msg });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const customer = await customerService.findByEmail(email);
    if (!customer) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const isMatch = await customerService.comparePassword(password, customer.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, { expiresIn: '7d' });
    const cust = customer.toObject ? (customer.toObject() as any) : customer;
    delete cust.password;
    delete cust.__v;

    return res.json({ success: true, token, customer: cust });
  } catch (err) {
    console.error('signin error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function getAll(_req: Request, res: Response) {
  try {
    const customers = await customerService.listAll();
    return res.json({ success: true, customers });
  } catch (err) {
    console.error('getAll customers error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
