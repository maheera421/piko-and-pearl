import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Heart
} from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    shop: [
      { name: "Flowers", page: "flowers" },
      { name: "Bags", page: "bags" },
      { name: "Bag Charms", page: "charms" },
      { name: "Bandanas", page: "bandanas" },
      { name: "Accessories", page: "accessories" },
      { name: "Custom Orders", page: "contact" }
    ],
    support: [
      { name: "Contact Us", page: "contact" },
      { name: "Care Instructions", page: "care-instructions" },
      { name: "FAQ", page: "faq" }
    ]
  };



  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Piko & Pearl
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Handcrafted crochet items made with love and care. Each piece tells a story 
              of passion, creativity, and dedication to quality craftsmanship.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => window.open('https://www.instagram.com/pikoandpearl?igsh=dmlzZzhtaHU5NGM0', '_blank')}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => window.open('https://www.facebook.com/share/16gXixBNPH/', '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => onNavigate?.('contact')}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>info@pikoandpearl.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>Handmade with love in Pakistan</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => onNavigate?.(link.page)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => onNavigate?.(link.page)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Stay Connected</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to get updates on new collections and exclusive offers!
            </p>
            
            <div className="flex space-x-2 mb-6">
              <Input 
                placeholder="Your email address"
                className="flex-1"
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-8">
          {/* Features - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <span>Free Shipping Rs 3k+</span>
            <span>Handmade Quality</span>
          </div>

          <Separator className="my-6" />

          {/* Copyright */}
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>© 2025 Piko & Pearl. All rights reserved.</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}