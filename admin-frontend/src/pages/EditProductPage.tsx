import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, categories, updateProduct } = useApp();
  const product = products.find(p => p.id === id);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    slug: product?.slug || '',
    price: product?.price != null ? String(product.price) : '',
    stock: product?.stock != null ? String(product.stock) : '',
    sku: product?.sku || '',
    productImage: product?.image || '',
    metaTitle: product?.metaTitle || '',
    metaDescription: product?.metaDescription || '',
    featured: product?.featured || false,
    keywords: (product as any)?.keywords || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!product) {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [product, navigate]);

  const [isSaving, setIsSaving] = useState(false);

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-generate slug from name only if slug is empty
      if (field === 'name' && (!prev.slug || prev.slug.trim() === '')) {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.productImage) {
      toast.error('Please provide a product image URL');
      return;
    }

    if (!product) return;

    setIsSaving(true);

    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update product (include slug & keywords)
    updateProduct(product.id, {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      slug: formData.slug,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      sku: formData.sku,
      featured: formData.featured,
      image: formData.productImage,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      keywords: formData.keywords,
    });

    setIsSaving(false);

    // Success
    toast.success('Product updated successfully!');
    setTimeout(() => navigate('/products'), 1500);
  };

  if (!product) return null;

  const formattedPrice = formData.price ? Number(formData.price).toLocaleString() : '0';

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
                  Product Name / H1 tag <span className="text-destructive">*</span>
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
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="product-slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL friendly identifier (auto-generated from name if left empty)
                </p>
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
                Product Description / p tag <span className="text-destructive">*</span>
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

          {/* Product Image */}
          <Card className="p-6">
            <h3 className="mb-6">Product Image</h3>
            <div>
              <Label htmlFor="productImage">
                Product Image (URL) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="productImage"
                placeholder="https://..."
                value={formData.productImage}
                onChange={(e) => handleInputChange('productImage', e.target.value)}
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Note: Image should be less than 500 KB.
              </p>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6">
            <h3 className="mb-6">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  placeholder="Handmade Crochet Sunflower Bouquet | Piko & Pearl"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  className="mt-1.5"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Page title for search engines • {formData.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Beautiful handmade crochet sunflower bouquet, perfect for gifts and home decor..."
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  className="mt-1.5"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Brief description for search results • {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="keywords">SEO Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="e.g. handmade crochet, crochet flowers, crochet bags"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated keywords for SEO (optional)
                </p>
              </div>
            </div>
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
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h3 className="mb-4">Preview</h3>
            {formData.productImage ? (
              <div className="border border-border rounded-lg overflow-hidden">
                <img src={formData.productImage} alt="Preview" className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h4 className="line-clamp-2 mb-1">
                    {formData.name || 'Product Name'}
                  </h4>
                  <p className="font-semibold text-primary">
                    {'\u20A8' + formattedPrice}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-6 text-center text-muted-foreground text-sm">
                Add product image URL to see preview
              </div>
            )}
          </Card>

          {/* SEO Preview */}
          <Card className="p-6">
            <h3 className="mb-4">SEO Preview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Search Result Preview:</p>
                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="text-[#1a0dab] text-lg mb-1 line-clamp-1">
                    {formData.metaTitle || formData.name || 'Product Title | Piko & Pearl'}
                  </div>
                  <div className="text-[#006621] text-xs mb-2">
                    pikoandpearl.com › {formData.sku.toLowerCase() || 'product-sku'}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {formData.metaDescription || formData.description || 'Product description will appear here in search results...'}
                  </div>
                </div>
              </div>
            </div>
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