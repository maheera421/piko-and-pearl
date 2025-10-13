import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge: string;
  description: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('piko-pearl-wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing wishlist from localStorage:', e);
        }
      }
    }
    return [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('piko-pearl-wishlist', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (newItem: WishlistItem) => {
    console.log('Adding item to wishlist:', newItem);
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      console.log('Existing item found:', existingItem);
      if (!existingItem) {
        const newItems = [...prev, newItem];
        console.log('New wishlist items:', newItems);
        return newItems;
      }
      console.log('Item already exists, not adding');
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const toggleItem = (item: WishlistItem) => {
    console.log('Toggling wishlist item:', item);
    console.log('Current wishlist items:', items);
    console.log('Is in wishlist?', isInWishlist(item.id));
    
    if (isInWishlist(item.id)) {
      console.log('Removing item from wishlist');
      removeItem(item.id);
    } else {
      console.log('Adding item to wishlist');
      addItem(item);
    }
  };

  const getTotalItems = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
      toggleItem,
      getTotalItems
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}