import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface ProductCategoriesProps {
  onNavigate?: (page: string) => void;
}

export function ProductCategories({ onNavigate }: ProductCategoriesProps) {
  const categories = [
    {
      name: "Flowers",
      description: "Beautiful blooms that last forever",
      image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU5MzE5NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      page: "flowers",
      items: "50+ designs"
    },
    {
      name: "Bags",
      description: "Stylish and practical handmade bags",
      image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      page: "bags",
      items: "25+ styles"
    },
    {
      name: "Bag Charms",
      description: "Perfect accents for your favorite bags",
      image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      page: "charms",
      items: "30+ charms"
    },
    {
      name: "Bandanas",
      description: "Cozy and comfortable crochet bandanas",
      image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      page: "bandanas",
      items: "15+ patterns"
    },
    {
      name: "Accessories",
      description: "Unique pieces to complete your look",
      image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      page: "accessories",
      items: "20+ pieces"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handcrafted collections, each piece made with love
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.name} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium opacity-90">{category.items}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {category.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="group/btn p-0 h-auto text-primary hover:text-primary-foreground hover:bg-primary"
                    onClick={() => onNavigate?.(category.page)}
                  >
                    Shop {category.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Featured Category */}
        <div className="mt-16">
          <Card className="overflow-hidden bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Custom Orders
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Have something special in mind? We create personalized crochet items just for you. 
                    Choose your colors, patterns, and sizes to make it uniquely yours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 sm:flex-none"
                      onClick={() => onNavigate?.('contact')}
                    >
                      Start Custom Order
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 sm:flex-none"
                      onClick={() => onNavigate?.('examples')}
                    >
                      View Examples
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto min-h-[300px]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1638108799434-8484dabdc776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGFuZG1hZGUlMjBpdGVtcyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NTkxNjQxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Custom crochet work"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}