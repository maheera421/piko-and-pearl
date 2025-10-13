import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Heart, ShoppingBag, Star, Filter, Grid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EternalBloomsPageProps {
  onNavigate: (page: string) => void;
}

export function EternalBloomsPage({ onNavigate }: EternalBloomsPageProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const eternalBloomsProducts = [
    {
      id: 1,
      name: "Lavender Rose Bouquet",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 32,
      badge: "Bestseller",
      description: "Beautiful handcrafted lavender roses that last forever",
      colors: ["Lavender", "Purple", "Pink"],
      featured: true
    },
    {
      id: 2,
      name: "Sunflower Centerpiece",
      price: 28.99,
      originalPrice: 35.99,
      image: "https://images.unsplash.com/photo-1753366556699-4be495e5bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3VuZmxvd2VyJTIweWVsbG93JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 28,
      badge: "Sale",
      description: "Bright sunflower arrangement perfect for any occasion",
      colors: ["Yellow", "Orange", "Green"],
      featured: true
    },
    {
      id: 3,
      name: "Daisy Chain Garland",
      price: 18.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1749301560225-3032826b9e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGFpc3klMjB3aGl0ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzU5MjY4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      reviews: 19,
      badge: "New",
      description: "Delicate daisy garland for home decoration",
      colors: ["White", "Yellow", "Green"],
      featured: false
    },
    {
      id: 4,
      name: "Peony Bloom Set",
      price: 32.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1508808703020-ef18109db02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwcGVvbnklMjBwaW5rJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTkyNjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5.0,
      reviews: 15,
      badge: "Premium",
      description: "Luxurious peony blooms in soft pastel colors",
      colors: ["Pink", "Peach", "Cream"],
      featured: true
    },
    {
      id: 5,
      name: "Wildflower Bouquet",
      price: 22.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwd2lsZGZsb3dlciUyMGJvdXF1ZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTkyNjgwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 24,
      badge: "Popular",
      description: "Mixed wildflower arrangement with natural charm",
      colors: ["Multi", "Purple", "Blue"],
      featured: false
    },
    {
      id: 6,
      name: "Cherry Blossom Branch",
      price: 26.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1602750665669-6c7cc05144cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hlcnJ5JTIwYmxvc3NvbSUyMHBpbmt8ZW58MXx8fHwxNzU5MjY4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 21,
      badge: "Elegant",
      description: "Delicate cherry blossom branch for spring decor",
      colors: ["Pink", "White", "Green"],
      featured: true
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Sale": return "destructive";
      case "New": return "secondary";
      case "Bestseller": return "default";
      case "Premium": return "outline";
      case "Popular": return "default";
      case "Elegant": return "secondary";
      default: return "outline";
    }
  };

  const sortedProducts = [...eternalBloomsProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "featured": return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-50/50 to-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              New Collection
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Eternal Blooms Collection
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Handcrafted with Love & Care - Discover our exquisite collection of crochet flowers 
              that capture the eternal beauty of nature's blooms. Each piece is meticulously crafted 
              to bring lasting elegance to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('contact')}>
                Custom Order
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('flowers')}>
                View All Flowers
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Color
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {sortedProducts.length} items
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
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
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-6"
          }>
            {sortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                  <div className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-48 h-48 flex-shrink-0" : ""
                  }`}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-64"
                      }`}
                    />
                    
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(product.badge)}
                    >
                      {product.badge}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm ${
                        wishlist.includes(product.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    {viewMode === "grid" && (
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                          onClick={() => onNavigate('cart')}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.colors.map((color) => (
                          <Badge key={color} variant="outline" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-foreground">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {viewMode === "list" && (
                        <Button onClick={() => onNavigate('cart')}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                      {viewMode === "grid" && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
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