import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Heart, ShoppingBag, Star, Sparkles, Calendar, Tag } from "lucide-react";

interface NewCollectionPageProps {
  onNavigate: (page: string) => void;
}

export function NewCollectionPage({ onNavigate }: NewCollectionPageProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const newCollectionProducts = [
    {
      id: 1,
      name: "Sunset Bloom Bouquet",
      price: 32.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU5MzE5NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 15,
      badge: "New",
      description: "Warm sunset-inspired crochet flowers that capture the golden hour",
      category: "flowers",
      releaseDate: "2025-01-01"
    },
    {
      id: 2,
      name: "Modern Minimalist Tote",
      price: 42.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1638598125618-6095d93581a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwbWFya2V0JTIwdG90ZSUyMGJhZyUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTMyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 8,
      badge: "New",
      description: "Clean lines and contemporary design meet traditional craftsmanship",
      category: "bags",
      releaseDate: "2025-01-01"
    },
    {
      id: 3,
      name: "Pastel Dreams Collection",
      price: 26.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753366556699-4be495e5bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3VuZmxvd2VyJTIweWVsbG93JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviews: 12,
      badge: "New",
      description: "Soft pastel flowers perfect for spring and dreamy home decor",
      category: "flowers",
      releaseDate: "2025-01-01"
    },
    {
      id: 4,
      name: "Geometric Pattern Bandana",
      price: 18.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 6,
      badge: "New",
      description: "Modern geometric patterns in bold contemporary colors",
      category: "bandanas",
      releaseDate: "2025-01-01"
    },
    {
      id: 5,
      name: "Crystal Flower Charms",
      price: 12.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 9,
      badge: "New",
      description: "Delicate flower charms with crystal-like finish for extra sparkle",
      category: "charms",
      releaseDate: "2025-01-01"
    },
    {
      id: 6,
      name: "Wellness Hair Accessories",
      price: 24.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 11,
      badge: "New",
      description: "Gentle hair accessories designed for comfort and style",
      category: "accessories",
      releaseDate: "2025-01-01"
    },
    {
      id: 7,
      name: "Bohemian Dream Catcher",
      price: 35.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1704380569362-4a293b4afe9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGVjb3JhdGl2ZSUyMGl0ZW1zfGVufDF8fHx8MTc1OTMyMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviews: 7,
      badge: "New",
      description: "Intricate bohemian-style dream catcher for peaceful vibes",
      category: "accessories",
      releaseDate: "2025-01-01"
    },
    {
      id: 8,
      name: "Garden Party Set",
      price: 48.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTMxOTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 5.0,
      reviews: 4,
      badge: "Limited",
      description: "Complete garden-themed set with multiple coordinated pieces",
      category: "flowers",
      releaseDate: "2025-01-01"
    }
  ];

  const collectionStats = [
    { label: "New Items", value: "8" },
    { label: "Categories", value: "5" },
    { label: "Average Rating", value: "4.8" },
    { label: "Release Date", value: "Jan 2025" }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Limited": return "destructive";
      case "New": return "secondary";
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
            <h1 className="text-2xl font-bold text-primary">New Collection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fresh & New</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Latest Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our newest handcrafted pieces, inspired by contemporary design and timeless elegance. 
              Each item represents hours of careful work and attention to detail.
            </p>
            
            {/* Collection Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {collectionStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </section>

      {/* Collection Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Just Released</h3>
              <p className="text-sm text-muted-foreground">
                Fresh from our studio, these pieces showcase our latest design inspiration and techniques.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Limited Quantities</h3>
              <p className="text-sm text-muted-foreground">
                Each piece is handmade in small batches, making every item unique and special.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Pre-Order Available</h3>
              <p className="text-sm text-muted-foreground">
                Love something? Reserve yours now with our convenient pre-order system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete new collection featuring innovative designs and fresh color palettes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newCollectionProducts.map((product) => (
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
                          ${product.price}
                        </span>
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be the First to Know
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get early access to new collections, exclusive designs, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              size="lg"
              variant="secondary"
              className="flex-1"
              onClick={() => onNavigate('contact')}
            >
              Subscribe Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onNavigate('examples')}
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}