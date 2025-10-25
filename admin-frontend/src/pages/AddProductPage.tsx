// ...existing code...
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function AddProductPage() {
  const navigate = useNavigate();
  const { addProduct, categories, products } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    slug: '',
    price: '',
    previousPrice: '', // <-- new field
    stock: '',
    sku: '',
    productImage1: '', // primary image
    productImage2: '',
    productImage3: '',
    productImage4: '',
    metaTitle: '',
    metaDescription: '',
    featured: false,
    keywords: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    const errors: string[] = [];

    if (!formData.name) errors.push('Product Name');
    if (!formData.category) errors.push('Category');
    if (!formData.sku) errors.push('SKU');
    if (!formData.slug) errors.push('Slug');
    if (!formData.price) errors.push('Price');
    if (!formData.stock) errors.push('Stock');
    if (!formData.description) errors.push('Description');
    // require primary image
    if (!formData.productImage1) errors.push('Primary Product Image (Image 1 URL)');

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationDialog(true);
      return;
    }

    // Client-side uniqueness checks to avoid duplicate-key DB error
    if (products.some(p => p.sku && p.sku.toLowerCase() === formData.sku.toLowerCase())) {
      setValidationErrors(['SKU already exists']);
      setShowValidationDialog(true);
      return;
    }
    if (products.some(p => (p as any).slug && (p as any).slug.toLowerCase() === formData.slug.toLowerCase())) {
      setValidationErrors(['Slug already exists']);
      setShowValidationDialog(true);
      return;
    }

    // Show loading state
    setIsSaving(true);

    // Simulate saving delay for loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Build images array
    const images = [
      formData.productImage1,
      formData.productImage2,
      formData.productImage3,
      formData.productImage4,
    ].filter(Boolean);

    // debug: log meta fields before sending
    // eslint-disable-next-line no-console
    console.debug('AddProduct payload metaTitle/metaDescription:', { metaTitle: formData.metaTitle, metaDescription: formData.metaDescription });

    try {
      await addProduct({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        // backend expects slug/sku etc. We keep them in the payload mapping inside context
        slug: formData.slug as unknown as any,
        sku: formData.sku as unknown as any,
        price: parseFloat(formData.price),
        previousPrice: formData.previousPrice ? parseFloat(formData.previousPrice) : undefined,
        stock: parseInt(formData.stock, 10),
        featured: formData.featured,
    image: formData.productImage1,
    images,
        status: 'active',
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
      });

      setIsSaving(false);
      toast.success('Product added successfully!');
      navigate('/products');
    } catch (err: any) {
      setIsSaving(false);
      let msg = err?.message || String(err) || 'Failed to add product. Please check the values and try again.';
      // Friendly message for duplicate key errors
      if (msg.toLowerCase().includes('duplicate key') || msg.includes('E11000')) {
        if (msg.includes('sku')) msg = 'SKU already exists. Please use a unique SKU.';
        else if (msg.includes('slug')) msg = 'Slug already exists. Please change the product URL slug.';
        else msg = 'Duplicate key error. Please ensure SKU and slug are unique.';
      }
      // If backend returned a structured JSON error that includes missingFields, show them
      try {
        const parsed = typeof err === 'string' ? JSON.parse(err) : err;
        if (parsed && parsed.missingFields) {
          msg = `Missing required fields: ${parsed.missingFields.join(', ')}`;
        }
      } catch (_) {
        // ignore parse errors
      }

      toast.error(msg);
      console.error('Add product failed:', err);
    }
  };

  const formattedPrice = formData.price ? Number(formData.price).toLocaleString() : '0';
  const formattedPreviousPrice = formData.previousPrice ? Number(formData.previousPrice).toLocaleString() : null;

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
          <h1>Add New Product</h1>
          <p className="text-muted-foreground mt-1">
            Create a new product for your store
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
                <Label htmlFor="previousPrice">
                  Previous Price (₨) <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <Input
                  id="previousPrice"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.previousPrice}
                  onChange={(e) => handleInputChange('previousPrice', e.target.value)}
                  className="mt-1.5"
                  min="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  If provided, shown as the crossed-out previous price on product preview.
                </p>
              </div>

              <div className="col-span-2 md:col-span-1">
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

          {/* Product Image (4 fields) */}
          <Card className="p-6">
            <h3 className="mb-6">Product Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productImage1">
                  Image 1 URL (Primary) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="productImage1"
                  placeholder="https://..."
                  value={formData.productImage1}
                  onChange={(e) => handleInputChange('productImage1', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="productImage2">Image 2 URL</Label>
                <Input
                  id="productImage2"
                  placeholder="https://..."
                  value={formData.productImage2}
                  onChange={(e) => handleInputChange('productImage2', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="productImage3">Image 3 URL</Label>
                <Input
                  id="productImage3"
                  placeholder="https://..."
                  value={formData.productImage3}
                  onChange={(e) => handleInputChange('productImage3', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="productImage4">Image 4 URL</Label>
                <Input
                  id="productImage4"
                  placeholder="https://..."
                  value={formData.productImage4}
                  onChange={(e) => handleInputChange('productImage4', e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Provide up to 4 images. Image 1 will be used as the primary image.</p>
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
            {formData.productImage1 ? (
              <div className="border border-border rounded-lg overflow-hidden">
                <img src={formData.productImage1} alt="Preview" className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h4 className="line-clamp-2 mb-1">
                    {formData.name || 'Product Name'}
                  </h4>
                  <div className="flex items-baseline gap-3">
                    {formattedPreviousPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {'\u20A8' + formattedPreviousPrice}
                      </span>
                    )}
                    <p className="font-semibold text-primary">
                      {'\u20A8' + formattedPrice}
                    </p>
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-3 flex gap-2">
                    {[formData.productImage1, formData.productImage2, formData.productImage3, formData.productImage4]
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((src, idx) => (
                        <img key={idx} src={src} alt={`thumb-${idx + 1}`} className="w-12 h-12 object-cover rounded" />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-6 text-center text-muted-foreground text-sm">
                Add product image URL (Image 1) to see preview
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
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Product'
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

      {/* Validation Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Required Fields Missing</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill in the following required fields before saving:
              <ul className="list-disc list-inside mt-3 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-destructive">{error}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowValidationDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
// ...existing code...