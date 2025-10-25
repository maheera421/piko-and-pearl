import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { categories as initialCategories, mockProducts, mockOrders } from '../data/mockData';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image?: string;
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
  previousPrice?: number;
  discountPrice?: number;
  stock: number;
  featured: boolean;
  image: string;
  images?: string[];
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  slug?: string;
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
  addCategory: (category: Omit<Category, 'id' | 'displayOrder'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<any>;
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
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<any>;
  deleteProduct: (id: string) => Promise<void>;
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
  const [products, setProducts] = useState<Product[]>(mockProducts as Product[]);
  const [orders, setOrders] = useState<Order[]>(mockOrders as Order[]);
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
  ]);

  const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:5000/api';

  useEffect(() => {
    (async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/products`),
        ]);

        const catData = catRes.ok ? await catRes.json() : [];
        const prodData = prodRes.ok ? await prodRes.json() : [];

        const counts: Record<string, number> = {};
        for (const p of prodData) {
          const key = p.category || '';
          if (!key) continue;
          counts[key] = (counts[key] || 0) + 1;
        }

        if (Array.isArray(catData)) {
          setCategories(
            catData.map((c: any, i: number) => ({
              id: c._id || c.id || `cat-${i}`,
              name: c.name,
              slug: c.slug,
              icon: c.image || '🌸',
              image: c.image || c.icon || '',
              productCount: counts[c.name] || 0,
              metaTitle: c.metaTitle || '',
              metaDescription: c.metaDescription || '',
              keywords: Array.isArray(c.keywords) ? c.keywords.join(', ') : (c.keywords || ''),
              h1Heading: c.mainHeading || c.name,
              introParagraph: c.content || '',
              displayOrder: i + 1,
              active: true,
            }))
          );
        }

        if (Array.isArray(prodData)) {
          setProducts(
            prodData.map((p: any) => ({
              id: p._id || p.id,
              name: p.name,
              category: p.category,
              slug: p.slug,
              sku: p.sku,
              price: p.price,
              previousPrice: p.previousPrice ?? undefined,
              metaTitle: p.metaTitle || '',
              metaDescription: p.metaDescription || '',
              keywords: Array.isArray(p.keywords) ? p.keywords.join(', ') : (p.keywords || ''),
              stock: p.stock ?? 0,
              featured: !!p.featured,
              image: p.image1 || p.image || '',
              images: [p.image1, p.image2, p.image3, p.image4].filter(Boolean),
              description: p.description || '',
              status: 'active',
            })) as Product[]
          );
        }
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  const addCategory = async (category: Omit<Category, 'id' | 'displayOrder'>) => {
    try {
      const keywordsArr = category.keywords
        ? category.keywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];

      const body = {
        name: category.name,
        slug: category.slug,
        image: (category as any).icon || undefined,
        mainHeading: (category as any).h1Heading || undefined,
        content: (category as any).introParagraph || undefined,
        metaTitle: category.metaTitle || undefined,
        metaDescription: category.metaDescription || undefined,
        keywords: keywordsArr,
      };

      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to create category');
      const created = await res.json();
      const newCategory: Category = {
        id: created._id || created.id || `cat-${Date.now()}`,
        name: created.name,
        slug: created.slug,
        icon: created.image || (category as any).icon || '🌸',
        image: created.image || (category as any).icon || '',
        productCount: 0,
        metaTitle: created.metaTitle || category.metaTitle || '',
        metaDescription: created.metaDescription || category.metaDescription || '',
        keywords: Array.isArray(created.keywords) ? created.keywords.join(', ') : (created.keywords || ''),
        h1Heading: created.mainHeading || category.h1Heading || created.name,
        introParagraph: created.content || category.introParagraph || '',
        displayOrder: categories.length + 1,
        active: true,
      };
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      throw err;
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      const keywordsArr = updates.keywords
        ? (updates.keywords as unknown as string).split(',').map(k => k.trim()).filter(Boolean)
        : undefined;

      const body: any = {
        name: updates.name,
        slug: updates.slug,
        image: (updates as any).image || (updates as any).icon,
        mainHeading: (updates as any).h1Heading,
        content: (updates as any).introParagraph,
        metaTitle: updates.metaTitle,
        metaDescription: updates.metaDescription,
      };
      if (keywordsArr) body.keywords = keywordsArr;

      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to update category');
      const updated = await res.json();
      setCategories(prev => prev.map((cat: Category) => cat.id === id ? {
        ...cat,
        name: updated.name ?? updates.name ?? cat.name,
        slug: updated.slug ?? updates.slug ?? cat.slug,
        icon: updated.image ?? (updates as any).icon ?? cat.icon,
        image: updated.image ?? (updates as any).image ?? cat.image,
        metaTitle: updated.metaTitle ?? updates.metaTitle ?? cat.metaTitle,
        metaDescription: updated.metaDescription ?? updates.metaDescription ?? cat.metaDescription,
        keywords: Array.isArray(updated.keywords) ? updated.keywords.join(', ') : (updates.keywords ?? cat.keywords),
        h1Heading: updated.mainHeading ?? (updates as any).h1Heading ?? cat.h1Heading,
        introParagraph: updated.content ?? (updates as any).introParagraph ?? cat.introParagraph,
      } : cat));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      throw err;
    }
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

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const imagesArr: string[] = (product as any).images ?? ((product as any).imagesFromForm ?? []);
      if (!imagesArr.length && (product as any).image) imagesArr.push((product as any).image);

      const body: any = {
        name: product.name,
        category: product.category,
        slug: (product as any).slug,
        sku: (product as any).sku,
        description: product.description,
        price: Number(product.price),
        previousPrice: (product as any).previousPrice !== undefined ? Number((product as any).previousPrice) : undefined,
        stock: Number(product.stock),
        image1: imagesArr[0] || (product as any).image,
        image2: imagesArr[1] || undefined,
        image3: imagesArr[2] || undefined,
        image4: imagesArr[3] || undefined,
        featured: !!product.featured,
        metaTitle: (product as any).metaTitle,
        metaDescription: (product as any).metaDescription,
        keywords: (product as any).keywords ? (product as any).keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : undefined,
      };

      // debug: log payload for dev (helps track missing meta fields)
      if ((import.meta as any).env?.VITE_DEBUG === 'true') {
        // eslint-disable-next-line no-console
        console.debug('Creating product payload', body);
      }

      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let errMsg = 'Failed to create product';
        try {
          const json = await res.json();
          if (json) {
            if (json.message) errMsg = json.message;
            else errMsg = JSON.stringify(json);
          }
        } catch (e) {
          const txt = await res.text();
          if (txt) errMsg = txt;
        }
        throw new Error(errMsg);
      }
      const created = await res.json();
      const createdImages = [created.image1, created.image2, created.image3, created.image4].filter(Boolean);
      const newProduct: Product = {
        id: created._id || created.id || `prod-${Date.now()}`,
        name: created.name,
        category: created.category,
        slug: created.slug,
        sku: created.sku,
        price: created.price,
        previousPrice: created.previousPrice ?? undefined,
        stock: created.stock ?? 0,
        featured: !!created.featured,
        image: createdImages[0] || created.image1 || created.image || '',
        images: createdImages,
        description: created.description || '',
        metaTitle: created.metaTitle || '',
        metaDescription: created.metaDescription || '',
        keywords: Array.isArray(created.keywords) ? created.keywords.join(', ') : (created.keywords || ''),
        status: 'active',
      };

      setProducts(prev => [newProduct, ...prev]);

      const productCategoryName = created.category ?? product.category;
      if (productCategoryName) {
        setCategories(prev => prev.map((cat: Category) =>
          cat.name === productCategoryName ? { ...cat, productCount: (cat.productCount || 0) + 1 } : cat
        ));
      }

      return newProduct;
    } catch (err) {
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const prevProduct = products.find(p => p.id === id);

      const updImages: string[] = (updates as any).images ?? [];
      if ((updates as any).image && !updImages.length) updImages[0] = (updates as any).image;

      const body: any = {
        name: updates.name,
        category: updates.category,
        slug: (updates as any).slug,
        sku: (updates as any).sku,
        description: updates.description,
        price: updates.price !== undefined ? Number(updates.price) : undefined,
        previousPrice: (updates as any).previousPrice !== undefined ? Number((updates as any).previousPrice) : undefined,
        stock: updates.stock !== undefined ? Number(updates.stock) : undefined,
        image1: updImages[0] || (updates as any).image,
        image2: updImages[1] || undefined,
        image3: updImages[2] || undefined,
        image4: updImages[3] || undefined,
        featured: updates.featured,
        metaTitle: (updates as any).metaTitle,
        metaDescription: (updates as any).metaDescription,
        keywords: (updates as any).keywords ? (updates as any).keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : undefined,
      };

      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to update product');
      const updated = await res.json();

      setProducts(prev => prev.map((p: Product) => p.id === id ? {
        ...p,
        name: updated.name ?? updates.name ?? p.name,
        category: updated.category ?? updates.category ?? p.category,
        sku: updated.sku ?? (updates as any).sku ?? p.sku,
        price: updated.price ?? updates.price ?? p.price,
        previousPrice: updated.previousPrice ?? (updates as any).previousPrice ?? p.previousPrice,
        stock: updated.stock ?? updates.stock ?? p.stock,
        featured: typeof updated.featured === 'boolean' ? updated.featured : (updates.featured ?? p.featured),
        image: (updated.image1 ?? (updates as any).image ?? p.image) as string,
        images: [updated.image1, updated.image2, updated.image3, updated.image4].filter(Boolean) as string[] | undefined,
        description: updated.description ?? updates.description ?? p.description,
        metaTitle: updated.metaTitle ?? updates.metaTitle ?? p.metaTitle,
        metaDescription: updated.metaDescription ?? updates.metaDescription ?? p.metaDescription,
        keywords: Array.isArray(updated.keywords) ? updated.keywords.join(', ') : (updates.keywords ?? p.keywords),
      } : p));

      const newCategoryName = updated.category ?? updates.category;
      if (prevProduct && newCategoryName && prevProduct.category !== newCategoryName) {
        setCategories(prev => prev.map((cat: Category) => {
          if (cat.name === prevProduct.category) {
            return { ...cat, productCount: Math.max(0, (cat.productCount || 0) - 1) };
          }
          if (cat.name === newCategoryName) {
            return { ...cat, productCount: (cat.productCount || 0) + 1 };
          }
          return cat;
        }));
      }

      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const productToDelete = products.find(p => p.id === id);
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(prod => prod.id !== id));

      if (productToDelete?.category) {
        setCategories(prev => prev.map((cat: Category) =>
          cat.name === productToDelete.category ? { ...cat, productCount: Math.max(0, (cat.productCount || 0) - 1) } : cat
        ));
      }
    } catch (err) {
      throw err;
    }
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
