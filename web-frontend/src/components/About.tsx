import { Card, CardContent } from "./ui/card";
import { Heart, Award, Truck, Star } from "lucide-react";

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const features = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every piece is handcrafted with care and attention to detail"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping across Pakistan"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Using only the finest yarns and materials for lasting beauty"
    },
    {
      icon: Star,
      title: "Unique Designs",
      description: "Original patterns and exclusive collections you won't find elsewhere"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50/50 to-background dark:from-black dark:to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-card hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}