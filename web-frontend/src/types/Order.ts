export interface CheckoutItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface CreateOrderPayload {
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
  total: number;
}
