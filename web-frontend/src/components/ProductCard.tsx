import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: any;
  onNavigate?: (path: string) => void;
  hideDescription?: boolean;
  categories?: any[];
}

export const ProductCard = ({ product, onNavigate, hideDescription, categories }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addItem({ id: `${product._id || product.id}`, name: product.name, price: product.price, image: product.image, category: product.category, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleItem({ id: `${product._id || product.id}`, name: product.name, price: product.price, image: product.image, category: product.category });
    toast.success(isInWishlist(`${product._id || product.id}`) ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`);
  };

  const createSlug = (text: string) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const createCategorySlug = (categoryName: string) => createSlug(`handmade-crochet-${categoryName}`);

  const resolveCategorySlug = (product: any, categories?: any[]) => {
    // Try to find the matching category document
    if (categories && categories.length) {
      const match = categories.find((c: any) => {
        if (!c) return false;
        if (c._id && (product.category === c._id || product.category === String(c._id))) return true;
        if (c.slug && product.category && (product.category === c.slug || product.category === c.slug.replace(/^handmade-crochet-/, ''))) return true;
        if (c.name && product.category && c.name.toString().toLowerCase() === product.category.toString().toLowerCase()) return true;
        // also try comparing slugs
        const cSlug = createCategorySlug(c.name || '');
        if (product.category && cSlug === product.category.toString()) return true;
        return false;
      });
      if (match) return match.slug || createCategorySlug(match.name || '');
    }

    // Fallback to client-side slug generation
    return createCategorySlug((product.category || '').toString().replace(/^handmade-crochet-/, ''));
  };

  const handleView = () => {
    const categorySlug = resolveCategorySlug(product, categories);
    const productSlug = createSlug(product.name || '');
    onNavigate?.(`${categorySlug}/${productSlug}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-card overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <ImageWithFallback src={product.image1 || product.image || (product.images && product.images[0])} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" onClick={handleView} />

          <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm" onClick={handleWishlist}>
            <Heart className={`h-4 w-4 ${isInWishlist(`${product._id || product.id}`) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>

          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({product.reviews || 0})</span>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={handleView}>{product.name}</h3>

          {!hideDescription && (
            <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-foreground">Rs {product.price}</span>
              {(product.previousPrice || product.originalPrice) && (
                <span className="text-sm text-muted-foreground line-through">Rs {product.previousPrice || product.originalPrice}</span>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleView}>View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
