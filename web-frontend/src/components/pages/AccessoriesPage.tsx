import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { toast } from "sonner@2.0.3";

interface AccessoriesPageProps {
  onNavigate: (page: string) => void;
}

export function AccessoriesPage({ onNavigate }: AccessoriesPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const toggleWishlist = (accessory: any) => {
    const wishlistItem = {
      id: `accessories-${accessory.id}`,
      name: accessory.name,
      price: accessory.price,
      originalPrice: accessory.originalPrice,
      image: accessory.image,
      category: 'Accessories',
      rating: accessory.rating,
      reviews: accessory.reviews,
      description: accessory.description
    };
    
    const wasInWishlist = isInWishlist(`accessories-${accessory.id}`);
    toggleItem(wishlistItem);
    toast.success(
      wasInWishlist
        ? `${accessory.name} removed from wishlist` 
        : `${accessory.name} added to wishlist!`
    );
  };

  const handleAddToCart = (accessory: any) => {
    addItem({
      id: `accessories-${accessory.id}`,
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      category: 'Accessories'
    });
    toast.success(`${accessory.name} added to cart!`);
  };

  const allAccessories = [
    {
      id: 1,
      name: "Hair Scrunchie Set",
      price: 1299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 45,
      description: "Set of 3 soft crochet scrunchies"
    },
    {
      id: 2,
      name: "Crochet Headband",
      price: 1599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 32,
      description: "Cozy winter headband with flower detail"
    },
    {
      id: 3,
      name: "Phone Case Cover",
      price: 1799,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 28,
      description: "Protective crochet phone case with strap"
    },
    {
      id: 4,
      name: "Bookmark Set",
      price: 999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 19,
      description: "Adorable bookmarks with tassels"
    },
    {
      id: 5,
      name: "Coin Purse",
      price: 1399,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 37,
      description: "Small purse perfect for coins and cards"
    },
    {
      id: 6,
      name: "Cup Cozy Set",
      price: 1599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 24,
      description: "Keep your drinks warm with style"
    },
    {
      id: 7,
      name: "Jewelry Pouch",
      price: 1999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 15,
      description: "Delicate pouch for storing jewelry"
    },
    {
      id: 8,
      name: "Plant Pot Cover",
      price: 1799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 21,
      description: "Stylish cover for your plant pots"
    }
  ];

  // Filtering and sorting logic
  const getFilteredAndSortedAccessories = () => {
    let filteredAccessories = [...allAccessories];
    
    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-1200":
          filteredAccessories = filteredAccessories.filter(accessory => accessory.price < 1200);
          break;
        case "1200-1600":
          filteredAccessories = filteredAccessories.filter(accessory => accessory.price >= 1200 && accessory.price <= 1600);
          break;
        case "over-1600":
          filteredAccessories = filteredAccessories.filter(accessory => accessory.price > 1600);
          break;
      }
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filteredAccessories.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filteredAccessories.sort((a, b) => b.price - a.price);
      case 'rating':
        return filteredAccessories.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filteredAccessories.sort((a, b) => b.id - a.id);
      default:
        return filteredAccessories;
    }
  };

  const accessories = getFilteredAndSortedAccessories();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-card border-b sticky top-0 z-40">
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
            <h1 className="text-2xl font-bold text-primary">Crochet Accessories Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Charming Crochet Accessories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover unique handmade accessories that add a touch of warmth and personality to your daily life.
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
              
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-1200">Under Rs 1,200</SelectItem>
                  <SelectItem value="1200-1600">Rs 1,200 - 1,600</SelectItem>
                  <SelectItem value="over-1600">Over Rs 1,600</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">
                {accessories.length} products
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
            {accessories.map((accessory) => (
              <Card 
                key={accessory.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-card overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={accessory.image}
                      alt={accessory.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-accessories-${accessory.id}`)}
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/70 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(accessory)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`accessories-${accessory.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`} 
                      />
                    </Button>
                    
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => handleAddToCart(accessory)}
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
                              i < Math.floor(accessory.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({accessory.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-accessories-${accessory.id}`)}
                    >
                      {accessory.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {accessory.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">Rs {accessory.price}</span>
                        {accessory.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {accessory.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onNavigate(`product-accessories-${accessory.id}`)}
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
    </div>
  );
}
