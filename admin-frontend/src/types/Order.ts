export interface OrderItem {
  productName: string;
  category: string;
  quantity: number;
  price: number;
  subtotal: number;
  image?: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  paymentMethod: 'COD' | 'Online';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
}
