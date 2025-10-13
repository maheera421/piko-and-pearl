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

interface BandanasPageProps {
  onNavigate: (page: string) => void;
}

export function BandanasPage({ onNavigate }: BandanasPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (bandana: any) => {
    const wishlistItem = {
      id: `bandanas-${bandana.id}`,
      name: bandana.name,
      price: bandana.price,
      originalPrice: bandana.originalPrice,
      image: bandana.image,
      category: 'Bandanas',
      rating: bandana.rating,
      reviews: bandana.reviews,
      badge: bandana.badge,
      description: bandana.description
    };
    
    const wasInWishlist = isInWishlist(`bandanas-${bandana.id}`);
    toggleItem(wishlistItem);
    toast.success(
      wasInWishlist
        ? `${bandana.name} removed from wishlist` 
        : `${bandana.name} added to wishlist!`
    );
  };

  const handleAddToCart = (bandana: any) => {
    addItem({
      id: `bandanas-${bandana.id}`,
      name: bandana.name,
      price: bandana.price,
      image: bandana.image,
      category: 'Bandanas'
    });
    toast.success(`${bandana.name} added to cart!`);
  };

  const allBandanas = [
    {
      id: 1,
      name: "Classic Crochet Bandana",
      price: 1299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 34,
      badge: "Bestseller",
      description: "Comfortable bandana perfect for daily wear",
      colors: ["Purple", "Pink", "Blue"],
      sizes: ["Small", "Medium", "Large"]
    },
    {
      id: 2,
      name: "Boho Flower Bandana",
      price: 1499,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 28,
      badge: "New",
      description: "Beautiful floral pattern with soft texture",
      colors: ["Lavender", "Rose", "Cream"],
      sizes: ["Small", "Medium", "Large"]
    },
    {
      id: 3,
      name: "Holiday Special Bandana",
      price: 1199,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 22,
      badge: "Sale",
      description: "Festive design for special occasions",
      colors: ["Red", "Green", "Gold"],
      sizes: ["Small", "Medium", "Large"]
    },
    {
      id: 4,
      name: "Reversible Bandana",
      price: 1799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 16,
      badge: "Premium",
      description: "Two patterns in one reversible design",
      colors: ["Multi", "Rainbow", "Pastels"],
      sizes: ["Small", "Medium", "Large"]
    },
    {
      id: 5,
      name: "Summer Vibes Bandana",
      price: 1399,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 31,
      badge: "Trendy",
      description: "Light and breezy for warm weather",
      colors: ["Yellow", "Orange", "Coral"],
      sizes: ["Small", "Medium", "Large"]
    },
    {
      id: 6,
      name: "Personalized Bandana",
      price: 1999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 12,
      badge: "Custom",
      description: "Add custom text or patterns for a personal touch",
      colors: ["Any Color", "Custom", "Made to Order"],
      sizes: ["Small", "Medium", "Large", "XL"]
    }
  ];

  // Filtering and sorting logic
  const getFilteredAndSortedBandanas = () => {
    let filteredBandanas = [...allBandanas];
    
    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-1300":
          filteredBandanas = filteredBandanas.filter(bandana => bandana.price < 1300);
          break;
        case "1300-1500":
          filteredBandanas = filteredBandanas.filter(bandana => bandana.price >= 1300 && bandana.price <= 1500);
          break;
        case "1500-1800":
          filteredBandanas = filteredBandanas.filter(bandana => bandana.price >= 1500 && bandana.price <= 1800);
          break;
        case "over-1800":
          filteredBandanas = filteredBandanas.filter(bandana => bandana.price > 1800);
          break;
      }
    }

    // Apply color filter
    if (colorFilter !== "all") {
      filteredBandanas = filteredBandanas.filter(bandana => 
        bandana.colors.some(color => color.toLowerCase().includes(colorFilter.toLowerCase()))
      );
    }

    // Apply size filter
    if (sizeFilter !== "all") {
      filteredBandanas = filteredBandanas.filter(bandana => 
        bandana.sizes.some(size => size.toLowerCase() === sizeFilter.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filteredBandanas.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filteredBandanas.sort((a, b) => b.price - a.price);
      case 'rating':
        return filteredBandanas.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filteredBandanas.sort((a, b) => b.id - a.id);
      default:
        return filteredBandanas;
    }
  };

  const bandanas = getFilteredAndSortedBandanas();

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
            <h1 className="text-2xl font-bold text-primary">Bandanas Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cozy Crochet Bandanas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay stylish and comfortable with our handcrafted crochet bandanas. Made with love in beautiful colors and patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-1300">Under Rs 1,300</SelectItem>
                  <SelectItem value="1300-1500">Rs 1,300 - 1,500</SelectItem>
                  <SelectItem value="1500-1800">Rs 1,500 - 1,800</SelectItem>
                  <SelectItem value="over-1800">Over Rs 1,800</SelectItem>
                </SelectContent>
              </Select>

              <Select value={colorFilter} onValueChange={setColorFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="multi">Multi</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">
                {bandanas.length} products
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
            {bandanas.map((bandana) => (
              <Card 
                key={bandana.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={bandana.image}
                      alt={bandana.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-bandanas-${bandana.id}`)}
                    />
                    
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(bandana.badge)}
                    >
                      {bandana.badge}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(bandana)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`bandanas-${bandana.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => handleAddToCart(bandana)}
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
                              i < Math.floor(bandana.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({bandana.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-${bandana.id}`)}
                    >
                      {bandana.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {bandana.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {bandana.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase() === 'multi' ? '#ff6b6b' :
                                            color.toLowerCase() === 'rainbow' ? '#4ecdc4' :
                                            color.toLowerCase() === 'pastels' ? '#ffeaa7' :
                                            color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-muted-foreground">Sizes:</span>
                      <span className="text-xs text-foreground">{bandana.sizes.join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          Rs {bandana.price}
                        </span>
                        {bandana.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {bandana.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`product-bandanas-${bandana.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {bandanas.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No bandanas found</h3>
                <p>Try adjusting your filter criteria to see more products</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setPriceFilter("all");
                  setColorFilter("all");
                  setSizeFilter("all");
                  setSortBy("featured");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}