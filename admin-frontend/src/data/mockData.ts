// Mock data for Piko & Pearl Admin Dashboard

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  featured: boolean;
  image: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: Date;
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  customerType: 'new' | 'repeat' | 'vip';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: Date;
  status: 'active' | 'inactive';
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  maxUses: number | null;
  currentUses: number;
  validFrom: Date;
  validTo: Date;
  status: 'active' | 'inactive';
  description: string;
  firstTimeOnly: boolean;
}

export interface CustomOrder {
  id: string;
  customOrderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  submissionDate: Date;
  status: 'submitted' | 'in-review' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  budgetMin: number;
  budgetMax: number;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  description: string;
  requirements: string;
  referenceImages: string[];
}

export interface Activity {
  id: string;
  type: 'order' | 'product' | 'customer' | 'custom-order';
  description: string;
  timestamp: Date;
  icon: string;
}

// Products Mock Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handmade Crochet Sunflower Bouquet',
    category: 'Flowers',
    sku: 'PIKO-FLOWER-001',
    price: 2500,
    stock: 15,
    featured: true,
    image: 'https://images.unsplash.com/photo-1753366556702-d28165fc88bc?w=400&q=80',
    description: 'Beautiful handmade crochet sunflower bouquet perfect for any occasion',
    status: 'active'
  },
  {
    id: '2',
    name: 'Crochet Rose Bundle',
    category: 'Flowers',
    sku: 'PIKO-FLOWER-002',
    price: 1800,
    discountPrice: 1500,
    stock: 25,
    featured: true,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    description: 'Elegant crochet roses in various colors',
    status: 'active'
  },
  {
    id: '3',
    name: 'Tulip Crochet Flowers Set',
    category: 'Flowers',
    sku: 'PIKO-FLOWER-003',
    price: 2200,
    stock: 10,
    featured: false,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    description: 'Spring-inspired tulip crochet flowers',
    status: 'active'
  },
  {
    id: '4',
    name: 'Crochet Tote Bag - Purple',
    category: 'Bags',
    sku: 'PIKO-BAG-001',
    price: 3000,
    stock: 8,
    featured: true,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
    description: 'Spacious handmade crochet tote bag in purple',
    status: 'active'
  },
  {
    id: '5',
    name: 'Mini Crochet Crossbody Bag',
    category: 'Bags',
    sku: 'PIKO-BAG-002',
    price: 2800,
    stock: 12,
    featured: false,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    description: 'Cute mini crossbody bag for daily use',
    status: 'active'
  },
  {
    id: '6',
    name: 'Crochet Beach Bag',
    category: 'Bags',
    sku: 'PIKO-BAG-003',
    price: 3500,
    stock: 6,
    featured: true,
    image: 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=400',
    description: 'Large beach bag perfect for summer',
    status: 'active'
  },
  {
    id: '7',
    name: 'Flower Bag Charm - Lavender',
    category: 'Bag Charms',
    sku: 'PIKO-CHARM-001',
    price: 800,
    stock: 30,
    featured: true,
    image: 'https://images.unsplash.com/photo-1753370241607-5d48d8aaa70e?w=400&q=80',
    description: 'Adorable flower bag charm in lavender',
    status: 'active'
  },
  {
    id: '8',
    name: 'Butterfly Bag Charm',
    category: 'Bag Charms',
    sku: 'PIKO-CHARM-002',
    price: 900,
    stock: 20,
    featured: false,
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400',
    description: 'Delicate butterfly charm for bags',
    status: 'active'
  },
  {
    id: '9',
    name: 'Strawberry Bag Charm',
    category: 'Bag Charms',
    sku: 'PIKO-CHARM-003',
    price: 750,
    stock: 35,
    featured: true,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
    description: 'Sweet strawberry charm',
    status: 'active'
  },
  {
    id: '10',
    name: 'Floral Crochet Bandana - Pink',
    category: 'Bandanas',
    sku: 'PIKO-BAND-001',
    price: 1200,
    stock: 18,
    featured: false,
    image: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=400',
    description: 'Comfortable floral bandana',
    status: 'active'
  },
  {
    id: '11',
    name: 'Crochet Hair Scrunchie Set',
    category: 'Accessories',
    sku: 'PIKO-ACC-001',
    price: 600,
    stock: 40,
    featured: true,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    description: 'Set of 3 crochet scrunchies',
    status: 'active'
  },
  {
    id: '12',
    name: 'Crochet Keychain Flowers',
    category: 'Accessories',
    sku: 'PIKO-ACC-002',
    price: 500,
    stock: 50,
    featured: false,
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400',
    description: 'Mini flower keychains',
    status: 'active'
  }
];

// Orders Mock Data
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#5432',
    customerName: 'Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+92 300 1234567',
    date: new Date('2024-11-15T14:30:00'),
    status: 'delivered',
    paymentStatus: 'paid',
    total: 5300,
    customerType: 'repeat',
    shippingAddress: '123 Main St, Lahore, Punjab, Pakistan',
    items: [
      {
        productId: '1',
        productName: 'Handmade Crochet Sunflower Bouquet',
        quantity: 2,
        price: 2500,
        image: 'https://images.unsplash.com/photo-1753366556702-d28165fc88bc?w=400&q=80'
      }
    ]
  },
  {
    id: '2',
    orderNumber: '#5433',
    customerName: 'Fatima Khan',
    email: 'fatima.k@email.com',
    phone: '+92 301 9876543',
    date: new Date('2024-11-16T10:00:00'),
    status: 'processing',
    paymentStatus: 'paid',
    total: 3800,
    customerType: 'new',
    shippingAddress: '456 Garden Ave, Karachi, Sindh, Pakistan',
    items: [
      {
        productId: '4',
        productName: 'Crochet Tote Bag - Purple',
        quantity: 1,
        price: 3000,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'
      },
      {
        productId: '7',
        productName: 'Flower Bag Charm - Lavender',
        quantity: 1,
        price: 800,
        image: 'https://images.unsplash.com/photo-1753370241607-5d48d8aaa70e?w=400&q=80'
      }
    ]
  },
  {
    id: '3',
    orderNumber: '#5434',
    customerName: 'Ayesha Malik',
    email: 'ayesha.m@email.com',
    phone: '+92 333 5555555',
    date: new Date('2024-11-17T15:45:00'),
    status: 'pending',
    paymentStatus: 'pending',
    total: 2200,
    customerType: 'repeat',
    shippingAddress: '789 Rose Lane, Islamabad, Pakistan',
    items: [
      {
        productId: '3',
        productName: 'Tulip Crochet Flowers Set',
        quantity: 1,
        price: 2200,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400'
      }
    ]
  },
  {
    id: '4',
    orderNumber: '#5435',
    customerName: 'Zainab Hassan',
    email: 'zainab.h@email.com',
    phone: '+92 321 7777777',
    date: new Date('2024-11-18T09:20:00'),
    status: 'shipped',
    paymentStatus: 'paid',
    total: 4350,
    customerType: 'vip',
    shippingAddress: '321 Flower St, Faisalabad, Punjab, Pakistan',
    items: [
      {
        productId: '6',
        productName: 'Crochet Beach Bag',
        quantity: 1,
        price: 3500,
        image: 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=400'
      },
      {
        productId: '8',
        productName: 'Butterfly Bag Charm',
        quantity: 1,
        price: 900,
        image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400'
      }
    ]
  },
  {
    id: '5',
    orderNumber: '#5436',
    customerName: 'Mariam Ali',
    email: 'mariam.ali@email.com',
    phone: '+92 345 2222222',
    date: new Date('2024-11-19T11:30:00'),
    status: 'approved',
    paymentStatus: 'paid',
    total: 1500,
    customerType: 'new',
    shippingAddress: '654 Pearl Ave, Multan, Punjab, Pakistan',
    items: [
      {
        productId: '2',
        productName: 'Crochet Rose Bundle',
        quantity: 1,
        price: 1500,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'
      }
    ]
  }
];

// Customers Mock Data
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+92 300 1234567',
    totalOrders: 8,
    totalSpent: 24500,
    memberSince: new Date('2024-08-15'),
    status: 'active'
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima.k@email.com',
    phone: '+92 301 9876543',
    totalOrders: 1,
    totalSpent: 3800,
    memberSince: new Date('2024-11-16'),
    status: 'active'
  },
  {
    id: '3',
    name: 'Ayesha Malik',
    email: 'ayesha.m@email.com',
    phone: '+92 333 5555555',
    totalOrders: 5,
    totalSpent: 15600,
    memberSince: new Date('2024-09-20'),
    status: 'active'
  },
  {
    id: '4',
    name: 'Zainab Hassan',
    email: 'zainab.h@email.com',
    phone: '+92 321 7777777',
    totalOrders: 12,
    totalSpent: 45600,
    memberSince: new Date('2024-06-10'),
    status: 'active'
  }
];

// Discount Codes Mock Data
export const mockDiscountCodes: DiscountCode[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 1000,
    maxUses: 100,
    currentUses: 45,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-12-31'),
    status: 'active',
    description: 'Welcome discount for first-time customers',
    firstTimeOnly: true
  },
  {
    id: '2',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minPurchase: 2000,
    maxUses: 50,
    currentUses: 50,
    validFrom: new Date('2024-06-01'),
    validTo: new Date('2024-08-31'),
    status: 'inactive',
    description: 'Summer sale discount',
    firstTimeOnly: false
  },
  {
    id: '3',
    code: 'FIRST15',
    type: 'percentage',
    value: 15,
    minPurchase: 500,
    maxUses: null,
    currentUses: 89,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    status: 'active',
    description: 'First purchase discount',
    firstTimeOnly: false
  },
  {
    id: '4',
    code: 'PIKO25',
    type: 'percentage',
    value: 25,
    minPurchase: 3000,
    maxUses: null,
    currentUses: 34,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    status: 'active',
    description: 'Special Piko & Pearl offer',
    firstTimeOnly: false
  }
];

// Custom Orders Mock Data
export const mockCustomOrders: CustomOrder[] = [
  {
    id: '1',
    customOrderNumber: 'CO-001',
    customerName: 'Hira Siddiqui',
    email: 'hira.s@email.com',
    phone: '+92 311 8888888',
    submissionDate: new Date('2024-11-10'),
    status: 'in-progress',
    budgetMin: 3000,
    budgetMax: 5000,
    deadline: new Date('2024-12-15'),
    priority: 'high',
    description: 'Need a custom crochet wedding bouquet with white and pink roses',
    requirements: 'Must include pearls and ribbons',
    referenceImages: []
  },
  {
    id: '2',
    customOrderNumber: 'CO-002',
    customerName: 'Amna Tariq',
    email: 'amna.t@email.com',
    phone: '+92 322 9999999',
    submissionDate: new Date('2024-11-12'),
    status: 'submitted',
    budgetMin: 2000,
    budgetMax: 3500,
    deadline: new Date('2024-12-20'),
    priority: 'medium',
    description: 'Custom tote bag in mint green color',
    requirements: 'Add name embroidery',
    referenceImages: []
  }
];

// Activity Feed Mock Data
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'order',
    description: 'New order #5436 received from Mariam Ali',
    timestamp: new Date('2024-11-19T11:30:00'),
    icon: 'ShoppingBag'
  },
  {
    id: '2',
    type: 'order',
    description: 'Order #5435 shipped to Zainab Hassan',
    timestamp: new Date('2024-11-18T14:20:00'),
    icon: 'Truck'
  },
  {
    id: '3',
    type: 'product',
    description: 'Stock low for Crochet Beach Bag (6 left)',
    timestamp: new Date('2024-11-18T10:15:00'),
    icon: 'AlertTriangle'
  },
  {
    id: '4',
    type: 'custom-order',
    description: 'New custom order request CO-002 from Amna Tariq',
    timestamp: new Date('2024-11-12T16:45:00'),
    icon: 'Gift'
  },
  {
    id: '5',
    type: 'customer',
    description: 'New customer Fatima Khan registered',
    timestamp: new Date('2024-11-16T09:30:00'),
    icon: 'User'
  }
];

export const categories = [
  { id: '1', name: 'Flowers', slug: 'flowers', icon: '🌸', productCount: 3 },
  { id: '2', name: 'Bags', slug: 'bags', icon: '👜', productCount: 3 },
  { id: '3', name: 'Bag Charms', slug: 'bag-charms', icon: '🔑', productCount: 3 },
  { id: '4', name: 'Bandanas', slug: 'bandanas', icon: '🎀', productCount: 1 },
  { id: '5', name: 'Accessories', slug: 'accessories', icon: '✨', productCount: 2 },
];
