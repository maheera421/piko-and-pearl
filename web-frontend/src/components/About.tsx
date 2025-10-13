import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Award, Truck, Shield, Star, Clock } from "lucide-react";

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Story Behind
                <span className="text-primary block">Piko & Pearl</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Welcome to Piko & Pearl, where every stitch tells a story of passion, 
                  creativity, and love for the beautiful art of crochet. Founded by a nani-nawasi 
                  duo who shared a dream of bringing handmade beauty into everyday life.
                </p>
                <p>
                  What started as a hobby in our cozy living room has blossomed into a collection 
                  of unique, handcrafted pieces that bring joy and personality to your daily routine. 
                  From delicate crochet flowers that never wilt to practical bags that accompany your adventures.
                </p>
                <p>
                  Each piece in our collection is thoughtfully designed and lovingly crafted using 
                  the finest materials. We believe in slow fashion, quality over quantity, and 
                  creating items that will be treasured for years to come.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => onNavigate?.('eternal-blooms')}
              >
                Shop Our Story
              </Button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1735414526681-ef9339138f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNyYWZ0aW5nJTIwY3JvY2hldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDI2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Crafting crochet items"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-3xl font-bold text-primary mb-1">2+</div>
              <div className="text-sm text-muted-foreground">Years Crafting</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
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