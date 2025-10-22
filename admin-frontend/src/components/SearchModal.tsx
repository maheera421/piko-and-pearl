import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Search, Package, ShoppingCart, Users, Tag, Settings, BarChart3, Image } from 'lucide-react';
import { mockOrders, mockCustomers } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchablePages = [
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3, category: 'Pages' },
  { name: 'Products', path: '/products', icon: Package, category: 'Pages' },
  { name: 'Categories', path: '/categories', icon: Tag, category: 'Pages' },
  { name: 'Orders', path: '/orders', icon: ShoppingCart, category: 'Pages' },
  { name: 'Custom Orders', path: '/custom-orders', icon: Image, category: 'Pages' },
  { name: 'Customers', path: '/customers', icon: Users, category: 'Pages' },
  { name: 'Discount Codes', path: '/discount-codes', icon: Tag, category: 'Pages' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, category: 'Pages' },
  { name: 'Settings', path: '/settings', icon: Settings, category: 'Pages' },
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { products } = useApp();

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const searchResults = query.length > 0 ? getSearchResults(query, products) : [];

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0" aria-describedby="search-description">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="sr-only" id="search-description">
          Search for products, orders, customers, and pages
        </div>
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            placeholder="Search products, orders, customers, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {query.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Start typing to search...</p>
              <p className="text-xs mt-2">Search for products, orders, customers, or pages</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(
                searchResults.reduce((acc, result) => {
                  if (!acc[result.category]) acc[result.category] = [];
                  acc[result.category].push(result);
                  return acc;
                }, {} as Record<string, typeof searchResults>)
              ).map(([category, items]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                    {category}
                  </div>
                  <div className="space-y-1">
                    {items.map((item, index) => (
                      <button
                        key={`${category}-${index}`}
                        onClick={() => handleSelect(item.path)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{item.name}</div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getSearchResults(query: string, products: any[]) {
  const lowerQuery = query.toLowerCase();
  const results: Array<{
    name: string;
    path: string;
    icon: any;
    category: string;
    subtitle?: string;
  }> = [];

  // Search pages
  searchablePages.forEach((page) => {
    if (page.name.toLowerCase().includes(lowerQuery)) {
      results.push(page);
    }
  });

  // Search products
  products.forEach((product) => {
    if (
      product.name?.toLowerCase().includes(lowerQuery) ||
      product.category?.toLowerCase().includes(lowerQuery) ||
      product.sku?.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        name: product.name,
        path: `/products/edit/${product.id}`,
        icon: Package,
        category: 'Products',
        subtitle: `${product.category} • ${product.sku} • Rs.${product.price.toLocaleString()}`,
      });
    }
  });

  // Search orders
  mockOrders.forEach((order) => {
    if (
      order.id?.toLowerCase().includes(lowerQuery) ||
      order.customer?.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        name: `Order ${order.id}`,
        path: '/orders',
        icon: ShoppingCart,
        category: 'Orders',
        subtitle: `${order.customer} • ₹${order.total}`,
      });
    }
  });

  // Search customers
  mockCustomers.forEach((customer) => {
    if (
      customer.name?.toLowerCase().includes(lowerQuery) ||
      customer.email?.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        name: customer.name,
        path: '/customers',
        icon: Users,
        category: 'Customers',
        subtitle: customer.email,
      });
    }
  });

  return results;
}
