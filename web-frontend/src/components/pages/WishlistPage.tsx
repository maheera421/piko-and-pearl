import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Trash2 } from "lucide-react";
import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";
import { toast } from "sonner@2.0.3";

interface WishlistPageProps {
  onNavigate: (page: string) => void;
}

export function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { items: wishlistItems, removeItem } = useWishlist();
  const { addItem } = useCart();
  
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
              {wishlistItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-card overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => {
                          const parts = item.id.split('-');
                          const category = parts[0];
                          const id = parts[1];
                          onNavigate(`product-${category}-${id}`);
                        }}
                      />
                      
                      <Badge 
                        className="absolute top-3 left-3 shadow-sm" 
                        variant={getBadgeVariant(item.badge)}
                      >
                        {item.badge}
                      </Badge>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm text-red-500 hover:text-red-600"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({item.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <h3 
                        className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => {
                          const parts = item.id.split('-');
                          const category = parts[0];
                          const id = parts[1];
                          onNavigate(`product-${category}-${id}`);
                        }}
                      >
                        {item.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-foreground">
                            Rs {item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              Rs {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const parts = item.id.split('-');
                            const category = parts[0];
                            const id = parts[1];
                            onNavigate(`product-${category}-${id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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