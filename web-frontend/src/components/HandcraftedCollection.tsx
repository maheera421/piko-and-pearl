import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HandcraftedCollectionProps {
  onNavigate?: (page: string) => void;
}

export function HandcraftedCollection({ onNavigate }: HandcraftedCollectionProps) {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Collection Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1684090514340-9eef61f3f83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VyJTIwY29sbGVjdGlvbiUyMGRpc3BsYXklMjBwdXJwbGV8ZW58MXx8fHwxNzU5MjY4NTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Eternal Blooms Collection"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Collection Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                New Collection
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Handcrafted with
                <span className="text-primary block">Love & Care</span>
              </h1>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Introducing our <strong>Eternal Blooms Collection</strong> - where timeless beauty 
                  meets crochet artistry. Each flower is meticulously crafted using premium yarn 
                  and traditional techniques.
                </p>
                <p>
                  Unlike fresh flowers that fade, these handcrafted beauties will grace your home 
                  with lasting elegance. Perfect for décor, special occasions, or thoughtful gifts.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => onNavigate?.('eternal-blooms')}
              >
                Explore Collection
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg"
                onClick={() => onNavigate?.('contact')}
              >
                Custom Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}