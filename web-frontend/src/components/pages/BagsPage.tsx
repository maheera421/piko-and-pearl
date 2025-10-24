import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { toast } from "sonner@2.0.3";
import { getCategoryProductsWithReviews } from "../ProductData";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface BagsPageProps {
  onNavigate: (page: string) => void;
}

// Helper function to create URL-friendly slugs
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export function BagsPage({ onNavigate }: BagsPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (bag: any) => {
    const wishlistItem = {
      id: `bags-${bag.id}`,
      name: bag.name,
      price: bag.price,
      originalPrice: bag.originalPrice,
      image: bag.image,
      category: 'Bags',
      rating: bag.rating,
      reviews: bag.reviews,
      description: bag.description
    };
    
    const wasInWishlist = isInWishlist(`bags-${bag.id}`);
    toggleItem(wishlistItem);
    toast.success(
      wasInWishlist
        ? `${bag.name} removed from wishlist` 
        : `${bag.name} added to wishlist!`
    );
  };

  const handleAddToCart = (bag: any) => {
    addItem({
      id: `bags-${bag.id}`,
      name: bag.name,
      price: bag.price,
      image: bag.image,
      category: 'Bags'
    });
    toast.success(`${bag.name} added to cart!`);
  };

  const baseBags = [
    {
      id: 1,
      name: "Boho Tote Bag",
      price: 2899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Spacious handwoven tote perfect for everyday use"
    },
    {
      id: 2,
      name: "Mini Crossbody Bag",
      price: 2299,
      originalPrice: 2699,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Compact crossbody for hands-free convenience"
    },
    {
      id: 3,
      name: "Market Basket Bag",
      price: 3000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Eco-friendly market bag with sturdy handles"
    },
    {
      id: 4,
      name: "Evening Clutch",
      price: 1999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Sophisticated clutch for special occasions"
    },
    {
      id: 5,
      name: "Bucket Bag",
      price: 2599,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Trendy bucket style with drawstring closure"
    },
    {
      id: 6,
      name: "Laptop Tote",
      price: 3000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Work-ready tote with laptop compartment"
    }
  ];

  // Get all bags with calculated ratings and review counts
  const bags = getCategoryProductsWithReviews(baseBags, 'bags');

  // Filter and sort products
  const filteredAndSortedBags = bags
    .filter(bag => {
      // Price range filter
      if (priceRange !== "all") {
        switch (priceRange) {
          case "under-2000":
            if (bag.price >= 2000) return false;
            break;
          case "2000-2500":
            if (bag.price < 2000 || bag.price > 2500) return false;
            break;
          case "2500-3000":
            if (bag.price < 2500 || bag.price > 3000) return false;
            break;
          case "over-3000":
            if (bag.price <= 3000) return false;
            break;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4" style={{ fontWeight: 600 }}>
              Handmade Crochet Bags
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of beautiful, functional bags. Each piece is lovingly handmade with attention to detail and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 bg-white dark:bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-2000">Under Rs 2,000</SelectItem>
                  <SelectItem value="2000-2500">Rs 2,000 - 2,500</SelectItem>
                  <SelectItem value="2500-3000">Rs 2,500 - 3,000</SelectItem>
                  <SelectItem value="over-3000">Over Rs 3,000</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">
                {filteredAndSortedBags.length} products
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedBags.map((bag) => (
              <Card 
                key={bag.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-card overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={bag.image}
                      alt={bag.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-bags-${createSlug(bag.name)}`)}
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/70 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(bag)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`bags-${bag.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`} 
                      />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => handleAddToCart(bag)}
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
                              i < Math.floor(bag.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({bag.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-bags-${createSlug(bag.name)}`)}
                    >
                      {bag.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {bag.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">Rs {bag.price}</span>
                        {bag.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {bag.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onNavigate(`product-bags-${createSlug(bag.name)}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}