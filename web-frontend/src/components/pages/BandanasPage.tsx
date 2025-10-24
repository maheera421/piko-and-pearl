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

interface BandanasPageProps {
  onNavigate: (page: string) => void;
}

// Helper function to create URL-friendly slugs
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export function BandanasPage({ onNavigate }: BandanasPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
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

  const baseBandanas = [
    {
      id: 1,
      name: "Classic Crochet Bandana",
      price: 1299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Comfortable bandana perfect for daily wear"
    },
    {
      id: 2,
      name: "Boho Flower Bandana",
      price: 1499,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Beautiful floral pattern with soft texture"
    },
    {
      id: 3,
      name: "Holiday Special Bandana",
      price: 1199,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Festive design for special occasions"
    },
    {
      id: 4,
      name: "Reversible Bandana",
      price: 1799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Two patterns in one reversible design"
    },
    {
      id: 5,
      name: "Summer Vibes Bandana",
      price: 1399,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Light and breezy for warm weather"
    },
    {
      id: 6,
      name: "Personalized Bandana",
      price: 1999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Add custom text or patterns for a personal touch"
    }
  ];

  // Get products with centralized reviews data
  const allBandanas = getCategoryProductsWithReviews(baseBandanas, "bandanas");

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
        case "over-1500":
          filteredBandanas = filteredBandanas.filter(bandana => bandana.price > 1500);
          break;
      }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4" style={{ fontWeight: 600 }}>
              Handmade Crochet Bandanas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comfortable and stylish bandanas for your furry friends. Handcrafted with love and care for maximum comfort and style.
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
                  <SelectItem value="under-1300">Under Rs 1,300</SelectItem>
                  <SelectItem value="1300-1500">Rs 1,300 - 1,500</SelectItem>
                  <SelectItem value="over-1500">Over Rs 1,500</SelectItem>
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
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-card overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={bandana.image}
                      alt={bandana.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-bandanas-${createSlug(bandana.name)}`)}
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/70 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(bandana)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(`bandanas-${bandana.id}`) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600 dark:text-gray-300'
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
                                : 'text-gray-300 dark:text-gray-600'
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
                      onClick={() => onNavigate(`product-bandanas-${createSlug(bandana.name)}`)}
                    >
                      {bandana.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {bandana.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">Rs {bandana.price}</span>
                        {bandana.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {bandana.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onNavigate(`product-bandanas-${createSlug(bandana.name)}`)}
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