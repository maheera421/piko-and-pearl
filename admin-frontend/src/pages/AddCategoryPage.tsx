import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
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

export function AddCategoryPage() {
  const navigate = useNavigate();
  const { addCategory } = useApp();
  const [formData, setFormData] = useState({
    categoryName: '',
    slug: '',
    categoryImage: '',
    metaTitle: '',
    metaDescription: '',
    h1Heading: '',
    introParagraph: '',
    keywords: '',
  });

  const [isCreating, setIsCreating] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-generate slug from category name
      if (field === 'categoryName') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - check required fields
    const missing: string[] = [];
    if (!formData.categoryName) missing.push('Category Name');
    if (!formData.slug) missing.push('URL Slug');
    if (!formData.h1Heading) missing.push('H1 Heading');

    if (missing.length > 0) {
      setMissingFields(missing);
      setValidationDialogOpen(true);
      return;
    }

    // Show loading state
    setIsCreating(true);

    // Simulate creation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create category
    addCategory({
      name: formData.categoryName,
      slug: formData.slug,
      icon: formData.categoryImage || '🌸',
      productCount: 0,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      keywords: formData.keywords,
      h1Heading: formData.h1Heading,
      introParagraph: formData.introParagraph,
      active: true,
    });

    setIsCreating(false);

    // Success
    toast.success('Category created successfully!');
    setTimeout(() => navigate('/categories'), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/categories')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>Add New Category</h1>
          <p className="text-muted-foreground mt-1">
            Create a new product category for your store
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
                <Label htmlFor="categoryName">
                  Category Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="categoryName"
                  placeholder="e.g., Crochet Flowers"
                  value={formData.categoryName}
                  onChange={(e) => handleInputChange('categoryName', e.target.value)}
                  className="mt-1.5"
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.categoryName.length}/100 characters
                </p>
              </div>

              <div>
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  placeholder="crochet-flowers"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL-friendly version (auto-generated from category name)
                </p>
              </div>

              <div>
                <Label htmlFor="categoryImage">
                  Category Image (URL)
                </Label>
                <Input
                  id="categoryImage"
                  placeholder="https://..."
                  value={formData.categoryImage}
                  onChange={(e) => handleInputChange('categoryImage', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Image should be less than 500 KB.
                </p>
              </div>

              <div>
                <Label htmlFor="h1Heading">
                  H1 Heading <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="h1Heading"
                  placeholder="Beautiful Handmade Crochet Flowers"
                  value={formData.h1Heading}
                  onChange={(e) => handleInputChange('h1Heading', e.target.value)}
                  className="mt-1.5"
                  maxLength={120}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Main heading for the category page • {formData.h1Heading.length}/120 characters
                </p>
              </div>
            </div>
          </Card>

          {/* Content */}
          <Card className="p-6">
            <h3 className="mb-6">Category Content</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="introParagraph">Intro paragraph / p tag</Label>
                <Textarea
                  id="introParagraph"
                  placeholder="Welcome to our collection of handmade crochet flowers..."
                  value={formData.introParagraph}
                  onChange={(e) => handleInputChange('introParagraph', e.target.value)}
                  className="mt-1.5"
                  rows={6}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Introduction text for the category page • {formData.introParagraph.length}/1000 characters
                </p>
              </div>
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
                  placeholder="Handmade Crochet Flowers | Piko & Pearl"
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
                  placeholder="Shop beautiful handmade crochet flowers perfect for gifts, home decor, and special occasions..."
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

        {/* Right Column - Preview & Actions */}
        <div className="space-y-6">
          {/* SEO Preview */}
          <Card className="p-6">
            <h3 className="mb-4">SEO Preview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Search Result Preview:</p>
                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="text-[#1a0dab] text-lg mb-1 line-clamp-1">
                    {formData.metaTitle || 'Category Title | Piko & Pearl'}
                  </div>
                  <div className="text-[#006621] text-xs mb-2">
                    pikoandpearl.com › {formData.slug || 'category-slug'}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {formData.metaDescription || 'Category description will appear here in search results...'}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Page Heading:</p>
                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <h1 className="line-clamp-2">
                    {formData.h1Heading || 'Category H1 Heading'}
                  </h1>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">URL Slug:</p>
                <div className="border border-border rounded-lg p-3 bg-muted/30">
                  <code className="text-sm">
                    /{formData.slug || 'category-slug'}
                  </code>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6">
            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Category'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/categories')}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-accent/20">
            <h4 className="mb-3">SEO Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Keep meta titles under 60 characters</li>
              <li>• Meta descriptions should be 150-160 characters</li>
              <li>• Use relevant keywords naturally</li>
              <li>• Make H1 heading descriptive and unique</li>
              <li>• Include location or specialty keywords</li>
            </ul>
          </Card>
        </div>
      </form>

      {/* Validation Dialog */}
      <AlertDialog open={validationDialogOpen} onOpenChange={setValidationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Required Fields Missing</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill in all required fields before creating the category:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <ul className="space-y-2">
              {missingFields.map((field, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-destructive">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
                  {field}
                </li>
              ))}
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationDialogOpen(false)}>
              OK, I'll fill them
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}