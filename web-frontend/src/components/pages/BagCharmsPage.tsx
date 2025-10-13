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

interface BagCharmsPageProps {
  onNavigate: (page: string) => void;
}

export function BagCharmsPage({ onNavigate }: BagCharmsPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (charm: any) => {
    const wishlistItem = {
      id: `charms-${charm.id}`,
      name: charm.name,
      price: charm.price,
      originalPrice: charm.originalPrice,
      image: charm.image,
      category: 'Bag Charms',
      rating: charm.rating,
      reviews: charm.reviews,
      badge: charm.badge,
      description: charm.description
    };
    
    const wasInWishlist = isInWishlist(`charms-${charm.id}`);
    toggleItem(wishlistItem);
    toast.success(
      wasInWishlist
        ? `${charm.name} removed from wishlist` 
        : `${charm.name} added to wishlist!`
    );
  };

  const handleAddToCart = (charm: any) => {
    addItem({
      id: `charms-${charm.id}`,
      name: charm.name,
      price: charm.price,
      image: charm.image,
      category: 'Bag Charms'
    });
    toast.success(`${charm.name} added to cart!`);
  };

  const allCharms = [
    {
      id: 1,
      name: "Butterfly Charm",
      price: 899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 22,
      badge: "New",
      description: "Delicate butterfly design with pearl accents",
      colors: ["Purple", "Pink", "Blue"],
      style: "nature"
    },
    {
      id: 2,
      name: "Tassel Charm",
      price: 699,
      originalPrice: 899,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 18,
      badge: "Sale",
      description: "Elegant tassel charm in various colors",
      colors: ["Gold", "Silver", "Rose Gold"],
      style: "classic"
    },
    {
      id: 3,
      name: "Mini Flower Charm",
      price: 799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 25,
      badge: "Bestseller",
      description: "Cute mini flower perfect for any bag",
      colors: ["Lavender", "White", "Yellow"],
      style: "nature"
    },
    {
      id: 4,
      name: "Geometric Charm",
      price: 999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 14,
      badge: "Modern",
      description: "Contemporary geometric design",
      colors: ["Black", "Gray", "Beige"],
      style: "modern"
    },
    {
      id: 5,
      name: "Pom Pom Charm",
      price: 599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 31,
      badge: "Popular",
      description: "Fluffy pom pom in vibrant colors",
      colors: ["Pink", "Purple", "Mint"],
      style: "playful"
    },
    {
      id: 6,
      name: "Heart Charm",
      price: 849,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 19,
      badge: "Cute",
      description: "Sweet heart design with decorative stitching",
      colors: ["Red", "Pink", "Purple"],
      style: "cute"
    }
  ];

  // Filtering and sorting logic
  const getFilteredAndSortedCharms = () => {
    let filteredCharms = [...allCharms];
    
    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-700":
          filteredCharms = filteredCharms.filter(charm => charm.price < 700);
          break;
        case "700-900":
          filteredCharms = filteredCharms.filter(charm => charm.price >= 700 && charm.price <= 900);
          break;
        case "over-900":
          filteredCharms = filteredCharms.filter(charm => charm.price > 900);
          break;
      }
    }

    // Apply style filter
    if (styleFilter !== "all") {
      filteredCharms = filteredCharms.filter(charm => charm.style === styleFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filteredCharms.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filteredCharms.sort((a, b) => b.price - a.price);
      case 'rating':
        return filteredCharms.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filteredCharms.sort((a, b) => b.id - a.id);
      default:
        return filteredCharms;
    }
  };

  const charms = getFilteredAndSortedCharms();

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
            <h1 className="text-2xl font-bold text-primary">Bag Charms Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beautiful Bag Charms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add personality to your bags with our handcrafted charms. Each piece is designed to complement your style.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {charms.length} products
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {charms.map((charm) => (
              <Card 
                key={charm.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={charm.image}
                      alt={charm.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-charms-${charm.id}`)}
                    />
                    
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(charm.badge)}
                    >
                      {charm.badge}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(charm)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`charms-${charm.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => handleAddToCart(charm)}
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
                              i < Math.floor(charm.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({charm.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-charms-${charm.id}`)}
                    >
                      {charm.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {charm.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {charm.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase() === 'rose gold' ? '#e8b4b8' : color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          Rs {charm.price}
                        </span>
                        {charm.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {charm.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`product-charms-${charm.id}`)}
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