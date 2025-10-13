import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { toast } from "sonner@2.0.3";

interface BagsPageProps {
  onNavigate: (page: string) => void;
}

export function BagsPage({ onNavigate }: BagsPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
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
      badge: bag.badge,
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

  const bags = [
    {
      id: 1,
      name: "Boho Tote Bag",
      price: 2899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 18,
      badge: "Bestseller",
      description: "Spacious handwoven tote perfect for everyday use",
      colors: ["Natural", "Purple", "Pink"]
    },
    {
      id: 2,
      name: "Mini Crossbody Bag",
      price: 2299,
      originalPrice: 2699,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 24,
      badge: "Sale",
      description: "Compact crossbody for hands-free convenience",
      colors: ["Lavender", "Cream", "Sage"]
    },
    {
      id: 3,
      name: "Market Basket Bag",
      price: 3000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 15,
      badge: "New",
      description: "Eco-friendly market bag with sturdy handles",
      colors: ["Beige", "Olive", "Dusty Rose"]
    },
    {
      id: 4,
      name: "Evening Clutch",
      price: 1999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 12,
      badge: "Elegant",
      description: "Sophisticated clutch for special occasions",
      colors: ["Black", "Gold", "Silver"]
    },
    {
      id: 5,
      name: "Bucket Bag",
      price: 2599,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 21,
      badge: "Popular",
      description: "Trendy bucket style with drawstring closure",
      colors: ["Tan", "Mauve", "Mint"]
    },
    {
      id: 6,
      name: "Laptop Tote",
      price: 3000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 9,
      badge: "Professional",
      description: "Work-ready tote with laptop compartment",
      colors: ["Navy", "Charcoal", "Burgundy"]
    }
  ];

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
      
      // Color filter
      if (colorFilter !== "all") {
        return bag.colors.some(color => 
          color.toLowerCase().includes(colorFilter.toLowerCase())
        );
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
      <div className="bg-white border-b sticky top-0 z-40">
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
            <h1 className="text-2xl font-bold text-primary">Bags Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Handcrafted Bags
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday totes to special occasion clutches, each bag is carefully crafted for style and functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
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
            
            {/* Filter Options */}
            {showFilters && (
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Price Range (Rs)</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-2000">Under Rs 2,000</SelectItem>
                        <SelectItem value="2000-2500">Rs 2,000 - Rs 2,500</SelectItem>
                        <SelectItem value="2500-3000">Rs 2,500 - Rs 3,000</SelectItem>
                        <SelectItem value="over-3000">Over Rs 3,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Color Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Color</label>
                    <Select value={colorFilter} onValueChange={setColorFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Colors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Colors</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="cream">Cream</SelectItem>
                        <SelectItem value="navy">Navy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setPriceRange("all");
                        setColorFilter("all");
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={bag.image}
                      alt={bag.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-bags-${bag.id}`)}
                    />
                    
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(bag.badge)}
                    >
                      {bag.badge}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(bag)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`bags-${bag.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
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
                                : 'text-gray-300'
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
                      onClick={() => onNavigate(`product-bags-${bag.id}`)}
                    >
                      {bag.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {bag.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {bag.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase() === 'natural' ? '#f5f5dc' :
                                            color.toLowerCase() === 'dusty rose' ? '#dcae96' :
                                            color.toLowerCase() === 'sage' ? '#9caf88' :
                                            color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          Rs {bag.price}
                        </span>
                        {bag.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {bag.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`product-bags-${bag.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}