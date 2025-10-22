import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

interface EditCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: {
    id: string;
    name: string;
    description: string;
    image: string;
    productIds: string[];
    productNames: string[];
  } | null;
}

export function EditCollectionDialog({
  open,
  onOpenChange,
  collection,
}: EditCollectionDialogProps) {
  const { updateCollection, products } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [collectionImage, setCollectionImage] = useState<{
    file: File | null;
    preview: string;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Restore collection data when dialog opens
  useEffect(() => {
    if (collection && open) {
      setFormData({
        name: collection.name,
        description: collection.description,
      });
      setSelectedProductIds(collection.productIds);
      setCollectionImage({
        file: null,
        preview: collection.image,
      });
    }
  }, [collection, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB for collection image)
    if (file.size > 2097152) {
      toast.error('Image too large', {
        description: `File size ${(file.size / 1048576).toFixed(2)}MB exceeds 2MB limit`,
      });
      e.target.value = '';
      return;
    }

    // Check dimensions
    try {
      const dimensions = await checkImageDimensions(file);
      if (dimensions.width > 1920 || dimensions.height > 1080) {
        toast.error('Image dimensions too large', {
          description: `Dimensions ${dimensions.width}×${dimensions.height}px exceed 1920×1080px limit`,
        });
        e.target.value = '';
        return;
      }

      setCollectionImage({
        file,
        preview: URL.createObjectURL(file),
      });
      toast.success('Collection image updated');
    } catch (error) {
      toast.error('Failed to load image');
    }

    e.target.value = '';
  };

  const checkImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  };

  const removeImage = () => {
    if (collectionImage?.preview && collectionImage.file) {
      URL.revokeObjectURL(collectionImage.preview);
    }
    setCollectionImage(null);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error('Collection name is required');
      return;
    }

    if (!formData.description) {
      toast.error('Collection description is required');
      return;
    }

    if (!collectionImage) {
      toast.error('Collection image is required');
      return;
    }

    if (selectedProductIds.length === 0) {
      toast.error('Please select at least one product for this collection');
      return;
    }

    if (!collection) return;

    // Show loading state
    setIsUpdating(true);

    // Simulate update delay for loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get product names for selected IDs
    const productNames = selectedProductIds.map(id => {
      const product = products.find(p => p.id === id);
      return product ? product.name : '';
    }).filter(Boolean);

    // Update collection
    updateCollection(collection.id, {
      name: formData.name,
      description: formData.description,
      image: collectionImage.preview,
      productIds: selectedProductIds,
      productNames,
    });

    setIsUpdating(false);

    // Success
    toast.success('Collection updated successfully!');

    // Close dialog
    onOpenChange(false);
  };

  const handleClose = () => {
    if (collectionImage?.file) {
      URL.revokeObjectURL(collectionImage.preview);
    }
    onOpenChange(false);
  };

  if (!collection) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
          <DialogDescription>
            Update collection details and manage products
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Collection Name */}
          <div>
            <Label htmlFor="collection-name">
              Collection Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="collection-name"
              placeholder="e.g., Summer Collection 2025"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1.5"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.name.length}/100 characters
            </p>
          </div>

          {/* Collection Description */}
          <div>
            <Label htmlFor="collection-description">
              Collection Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="collection-description"
              placeholder="Describe this collection and what makes it special..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1.5"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Products in Collection */}
          <div>
            <Label>
              Products in Collection <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Select products to include in this collection ({selectedProductIds.length} selected)
            </p>
            <div className="border border-border rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
              {products.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No products available. Add products first.
                </p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="flex items-start gap-3">
                    <Checkbox
                      id={`product-${product.id}`}
                      checked={selectedProductIds.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                    />
                    <label
                      htmlFor={`product-${product.id}`}
                      className="flex-1 flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="text-sm font-medium">Rs. {product.price}</p>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Collection Image */}
          <div>
            <Label>
              Collection Image <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Max 1920×1080px • 2MB limit
            </p>

            {!collectionImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="edit-collection-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="edit-collection-image" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">Click to upload collection image</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WebP • Max 1920×1080px
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative border border-border rounded-lg p-4">
                <img
                  src={collectionImage.preview}
                  alt="Collection"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isUpdating}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Collection'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
