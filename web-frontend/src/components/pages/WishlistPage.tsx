import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Trash2 } from "lucide-react";
import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";
import { ProductCard } from "../ProductCard";
import { toast } from "sonner";

interface WishlistPageProps {
  onNavigate: (page: string) => void;
  products?: any[];
  categories?: any[];
}

export function WishlistPage({ onNavigate, products, categories }: WishlistPageProps) {
  const { items: wishlistItems, removeItem } = useWishlist();
  const { addItem } = useCart();
  
  // try to use the full products list passed via props (App will pass products)
  // If a matching product is found in the backend-fetched products, use its image fields
  // to ensure wishlist shows the DB image.
  // (If App does not pass products, we gracefully fallback to the local wishlist item image.)
  const findProductForItem = (item: any, products?: any[]) => {
    if (!products || products.length === 0) return null;
    // direct productId
    if (item.productId) {
      const byId = products.find(p => p._id === item.productId || p.id === item.productId);
      if (byId) return byId;
    }
    // parse id like 'category-<id>' or 'category-<slug>'
    const parts = (item.id || '').toString().split('-');
    const last = parts[parts.length - 1];
    let found = products.find(p => (p._id && p._id.toString() === last.toString()) || (p.id && p.id.toString() === last.toString()));
    if (found) return found;
    // try slug match on name
    const createSlug = (text: string) => text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const itemSlug = createSlug(last) || createSlug(item.name || '');
    found = products.find(p => createSlug(p.name || '') === itemSlug || createSlug(p.name || '') === createSlug(item.name || ''));
    return found || null;
  };
  console.log('WishlistPage - wishlistItems:', wishlistItems);
  console.log('WishlistPage - localStorage:', localStorage.getItem('piko-pearl-wishlist'));

  const removeFromWishlist = (productId: string) => {
    removeItem(productId);
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    toast.success(`${item.name} added to cart!`);
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Sale": return "destructive";
      case "New": return "secondary";
      case "Bestseller": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-primary">My Wishlist</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and shop them later
            </p>
            <Button onClick={() => onNavigate('home')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg text-muted-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item: any) => {
                const productFound = findProductForItem(item, products);
                const productForCard = productFound
                  ? productFound
                  : {
                      ...item,
                      image1: item.image,
                      previousPrice: item.previousPrice || item.originalPrice,
                    };

                return (
                  <div key={item.id} className="relative">
                    {/* Render using ProductCard to match featured product layout; hide description */}
                    <ProductCard
                      product={productForCard}
                      categories={categories}
                      onNavigate={onNavigate}
                      hideDescription={true}
                    />

                    {/* Remove button overlay */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm text-red-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('home')}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}