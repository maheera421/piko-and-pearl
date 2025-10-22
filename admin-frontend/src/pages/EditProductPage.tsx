import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Upload, X, ArrowLeft, Loader2 } from 'lucide-react';
import { categories } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, updateProduct } = useApp();
  const product = products.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category.toLowerCase().replace(/\s+/g, '-') || '',
    price: product?.price.toString() || '',
    previousPrice: product?.discountPrice?.toString() || '',
    stock: product?.stock.toString() || '',
    sku: product?.sku || '',
    featured: product?.featured || false,
    status: (product?.status || 'active') as 'active' | 'draft' | 'archived',
  });
  const [images, setImages] = useState<{ file: File | null; preview: string; altText: string }[]>(
    product ? [{ file: null, preview: product.image, altText: product.name }] : []
  );

  useEffect(() => {
    if (!product) {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [product, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check total images limit
    if (images.length + files.length > 4) {
      toast.error('Maximum 4 images allowed per product', {
        description: `You can only upload ${4 - images.length} more image(s)`,
      });
      e.target.value = ''; // Reset input
      return;
    }

    // Calculate current total size
    const currentTotalSize = images.reduce((acc, img) => {
      if (img.file) return acc + img.file.size;
      return acc;
    }, 0);

    const newImages: { file: File; preview: string; altText: string }[] = [];
    const errors: string[] = [];
    let totalNewSize = 0;

    // Process each file
    for (const file of Array.from(files)) {
      // Check individual file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        errors.push(`${file.name}: File size ${(file.size / 1048576).toFixed(2)}MB exceeds 1MB limit`);
        continue;
      }

      totalNewSize += file.size;

      // Check image dimensions
      try {
        const dimensions = await checkImageDimensions(file);
        if (dimensions.width > 1000 || dimensions.height > 1000) {
          errors.push(`${file.name}: Dimensions ${dimensions.width}×${dimensions.height}px exceed 1000×1000px limit`);
          continue;
        }

        // Image passed all checks
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
          altText: '',
        });
      } catch (error) {
        errors.push(`${file.name}: Failed to load image`);
      }
    }

    // Check total upload size
    if (currentTotalSize + totalNewSize > 1048576) {
      const remainingSpace = (1048576 - currentTotalSize) / 1048576;
      toast.error('Total upload size exceeds 1MB limit', {
        description: `Only ${remainingSpace.toFixed(2)}MB space remaining`,
      });
      e.target.value = '';
      return;
    }

    // Show errors if any
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }

    // Add valid images
    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded successfully`);
    }

    // Reset input
    e.target.value = '';
  };

  // Helper function to check image dimensions
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

  const removeImage = (index: number) => {
    setImages(prev => {
      const img = prev[index];
      if (img.preview) URL.revokeObjectURL(img.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateImageAltText = (index: number, altText: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, altText } : img));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    // Check if all images have alt text
    const missingAltText = images.some(img => !img.altText);
    if (missingAltText) {
      toast.error('Please provide alt text for all images');
      return;
    }

    if (!product) return;

    setIsSaving(true);

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update product
    updateProduct(product.id, {
      name: formData.name,
      description: formData.description,
      category: categories.find(c => c.slug === formData.category)?.name || formData.category,
      price: parseFloat(formData.price),
      discountPrice: formData.previousPrice ? parseFloat(formData.previousPrice) : undefined,
      stock: parseInt(formData.stock),
      sku: formData.sku,
      featured: formData.featured,
      status: formData.status,
      image: images[0].preview,
    });

    setIsSaving(false);

    // Success
    toast.success('Product updated successfully!');
    setTimeout(() => navigate('/products'), 1500);
  };

  if (!product) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>Edit Product</h1>
          <p className="text-muted-foreground mt-1">
            Update product information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="mb-6">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Handmade Crochet Sunflower Bouquet"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1.5"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.name.length}/100 characters
                </p>
              </div>

              <div>
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sku">
                  SKU <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="sku"
                  placeholder="PIKO-CATEGORY-001"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value.toUpperCase())}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be unique
                </p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="mb-6">Description</h3>
            <div>
              <Label htmlFor="description">
                Product Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Handmade with cotton yarn and floral wire..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1.5"
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Describe materials, features, and any special details
              </p>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6">
            <h3 className="mb-6">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">
                  Price (₨) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="1500"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="mt-1.5"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="previousPrice">Previous Price (₨)</Label>
                <Input
                  id="previousPrice"
                  type="number"
                  placeholder="2000"
                  value={formData.previousPrice}
                  onChange={(e) => handleInputChange('previousPrice', e.target.value)}
                  className="mt-1.5"
                  min="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Show strikethrough price if on sale
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <Label htmlFor="stock">
                  Stock Quantity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="25"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  className="mt-1.5"
                  min="0"
                />
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3>Product Images <span className="text-destructive">*</span></h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Max 4 images • 1000×1000px each • 1MB total
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground block">
                  {images.length}/4 images
                </span>
                <span className="text-xs text-muted-foreground">
                  {((images.reduce((acc, img) => acc + (img.file?.size || 0), 0)) / 1048576).toFixed(2)}MB / 1MB
                </span>
              </div>
            </div>
            
            {/* Upload Area */}
            {images.length < 4 && (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WebP • Max 1000×1000px • {images.length}/4 uploaded
                  </p>
                </label>
              </div>
            )}

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative border border-border rounded-lg p-2">
                    <img
                      src={image.preview}
                      alt={image.altText || 'Product'}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Alt text (required)"
                      value={image.altText}
                      onChange={(e) => updateImageAltText(index, e.target.value)}
                      className="text-xs"
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Settings & Actions */}
        <div className="space-y-6">
          {/* Product Status */}
          <Card className="p-6">
            <h3 className="mb-6">Product Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured Product</Label>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
              </div>

              <div>
                <Label>Visibility Status</Label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Active (visible in store)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Draft (not visible)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="archived"
                      checked={formData.status === 'archived'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Archived (hidden)</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h3 className="mb-4">Preview</h3>
            {images.length > 0 ? (
              <div className="border border-border rounded-lg overflow-hidden">
                <img src={images[0].preview} alt="Preview" className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h4 className="line-clamp-2 mb-1">
                    {formData.name || 'Product Name'}
                  </h4>
                  <p className="font-semibold text-primary">
                    {formData.price ? `₨${parseInt(formData.price).toLocaleString()}` : '₨0'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-6 text-center text-muted-foreground text-sm">
                Upload images to see preview
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <Card className="p-6">
            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Product'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/products')}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
