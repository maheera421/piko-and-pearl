import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface ProductsTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  startIndex: number;
  endIndex: number;
  selectedProducts: string[];
  onSelectionChange: (selected: string[]) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
}

export function ProductsTable({ 
  products, 
  currentPage, 
  totalPages, 
  onPageChange,
  totalCount,
  startIndex,
  endIndex,
  selectedProducts,
  onSelectionChange,
  onDeleteProduct,
  onUpdateProduct,
}: ProductsTableProps) {
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToChangeStatus, setProductToChangeStatus] = useState<{ id: string; status: 'active' | 'draft' | 'archived' } | null>(null);

  const toggleProduct = (id: string) => {
    const newSelection = selectedProducts.includes(id)
      ? selectedProducts.filter((p) => p !== id)
      : [...selectedProducts, id];
    onSelectionChange(newSelection);
  };

  const toggleAll = () => {
    if (selectedProducts.length === products.length && products.length > 0) {
      onSelectionChange([]);
    } else {
      onSelectionChange(products.map((p) => p.id));
    }
  };

  const handleToggleFeatured = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      onUpdateProduct(productId, { featured: !product.featured });
      toast.success('Featured status updated');
    }
  };

  const handleStatusChange = (productId: string, newStatus: 'active' | 'draft' | 'archived') => {
    setProductToChangeStatus({ id: productId, status: newStatus });
  };

  const confirmStatusChange = () => {
    if (productToChangeStatus) {
      onUpdateProduct(productToChangeStatus.id, { status: productToChangeStatus.status });
      toast.success(`Product status changed to ${productToChangeStatus.status}`);
      setProductToChangeStatus(null);
    }
  };

  const handleEdit = (productId: string) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete);
      toast.success('Product deleted successfully');
      setProductToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { className: 'bg-[#E6FFFA] text-[#047857]', label: 'Active' },
      draft: { className: 'bg-[#FEF3C7] text-[#92400E]', label: 'Draft' },
      archived: { className: 'bg-[#F3F4F6] text-[#6B7280]', label: 'Archived' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4">
                  <Checkbox
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium">Image</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Featured</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                  }`}
                >
                  <td className="py-3 px-4">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium max-w-xs truncate">
                    {product.name}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                    {product.sku}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium">₨{product.price.toLocaleString()}</span>
                      {product.discountPrice && (
                        <span className="block text-xs text-muted-foreground line-through">
                          ₨{product.discountPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={
                        product.stock > 15
                          ? 'bg-[#E6FFFA] text-[#047857]'
                          : product.stock > 0
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                      }
                    >
                      {product.stock > 15
                        ? 'In Stock'
                        : product.stock > 0
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Switch 
                      checked={product.featured} 
                      onCheckedChange={() => handleToggleFeatured(product.id)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEdit(product.id)}
                        title="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setProductToDelete(product.id)}
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{endIndex} of {totalCount} products
            {selectedProducts.length > 0 && ` (${selectedProducts.length} selected)`}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={!!productToChangeStatus} onOpenChange={() => setProductToChangeStatus(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Product Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this product's status to {productToChangeStatus?.status}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}