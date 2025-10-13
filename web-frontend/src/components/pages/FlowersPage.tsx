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

interface FlowersPageProps {
  onNavigate: (page: string) => void;
}

export function FlowersPage({ onNavigate }: FlowersPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (flower: any) => {
    const wishlistItem = {
      id: `flowers-${flower.id}`,
      name: flower.name,
      price: flower.price,
      originalPrice: flower.originalPrice,
      image: flower.image,
      category: 'Flowers',
      rating: flower.rating,
      reviews: flower.reviews,
      badge: flower.badge,
      description: flower.description
    };
    
    const wasInWishlist = isInWishlist(`flowers-${flower.id}`);
    toggleItem(wishlistItem);
    toast.success(
      wasInWishlist
        ? `${flower.name} removed from wishlist` 
        : `${flower.name} added to wishlist!`
    );
  };

  const handleAddToCart = (flower: any) => {
    addItem({
      id: `flowers-${flower.id}`,
      name: flower.name,
      price: flower.price,
      image: flower.image,
      category: 'Flowers'
    });
    toast.success(`${flower.name} added to cart!`);
  };

  const allFlowers = [
    {
      id: 1,
      name: "Lavender Rose Bouquet",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 32,
      badge: "Bestseller",
      description: "Beautiful handcrafted lavender roses that last forever",
      colors: ["Lavender", "Purple", "Pink"]
    },
    {
      id: 2,
      name: "Sunflower Centerpiece",
      price: 2199,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1753366556699-4be495e5bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3VuZmxvd2VyJTIweWVsbG93JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 28,
      badge: "Sale",
      description: "Bright sunflower arrangement perfect for any occasion",
      colors: ["Yellow", "Orange", "Green"]
    },
    {
      id: 3,
      name: "Daisy Chain Garland",
      price: 1899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1749301560225-3032826b9e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGFpc3klMjB3aGl0ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzU5MjY4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      reviews: 19,
      badge: "New",
      description: "Delicate daisy garland for home decoration",
      colors: ["White", "Yellow", "Green"]
    },
    {
      id: 4,
      name: "Peony Bloom Set",
      price: 2999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1508808703020-ef18109db02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwcGVvbnklMjBwaW5rJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTkyNjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5.0,
      reviews: 15,
      badge: "Premium",
      description: "Luxurious peony blooms in soft pastel colors",
      colors: ["Pink", "Peach", "Cream"]
    },
    {
      id: 5,
      name: "Wildflower Bouquet",
      price: 2399,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwd2lsZGZsb3dlciUyMGJvdXF1ZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTkyNjgwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 24,
      badge: "Popular",
      description: "Mixed wildflower arrangement with natural charm",
      colors: ["Multi", "Purple", "Blue"]
    },
    {
      id: 6,
      name: "Cherry Blossom Branch",
      price: 2699,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1602750665669-6c7cc05144cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hlcnJ5JTIwYmxvc3NvbSUyMHBpbmt8ZW58MXx8fHwxNzU5MjY4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 21,
      badge: "Elegant",
      description: "Delicate cherry blossom branch for spring decor",
      colors: ["Pink", "White", "Green"]
    },
    {
      id: 7,
      name: "Mini Rose Trio",
      price: 1599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      reviews: 35,
      badge: "Cute",
      description: "Set of three small roses perfect for any space",
      colors: ["Red", "Pink", "White"]
    },
    {
      id: 8,
      name: "Tulip Garden Set",
      price: 2799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1749301560225-3032826b9e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGFpc3klMjB3aGl0ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzU5MjY4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 27,
      badge: "Spring",
      description: "Beautiful tulip collection in spring colors",
      colors: ["Purple", "Yellow", "Pink"]
    }
  ];

  // Filtering and sorting logic
  const getFilteredAndSortedFlowers = () => {
    let filteredFlowers = [...allFlowers];
    
    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-1500":
          filteredFlowers = filteredFlowers.filter(flower => flower.price < 1500);
          break;
        case "1500-2500":
          filteredFlowers = filteredFlowers.filter(flower => flower.price >= 1500 && flower.price <= 2500);
          break;
        case "over-2500":
          filteredFlowers = filteredFlowers.filter(flower => flower.price > 2500);
          break;
      }
    }

    // Apply color filter
    if (colorFilter !== "all") {
      filteredFlowers = filteredFlowers.filter(flower => 
        flower.colors.some(color => color.toLowerCase().includes(colorFilter.toLowerCase()))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filteredFlowers.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filteredFlowers.sort((a, b) => b.price - a.price);
      case 'rating':
        return filteredFlowers.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filteredFlowers.sort((a, b) => b.id - a.id);
      default:
        return filteredFlowers;
    }
  };

  const flowers = getFilteredAndSortedFlowers();

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
            <h1 className="text-2xl font-bold text-primary">Crochet Flowers Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beautiful Crochet Flowers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted floral arrangements that bloom forever. Each piece captures the delicate beauty of nature in soft, lasting yarn.
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
                  <SelectItem value="under-1500">Under Rs 1,500</SelectItem>
                  <SelectItem value="1500-2500">Rs 1,500 - 2,500</SelectItem>
                  <SelectItem value="over-2500">Over Rs 2,500</SelectItem>
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
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">
                {flowers.length} products
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
            {flowers.map((flower) => (
              <Card 
                key={flower.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={flower.image}
                      alt={flower.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-flowers-${flower.id}`)}
                    />
                    
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(flower.badge)}
                    >
                      {flower.badge}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(flower)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`flowers-${flower.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => handleAddToCart(flower)}
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
                              i < Math.floor(flower.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({flower.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-flowers-${flower.id}`)}
                    >
                      {flower.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {flower.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {flower.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase() === 'multi' ? '#ff6b6b' :
                                            color.toLowerCase() === 'cream' ? '#f5f5dc' :
                                            color.toLowerCase() === 'peach' ? '#ffcba4' :
                                            color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          Rs {flower.price}
                        </span>
                        {flower.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {flower.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`product-flowers-${flower.id}`)}
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