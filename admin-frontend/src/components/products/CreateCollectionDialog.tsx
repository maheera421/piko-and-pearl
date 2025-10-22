import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

interface CreateCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: string[];
  productNames: string[];
}

export function CreateCollectionDialog({
  open,
  onOpenChange,
  selectedProducts,
  productNames,
}: CreateCollectionDialogProps) {
  const { addCollection } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [collectionImage, setCollectionImage] = useState<{
    file: File | null;
    preview: string;
  } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

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
      toast.success('Collection image uploaded');
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
    if (collectionImage?.preview) {
      URL.revokeObjectURL(collectionImage.preview);
    }
    setCollectionImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - check required fields
    const missing: string[] = [];
    if (!formData.name) missing.push('Collection Name');
    if (!formData.description) missing.push('Description');
    if (!collectionImage) missing.push('Collection Image');

    if (missing.length > 0) {
      setMissingFields(missing);
      setValidationDialogOpen(true);
      return;
    }

    // Show loading state
    setIsCreating(true);

    // Simulate creation delay for loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create collection
    addCollection({
      name: formData.name,
      description: formData.description,
      image: collectionImage.preview,
      productIds: selectedProducts,
      productNames: productNames,
    });

    setIsCreating(false);

    // Success
    toast.success('Collection created successfully!', {
      description: `"${formData.name}" with ${selectedProducts.length} products`,
    });

    // Reset form
    setFormData({ name: '', description: '' });
    removeImage();
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({ name: '', description: '' });
    removeImage();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>
            Create a collection with {selectedProducts.length} selected product(s)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Products */}
          <div>
            <Label>Selected Products ({selectedProducts.length})</Label>
            <div className="mt-2 p-3 bg-muted rounded-lg max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {productNames.map((name, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {name}
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                  id="collection-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="collection-image" className="cursor-pointer">
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
            <Button type="button" variant="outline" onClick={handleClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Collection'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* Validation Dialog */}
      <AlertDialog open={validationDialogOpen} onOpenChange={setValidationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Required Fields Missing</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill in the following required fields before creating the collection:
              <ul className="list-disc list-inside mt-3 space-y-1">
                {missingFields.map((field, index) => (
                  <li key={index} className="text-destructive">{field}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
