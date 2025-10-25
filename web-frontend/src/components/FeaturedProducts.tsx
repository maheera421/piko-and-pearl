import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { toast } from "sonner";
import { getProductReviews, calculateAverageRating, getReviewCount } from "./ProductData";

interface FeaturedProductsProps {
  onNavigate?: (page: string) => void;
  products?: any[];
  categories?: any[];
}

export function FeaturedProducts({ onNavigate, products: propProducts, categories }: FeaturedProductsProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (product: any) => {
    const wishlistItem = {
      id: `${product.category}-${product.categoryId}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating,
      reviews: product.reviews,
      description: product.description
    };
    
    toggleItem(wishlistItem);
    
    if (isInWishlist(`${product.category}-${product.categoryId}`)) {
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: `${product.category}-${product.categoryId}`,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1)
    });
    toast.success(`${product.name} added to cart!`);
  };

  const products = propProducts && propProducts.length ? propProducts : [
    // fallback to built-in baseProducts when prop not provided (same sample data as before)
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Sale": return "destructive";
      case "New": return "secondary";
      case "Bestseller": return "default";
      default: return "outline";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved handcrafted pieces, each one unique and made with care
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-card overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image1 || product.image || (product.images && product.images[0])}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                    onClick={() => toggleWishlist(product)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isInWishlist(`${product.category}-${product.categoryId}`) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                  
                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Do not show description in Featured Products cards (too long) */}
                  
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-foreground">Rs {product.price}</span>
                      {(product.previousPrice || product.originalPrice) && (
                        <span className="text-sm text-muted-foreground line-through">Rs {product.previousPrice || product.originalPrice}</span>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      const createSlug = (text: string) => text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                      const createCategorySlug = (name: string) => createSlug(`handmade-crochet-${name}`);
                      // Prefer category slug from categories list when available
                      let categorySlug = createCategorySlug((product.category || '').toString().replace(/^handmade-crochet-/, ''));
                      if (categories && categories.length) {
                        const match = categories.find((c: any) => {
                          if (!c) return false;
                          if (c._id && (product.category === c._id || product.category === String(c._id))) return true;
                          if (c.slug && (product.category === c.slug || product.category === c.slug.replace(/^handmade-crochet-/, ''))) return true;
                          if (c.name && product.category && c.name.toString().toLowerCase() === product.category.toString().toLowerCase()) return true;
                          const cSlug = createCategorySlug(c.name || '');
                          if (product.category && cSlug === product.category.toString()) return true;
                          return false;
                        });
                        if (match) categorySlug = match.slug || createCategorySlug(match.name || '');
                      }
                      const path = `${categorySlug}/${createSlug(product.name || '')}`;
                      onNavigate?.(path);
                    }}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8"
            onClick={() => onNavigate?.('featured')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}