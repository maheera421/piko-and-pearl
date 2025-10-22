import React from 'react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { categories } from '../../data/mockData';

interface ProductFiltersProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  stockFilter: string;
  setStockFilter: (value: string) => void;
  featuredFilter: string;
  setFeaturedFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onClearFilters: () => void;
  totalProducts: number;
  filteredCount: number;
}

export function ProductFilters({
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  featuredFilter,
  setFeaturedFilter,
  statusFilter,
  setStatusFilter,
  onClearFilters,
  totalProducts,
  filteredCount,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Category Filter */}
      <div className="w-48">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stock Status Filter */}
      <div className="w-48">
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="w-48">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Visibility Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Filter */}
      <div className="w-48">
        <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button variant="ghost" size="sm" onClick={onClearFilters}>
        Clear Filters
      </Button>

      <div className="ml-auto text-sm text-muted-foreground">
        Showing {filteredCount} of {totalProducts} products
      </div>
    </div>
  );
}
