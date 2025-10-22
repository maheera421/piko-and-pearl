import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Edit, Trash2, Star } from 'lucide-react';
import { Product } from '../../data/mockData';
import { toast } from 'sonner';
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

interface ProductsGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
}

export function ProductsGrid({ 
  products, 
  currentPage, 
  totalPages, 
  onPageChange,
  onDeleteProduct,
  onUpdateProduct,
}: ProductsGridProps) {
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

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

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.featured && (
                  <div className="absolute top-2 right-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                )}
                {product.stock <= 10 && product.stock > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#FEF3C7] text-[#92400E]">Low Stock</Badge>
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#FEE2E2] text-[#991B1B]">Out of Stock</Badge>
                  </div>
                )}
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    onClick={() => setProductToDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium line-clamp-2 mb-1">{product.name}</h4>
                <Badge className="bg-accent text-accent-foreground mb-2">
                  {product.category}
                </Badge>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-semibold text-lg">₨{product.price.toLocaleString()}</span>
                    {product.discountPrice && (
                      <span className="block text-xs text-muted-foreground line-through">
                        ₨{product.discountPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
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
        )}
      </div>

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
    </>
  );
}
