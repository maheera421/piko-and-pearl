import React, { useState, useMemo } from 'react';
import { Plus, Grid3X3, List, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ProductsTable } from '../components/products/ProductsTable';
import { ProductsGrid } from '../components/products/ProductsGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { CollectionsTable } from '../components/products/CollectionsTable';
import { Product } from '../data/mockData';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function ProductsPage() {
  const navigate = useNavigate();
  const { products, deleteProduct: deleteProductFromContext } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const itemsPerPage = 12;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || 
                             product.category.toLowerCase().replace(/\s+/g, '-') === categoryFilter;
      
      // Stock filter
      let matchesStock = true;
      if (stockFilter === 'in-stock') {
        matchesStock = product.stock > 15;
      } else if (stockFilter === 'low-stock') {
        matchesStock = product.stock > 0 && product.stock <= 15;
      } else if (stockFilter === 'out-of-stock') {
        matchesStock = product.stock === 0;
      }
      
      // Featured filter
      const matchesFeatured = featuredFilter === 'all' ||
                             (featuredFilter === 'featured' && product.featured) ||
                             (featuredFilter === 'not-featured' && !product.featured);
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStock && matchesFeatured && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, stockFilter, featuredFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStockFilter('all');
    setFeaturedFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProductFromContext(productId);
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleBulkDelete = () => {
    selectedProducts.forEach(id => deleteProductFromContext(id));
    toast.success(`${selectedProducts.length} product(s) deleted`);
    setSelectedProducts([]);
    setShowBulkDeleteDialog(false);
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    // This would need to be implemented in context if needed for inline editing
    toast.info('Product update feature coming soon');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Products Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all crochet products in your store
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedProducts.length > 0 && (
            <Button 
              variant="destructive"
              onClick={() => setShowBulkDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedProducts.length})
            </Button>
          )}
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/products/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <ProductFilters 
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            featuredFilter={featuredFilter}
            setFeaturedFilter={setFeaturedFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onClearFilters={handleClearFilters}
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />
        </div>
      </Card>

      {/* Collections Table */}
      <CollectionsTable />

      {/* Products Section */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-[#1A1A1A]">Products</h2>
      </div>

      {/* Products Display */}
      {viewMode === 'table' ? (
        <ProductsTable 
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalCount={filteredProducts.length}
          startIndex={startIndex}
          endIndex={Math.min(endIndex, filteredProducts.length)}
          selectedProducts={selectedProducts}
          onSelectionChange={setSelectedProducts}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      ) : (
        <ProductsGrid 
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      {/* Bulk Delete Dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedProducts.length} product(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected products
              from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}