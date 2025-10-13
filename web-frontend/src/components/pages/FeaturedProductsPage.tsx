import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Heart, ShoppingBag, Star, Filter, Search, SortAsc } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FeaturedProductsPageProps {
  onNavigate: (page: string) => void;
}

export function FeaturedProductsPage({ onNavigate }: FeaturedProductsPageProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const allFeaturedProducts = [
    {
      id: 1,
      name: "Lavender Rose Bouquet",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 32,
      badge: "Bestseller",
      description: "Beautiful handcrafted lavender roses that bloom forever",
      category: "flowers"
    },
    {
      id: 2,
      name: "Boho Tote Bag",
      price: 2899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 18,
      badge: "New",
      description: "Spacious handwoven tote perfect for everyday use",
      category: "bags"
    },
    {
      id: 3,
      name: "Sunflower Centerpiece",
      price: 2199,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1753366556699-4be495e5bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3VuZmxvd2VyJTIweWVsbG93JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 28,
      badge: "Sale",
      description: "Bright sunflower arrangement perfect for any occasion",
      category: "flowers"
    },
    {
      id: 4,
      name: "Flower Bag Charm",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 32,
      badge: "Sale",
      description: "Delicate floral charm to brighten up any bag",
      category: "charms"
    },
    {
      id: 5,
      name: "Crochet Bandana - Purple",
      price: 1299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 15,
      badge: "Popular",
      description: "Soft and comfortable bandana with modern crochet pattern",
      category: "bandanas"
    },
    {
      id: 6,
      name: "Hair Scrunchie Set",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 28,
      badge: "Set of 3",
      description: "Beautiful set of three scrunchies in complementary colors",
      category: "accessories"
    },
    {
      id: 7,
      name: "Rose Garden Collection",
      price: 2999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU5MzE5NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 45,
      badge: "Bestseller",
      description: "Complete set of handcrafted roses in various colors",
      category: "flowers"
    },
    {
      id: 8,
      name: "Market Tote Bundle",
      price: 2599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1638598125618-6095d93581a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwbWFya2V0JTIwdG90ZSUyMGJhZyUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTMyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 22,
      badge: "Popular",
      description: "Eco-friendly market bag perfect for sustainable shopping",
      category: "bags"
    },
    {
      id: 9,
      name: "Decorative Coasters Set",
      price: 1199,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1704380569362-4a293b4afe9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGVjb3JhdGl2ZSUyMGl0ZW1zfGVufDF8fHx8MTc1OTMyMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      reviews: 18,
      badge: "New",
      description: "Beautiful handmade coasters for your home",
      category: "accessories"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "flowers", label: "Flowers" },
    { value: "bags", label: "Bags" },
    { value: "charms", label: "Bag Charms" },
    { value: "bandanas", label: "Bandanas" },
    { value: "accessories", label: "Accessories" }
  ];

  const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" }
  ];

  const filteredAndSortedProducts = allFeaturedProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterBy === "all" || product.category === filterBy;
      return matchesSearch && matchesCategory;
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
        default: // featured
          return a.id - b.id;
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
            <h1 className="text-2xl font-bold text-primary">Featured Products</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved and highly-rated handcrafted pieces. Each item has been carefully selected for its exceptional quality and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search featured products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredAndSortedProducts.length} products found
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    <Badge 
                      className="absolute top-3 left-3 shadow-sm" 
                      variant={getBadgeVariant(product.badge)}
                    >
                      {product.badge}
                    </Badge>
                    
                    {/* Wishlist Button */}
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
                    
                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                        onClick={() => onNavigate('cart')}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Quick Add
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
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
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
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setFilterBy("all");
                setSortBy("featured");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Looking for Something Specific?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our full collection or get in touch for custom orders. We love creating unique pieces just for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('search')}
            >
              Browse All Products
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('contact')}
            >
              Custom Order
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}