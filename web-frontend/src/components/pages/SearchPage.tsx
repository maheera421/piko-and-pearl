import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Search, Filter, Heart, ShoppingBag, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCart } from "../CartContext";
import { toast } from "sonner@2.0.3";

interface SearchPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export function SearchPage({ onNavigate, initialQuery = "" }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [category, setCategory] = useState("all");
  const { addItem } = useCart();

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Mock search results - in a real app, this would come from an API
  const allProducts = [
    // Flowers
    {
      id: 1,
      name: "Lavender Rose Bouquet",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 32,
      badge: "Bestseller",
      category: "Flowers",
      description: "Beautiful handcrafted lavender roses that last forever"
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
      category: "Flowers",
      description: "Bright sunflower arrangement perfect for any occasion"
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
      category: "Flowers",
      description: "Delicate daisy garland for home decoration"
    },
    // Bags
    {
      id: 4,
      name: "Boho Tote Bag",
      price: 34.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 18,
      badge: "Bestseller",
      category: "Bags",
      description: "Spacious handwoven tote perfect for everyday use"
    },
    // Bag Charms
    {
      id: 5,
      name: "Butterfly Charm",
      price: 8.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 22,
      badge: "New",
      category: "Bag Charms",
      description: "Delicate butterfly design with pearl accents"
    },
    // Bandanas
    {
      id: 6,
      name: "Pet Bandana - Purple",
      price: 16.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 15,
      badge: "Popular",
      category: "Bandanas",
      description: "Soft and comfortable bandana for your furry friend"
    },
    // Accessories
    {
      id: 7,
      name: "Hair Scrunchie Set",
      price: 19.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 28,
      badge: "Set",
      category: "Accessories",
      description: "Beautiful set of three scrunchies in complementary colors"
    }
  ];

  const filteredResults = allProducts.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearch && matchesCategory;
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
            <h1 className="text-2xl font-bold text-primary">Search Products</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="py-8 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for flowers, bags, charms, bandanas, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            {/* Popular Searches */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["flowers", "tote bag", "sunflower", "lavender", "daisy"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="flowers">Flowers</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="bag charms">Bag Charms</SelectItem>
                  <SelectItem value="bandanas">Bandanas</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {filteredResults.length} results
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
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

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Search results for "{searchQuery}"
              </h2>
            </div>
          )}

          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => onNavigate('keychains')}>Browse Keychains</Button>
                <Button variant="outline" onClick={() => onNavigate('bags')}>Browse Bags</Button>
                <Button variant="outline" onClick={() => onNavigate('charms')}>Browse Charms</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredResults.map((product) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => onNavigate(`product-${product.id}`)}
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
                        className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            wishlist.includes(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </Button>
                      
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="text-xs mr-2">
                          {product.category}
                        </Badge>
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
                      
                      <h3 
                        className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => onNavigate(`product-${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-foreground">
                            Rs {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              Rs {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onNavigate(`product-${product.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}