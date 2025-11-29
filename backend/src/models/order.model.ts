import mongoose, { Schema, /* Model, */ Document } from 'mongoose';

interface IOrderDocument extends Document {
  orderNumber: string;
  customerId?: mongoose.Types.ObjectId;
  customerDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
  };
  items: {
    productName: string;
    category: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'COD' | 'Online';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      country: { type: String, required: true },
    },
    items: [
      {
        productName: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    paymentMethod: { type: String, enum: ['COD', 'Online'], required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], required: true },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

// Use (mongoose as any).models to bypass complex union typing and avoid repeated global lookups
const Order =
  (mongoose as any).models?.Order ||
  mongoose.model('Order', OrderSchema);
export { Order };

OrderSchema.pre('save', async function (next) {
  if (this.isNew && !this.get('orderNumber')) {
    // Use the local Order model reference to avoid repeated global access
    const last: any = await Order
      .findOne({}, {}, { sort: { createdAt: -1 } })
      .select('orderNumber')
      .lean();
    const nextNum = last ? parseInt(last.orderNumber, 10) + 1 : 1;
    this.set('orderNumber', String(nextNum).padStart(4, '0'));
  }
  next();
});
