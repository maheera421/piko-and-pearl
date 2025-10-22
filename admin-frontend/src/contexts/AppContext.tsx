import React, { createContext, useContext, useState, ReactNode } from 'react';
import { categories as initialCategories, mockProducts, mockOrders } from '../data/mockData';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  h1Heading?: string;
  introParagraph?: string;
  displayOrder: number;
  active: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
  productNames: string[];
  createdAt: string;
}

interface Product {
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

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: Date;
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  total: number;
  customerType: string;
  shippingAddress: string;
  courierName?: string;
  trackingNumber?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

interface Notification {
  id: string;
  type: 'order' | 'product' | 'custom-order' | 'customer' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: any;
  color: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto: string;
}

interface PaymentMethods {
  cod: boolean;
  card: boolean;
  mastercard: boolean;
  jazzcash: boolean;
  easypaisa: boolean;
}

interface SocialAccount {
  id: string;
  platform: string;
  accountName: string;
  accountUrl: string;
  followers: string;
  posts: string;
  engagement: string;
  icon: string;
  color: string;
  connected: boolean;
  lastSync?: string;
}

interface AppContextType {
  categories: Category[];
  userProfile: UserProfile;
  paymentMethods: PaymentMethods;
  socialAccounts: SocialAccount[];
  addCategory: (category: Omit<Category, 'id' | 'displayOrder'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updatePaymentMethods: (methods: Partial<PaymentMethods>) => void;
  addSocialAccount: (account: Omit<SocialAccount, 'id'>) => void;
  updateSocialAccount: (id: string, account: Partial<SocialAccount>) => void;
  deleteSocialAccount: (id: string) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (categories: Category[]) => void;
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  getUnreadCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(
    initialCategories.map((cat, index) => ({
      ...cat,
      displayOrder: index + 1,
      active: true,
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      h1Heading: cat.name,
      introParagraph: '',
    }))
  );

  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@pikoandpearl.com',
    phone: '+92 300 1234567',
    profilePhoto: '',
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({
    cod: true,
    card: true,
    mastercard: false,
    jazzcash: false,
    easypaisa: false,
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    {
      id: '1',
      platform: 'Instagram',
      accountName: '@pikoandpearl',
      accountUrl: 'https://instagram.com/pikoandpearl',
      followers: '12.5K',
      posts: '234',
      engagement: '4.8%',
      icon: 'Instagram',
      color: '#E4405F',
      connected: true,
      lastSync: new Date().toISOString(),
    },
    {
      id: '2',
      platform: 'Facebook',
      accountName: 'Piko & Pearl',
      accountUrl: 'https://facebook.com/pikoandpearl',
      followers: '8.3K',
      posts: '156',
      engagement: '3.2%',
      icon: 'Facebook',
      color: '#1877F2',
      connected: true,
      lastSync: new Date().toISOString(),
    },
  ]);
  
  // Import icons for notifications
  const ShoppingBag = () => null;
  const AlertTriangle = () => null;
  const Gift = () => null;
  const CheckCircle = () => null;
  const User = () => null;
  const Package = () => null;

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #5436 from Mariam Ali - Rs.1,500',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      icon: ShoppingBag,
      color: '#2196F3',
    },
    {
      id: '2',
      type: 'product',
      title: 'Low Stock Alert',
      message: 'Crochet Beach Bag - Only 6 items left',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      icon: AlertTriangle,
      color: '#FF9800',
    },
    {
      id: '3',
      type: 'custom-order',
      title: 'New Custom Order Request',
      message: 'Custom order CO-002 from Amna Tariq',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      icon: Gift,
      color: '#9B7FD9',
    },
    {
      id: '4',
      type: 'order',
      title: 'Order Delivered',
      message: 'Order #5432 has been delivered to Sarah Ahmed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      icon: CheckCircle,
      color: '#4CAF50',
    },
    {
      id: '5',
      type: 'customer',
      title: 'New Customer Registration',
      message: 'Fatima Khan just registered',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      icon: User,
      color: '#4CAF50',
    },
    {
      id: '6',
      type: 'product',
      title: 'Product Out of Stock',
      message: 'Tulip Crochet Flowers Set is out of stock',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      read: true,
      icon: Package,
      color: '#F44336',
    },
  ]);

  const addCategory = (category: Omit<Category, 'id' | 'displayOrder'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      displayOrder: categories.length + 1,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const reorderCategories = (newOrder: Category[]) => {
    const reordered = newOrder.map((cat, index) => ({
      ...cat,
      displayOrder: index + 1,
    }));
    setCategories(reordered);
  };

  const addCollection = (collection: Omit<Collection, 'id' | 'createdAt'>) => {
    const newCollection: Collection = {
      ...collection,
      id: `col-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [newCollection, ...prev]);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) =>
      prev.map((col) => (col.id === id ? { ...col, ...updates } : col))
    );
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((col) => col.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...updates } : order))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  const updatePaymentMethods = (methods: Partial<PaymentMethods>) => {
    setPaymentMethods((prev) => ({ ...prev, ...methods }));
  };

  const addSocialAccount = (account: Omit<SocialAccount, 'id'>) => {
    const newAccount = {
      ...account,
      id: Date.now().toString(),
      connected: true,
      lastSync: new Date().toISOString(),
    };
    setSocialAccounts((prev) => [...prev, newAccount]);
  };

  const updateSocialAccount = (id: string, updates: Partial<SocialAccount>) => {
    setSocialAccounts((prev) =>
      prev.map((account) => (account.id === id ? { ...account, ...updates } : account))
    );
  };

  const deleteSocialAccount = (id: string) => {
    setSocialAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        collections,
        addCollection,
        updateCollection,
        deleteCollection,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrder,
        deleteOrder,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        getUnreadCount,
        userProfile,
        updateUserProfile,
        paymentMethods,
        updatePaymentMethods,
        socialAccounts,
        addSocialAccount,
        updateSocialAccount,
        deleteSocialAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
