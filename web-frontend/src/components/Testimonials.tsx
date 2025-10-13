import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "California, USA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b047?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The quality is absolutely amazing! I ordered a custom bag and it exceeded all my expectations. The attention to detail is incredible and it's so beautifully made.",
      product: "Custom Boho Bag"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      location: "Texas, USA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I've bought several keychains for my friends and family. They're all obsessed! Perfect size, adorable designs, and shipped so quickly. Will definitely order again!",
      product: "Keychain Collection"
    },
    {
      id: 3,
      name: "Jessica Chen",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "My dog looks absolutely adorable in his new bandana! The material is so soft and the craftsmanship is top-notch. Piko & Pearl has a customer for life!",
      product: "Pet Bandana"
    },
    {
      id: 4,
      name: "Amanda Wilson",
      location: "Florida, USA",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The bag charms are perfect! They add such a cute touch to my purse and I get compliments everywhere I go. The colors are exactly as pictured and so vibrant.",
      product: "Bag Charms Set"
    },
    {
      id: 5,
      name: "Maria Garcia",
      location: "Arizona, USA",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding customer service and beautiful products! I had a special request and they were so accommodating. The final product was exactly what I dreamed of.",
      product: "Custom Hair Accessories"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      location: "Oregon, USA",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I'm completely in love with my purchase! The packaging was beautiful too - you can tell they really care about every detail of the customer experience.",
      product: "Accessory Bundle"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the amazing people who have made Piko & Pearl part of their daily lives
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow group"
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
                
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                    <div className="text-xs text-primary font-medium mt-1">
                      Purchased: {testimonial.product}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Items Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Join Our Happy Customer Family!
              </h3>
              <p className="text-muted-foreground mb-6">
                Be part of our growing community of crochet lovers. Share your photos and stories with #PikoAndPearl
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Follow on Instagram
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Leave a Review
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}