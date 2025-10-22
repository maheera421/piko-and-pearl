import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';

export function EditCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { categories, updateCategory } = useApp();
  
  const category = categories.find((cat) => cat.id === id);

  const [formData, setFormData] = useState({
    categoryName: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    h1Heading: '',
    introParagraph: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.name,
        slug: category.slug,
        metaTitle: category.metaTitle || '',
        metaDescription: category.metaDescription || '',
        keywords: category.keywords || '',
        h1Heading: category.h1Heading || category.name,
        introParagraph: category.introParagraph || '',
      });
    } else {
      // Category not found, redirect back
      toast.error('Category not found');
      navigate('/categories');
    }
  }, [category, navigate]);

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
    
    if (!id) return;

    // Validation
    if (!formData.categoryName) {
      toast.error('Category name is required');
      return;
    }

    if (!formData.slug) {
      toast.error('Slug is required');
      return;
    }

    if (!formData.h1Heading) {
      toast.error('H1 Heading is required');
      return;
    }

    setIsUpdating(true);
    
    // Simulate update delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update category
    updateCategory(id, {
      name: formData.categoryName,
      slug: formData.slug,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      keywords: formData.keywords,
      h1Heading: formData.h1Heading,
      introParagraph: formData.introParagraph,
    });

    setIsUpdating(false);

    // Success
    toast.success('Category updated successfully!');
    setTimeout(() => navigate('/categories'), 1000);
  };

  if (!category) {
    return null;
  }

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
          <h1>Edit Category</h1>
          <p className="text-muted-foreground mt-1">
            Update category information
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
                <Label htmlFor="introParagraph">Intro Paragraph</Label>
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
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="crochet flowers, handmade flowers, bouquet, gift"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated keywords for SEO
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
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/categories')}
                disabled={isUpdating}
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
    </div>
  );
}
