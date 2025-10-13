import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Heart, Sparkles, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ViewExamplesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function ViewExamplesPage({ onNavigate }: ViewExamplesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCustomOrder = (example: any) => {
    // Navigate to contact page with pre-filled information
    onNavigate('contact', undefined, {
      type: 'custom-order',
      referenceImage: example.image,
      suggestedColors: example.colors,
      category: example.category,
      title: example.title,
      description: example.description
    });
  };

  const exampleDesigns = [
    {
      id: 1,
      title: "Lilac Garden Bouquet",
      category: "flowers",
      image: "https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTMxOTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Lilac", "Purple", "White"],
      difficulty: "Medium",
      timeEstimate: "2-3 weeks",
      description: "Beautiful crochet flowers arranged in a bouquet style with delicate lilac and purple tones."
    },
    {
      id: 2,
      title: "Boho Crochet Tote",
      category: "bags",
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MzE5OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Cream", "Beige", "Natural"],
      difficulty: "Advanced",
      timeEstimate: "3-4 weeks",
      description: "Spacious handmade tote bag with intricate crochet patterns, perfect for everyday use."
    },
    {
      id: 3,
      title: "Colorful Accessories Set",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1603321581635-d46915755425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTkzMTk5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Rainbow", "Multicolor", "Bright"],
      difficulty: "Easy",
      timeEstimate: "1-2 weeks",
      description: "Vibrant collection of crochet accessories including headbands and small decorative items."
    },
    {
      id: 4,
      title: "Granny Square Blanket",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1597954222003-0ce9cfa08494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwcGF0dGVybnMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkzMTk5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Purple", "White", "Pink"],
      difficulty: "Advanced",
      timeEstimate: "4-6 weeks",
      description: "Classic granny square pattern blanket in beautiful purple and pink color combination."
    },
    {
      id: 5,
      title: "Trendy Crochet Bandana",
      category: "bandanas",
      image: "https://images.unsplash.com/photo-1737044970523-cae42821cbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTMxOTk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Coral", "Orange", "Pink"],
      difficulty: "Easy",
      timeEstimate: "1 week",
      description: "Stylish crochet bandana with modern pattern and vibrant coral tones."
    },
    {
      id: 6,
      title: "Rainbow Yarn Collection",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1700170726155-fe844921b8b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIweWFybiUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTI0MzU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["All Colors", "Custom", "Rainbow"],
      difficulty: "Variable",
      timeEstimate: "Custom",
      description: "Choose from our rainbow collection of premium yarns for any custom project."
    },
    {
      id: 7,
      title: "Delicate Rose Flowers",
      category: "flowers",
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU5MzE5NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Pink", "Rose", "Peach"],
      difficulty: "Medium",
      timeEstimate: "2-3 weeks",
      description: "Intricate crochet roses with realistic petals and beautiful pink color gradients."
    },
    {
      id: 8,
      title: "Market Tote Bag",
      category: "bags",
      image: "https://images.unsplash.com/photo-1638598125618-6095d93581a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwbWFya2V0JTIwdG90ZSUyMGJhZyUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTMyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Natural", "Beige", "Brown"],
      difficulty: "Medium",
      timeEstimate: "2-3 weeks",
      description: "Practical market bag with sturdy handles and eco-friendly design."
    },
    {
      id: 9,
      title: "Cute Amigurumi Animals",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1753370241593-9cc8c17d7434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYW1pZ3VydW1pJTIwY3V0ZXxlbnwxfHx8fDE3NTkyNDM0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Pastel Pink", "Baby Blue", "Cream"],
      difficulty: "Advanced",
      timeEstimate: "3-4 weeks",
      description: "Adorable crocheted animals perfect as gifts or home decoration."
    },
    {
      id: 10,
      title: "Cozy Scarf Collection",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1737044970523-cae42821cbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc2NhcmYlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTkzMjAzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Coral", "Warm Orange", "Sunset Pink"],
      difficulty: "Easy",
      timeEstimate: "1-2 weeks",
      description: "Soft and warm scarves in beautiful gradient colors."
    },
    {
      id: 11,
      title: "Decorative Home Items",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1704380569362-4a293b4afe9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGVjb3JhdGl2ZSUyMGl0ZW1zfGVufDF8fHx8MTc1OTMyMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      colors: ["Earth Tones", "Natural", "Beige"],
      difficulty: "Medium",
      timeEstimate: "2-3 weeks",
      description: "Beautiful decorative pieces to enhance your living space."
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "flowers", label: "Flowers" },
    { value: "bags", label: "Bags" },
    { value: "accessories", label: "Accessories" },
    { value: "bandanas", label: "Bandanas" }
  ];

  const filteredDesigns = exampleDesigns.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
            <h1 className="text-2xl font-bold text-primary">Design Examples</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Inspired by Our Designs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of beautiful crochet designs. Found something you love? Click "Custom Order" to have it made just for you with your preferred colors and customizations.
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
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredDesigns.length} designs found
            </span>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDesigns.map((design) => (
              <Card 
                key={design.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={design.image}
                      alt={design.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-9 w-9 rounded-full shadow-sm"
                      onClick={() => toggleWishlist(design.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          wishlist.includes(design.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>

                    <div className="absolute top-3 left-3">
                      <Badge className={getDifficultyColor(design.difficulty)}>
                        {design.difficulty}
                      </Badge>
                    </div>
                    

                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {design.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {design.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Timeline:</span>
                        <span className="text-xs font-medium text-foreground">{design.timeEstimate}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Colors:</span>
                        <div className="flex space-x-1">
                          {design.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                              style={{
                                backgroundColor: 
                                  color.toLowerCase() === 'rainbow' ? '#ff6b6b' :
                                  color.toLowerCase() === 'multicolor' ? '#4ecdc4' :
                                  color.toLowerCase() === 'all colors' ? '#ffeaa7' :
                                  color.toLowerCase() === 'custom' ? '#ddd' :
                                  color.toLowerCase()
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                        onClick={() => handleCustomOrder(design)}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Custom Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No designs found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
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
            Have Your Own Design Idea?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't see exactly what you're looking for? We'd love to bring your unique vision to life! Share your ideas, sketches, or inspiration images with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('contact')}
            >
              Start Custom Design
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('home')}
            >
              Browse Our Shop
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}