import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-black dark:via-black dark:to-black">
        <div className="absolute inset-0 bg-white/30 dark:bg-black/0"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to
                <span className="text-primary block">Piko & Pearl</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Discover unique crochet creations. From cozy keychains to stylish bags, each piece is lovingly handmade just for you in Pakistan.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => onNavigate?.('keychains')}
              >
                Shop Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => onNavigate?.('contact')}
              >
                Custom Orders
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Handmade Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Custom Designs</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1638108799434-8484dabdc776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGFuZG1hZGUlMjBpdGVtcyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NTkxNjQxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Handmade crochet items"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-muted/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm font-medium text-foreground">New Collection ✨</span>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg">
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-200 dark:bg-primary/30 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200 dark:bg-primary/20 rounded-full opacity-40 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}