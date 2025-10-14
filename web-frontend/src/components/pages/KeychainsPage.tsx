import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface KeychainsPageProps {
  onNavigate: (page: string) => void;
}

export function KeychainsPage({ onNavigate }: KeychainsPageProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const keychains = [
    {
      id: 1,
      name: "Lavender Dreams Keychain",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 24,
      badge: "Bestseller",
      description: "Adorable lavender-colored keychain with pearl accents",
      colors: ["Lavender", "Pink", "White"]
    },
    {
      id: 2,
      name: "Mini Amigurumi Bear",
      price: 8.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 18,
      badge: "New",
      description: "Cute tiny bear amigurumi perfect for keys",
      colors: ["Brown", "Beige", "Gray"]
    },
    {
      id: 3,
      name: "Flower Power Keychain",
      price: 10.99,
      originalPrice: 13.99,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 32,
      badge: "Sale",
      description: "Beautiful flower design in vibrant colors",
      colors: ["Purple", "Pink", "Yellow"]
    },
    {
      id: 4,
      name: "Rainbow Heart Keychain",
      price: 14.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 15,
      badge: "Popular",
      description: "Colorful rainbow heart design",
      colors: ["Rainbow", "Pink", "Purple"]
    },
    {
      id: 5,
      name: "Star Charm Keychain",
      price: 9.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 28,
      badge: "Cute",
      description: "Delicate star design with shimmer details",
      colors: ["Gold", "Silver", "Purple"]
    },
    {
      id: 6,
      name: "Mini Cactus Keychain",
      price: 11.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1617897210309-61331a57ac1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwa2V5Y2hhaW4lMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 21,
      badge: "Trendy",
      description: "Adorable mini cactus in a tiny pot",
      colors: ["Green", "Pink", "Blue"]
    }
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
            <h1 className="text-2xl font-bold text-primary">Keychains Collection</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Adorable Keychains
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of handcrafted keychains. Each piece is lovingly made with premium yarn and attention to detail.
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
                {keychains.length} products
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
            {keychains.map((keychain) => (
              <Card 
                key={keychain.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={keychain.image}
                      alt={keychain.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigate(`product-${keychain.id}`)}
                    />
                    
                    {/* Badge */}
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(keychain.badge)}
                    >
                      {keychain.badge}
                    </Badge>
                    
                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(keychain.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          wishlist.includes(keychain.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    
                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => onNavigate('cart')}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
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
                              i < Math.floor(keychain.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({keychain.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => onNavigate(`product-${keychain.id}`)}
                    >
                      {keychain.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {keychain.description}
                    </p>

                    {/* Colors */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {keychain.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase() === 'rainbow' ? '#ff6b6b' : 
                                            color.toLowerCase() === 'gold' ? '#ffd700' :
                                            color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                            color.toLowerCase()
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          Rs {keychain.price}
                        </span>
                        {keychain.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs {keychain.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`product-${keychain.id}`)}
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