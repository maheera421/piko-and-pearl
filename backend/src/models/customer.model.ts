import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ICustomer {
  _id?: any;
  fullName: string;
  email: string;
  password: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: Date;
  type: string;
  toObject?: () => any;
  toJSON?: () => any;
}

const CustomerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    memberSince: { type: Date, default: Date.now },
    type: { type: String, default: 'New' }
  },
  { timestamps: true }
);

// Hash password before save
CustomerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    (this as any).password = await bcrypt.hash((this as any).password, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

// Remove sensitive fields for JSON responses
CustomerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Avoid generic type param to prevent TS2590
let CustomerModel: any;
if (mongoose.models && mongoose.models.Customer) {
  CustomerModel = mongoose.models.Customer;
} else {
  CustomerModel = mongoose.model('Customer', CustomerSchema);
}

export default CustomerModel;
