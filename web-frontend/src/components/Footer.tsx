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
  categories?: any[];
}

export function Footer({ onNavigate, categories }: FooterProps) {
  const footerLinks = {
    shop: [
      { name: "Flowers", page: "flowers" },
      { name: "Bags", page: "bags" },
      { name: "Bag Charms", page: "charms" },
      { name: "Bandanas", page: "bandanas" },
      { name: "Accessories", page: "accessories" }
    ],
    support: [
      { name: "Contact Us", page: "contact" },
      { name: "Care Instructions", page: "care-instructions" },
      { name: "FAQ", page: "faq" }
    ]
  };

  // helper: slugify text similar to admin
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const createCategorySlug = (categoryName: string) => createSlug(`handmade-crochet-${categoryName}`);

  // If categories are passed in props, prefer them for the Shop column
  // Build a simple list of { name, page } where page is the category slug
  const buildShopLinksFromCategories = (cats?: any[]) => {
    // When cats is null or undefined the app is still loading categories from the server.
    // Return an empty list (do not show the static fallback) to avoid a flash of old static content.
    if (cats == null) return [];
    if (!cats.length) return footerLinks.shop;
    return cats.map(c => ({
      name: c.name || c.title || 'Category',
      page: c.slug || createCategorySlug(c.name || c.title || '')
    }));
  };



  return (
  <footer className="border-t" style={{ backgroundColor: '#F3E8FF' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">
              <a href="/" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); onNavigate('home'); } }} className="hover:underline focus:outline-none">Piko &amp; Pearl</a>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Handcrafted crochet items made with love and care. Each piece tells a story 
              of passion, creativity, and dedication to quality craftsmanship.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/pikoandpearl?igsh=dmlzZzhtaHU5NGM0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm hover:scale-105 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-pink-600" />
              </a>
              <a
                href="https://www.facebook.com/share/16gXixBNPH/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm hover:scale-105 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
              </a>
              <a
                href="/contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); onNavigate('contact'); } }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm hover:scale-105 transition-transform"
                aria-label="Contact"
              >
                <Mail className="h-4 w-4 text-rose-600" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@pikoandpearl.com" className="hover:text-primary">info@pikoandpearl.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <a href="tel:+923001234567" className="hover:text-primary">+92 300 1234567</a>
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
              {buildShopLinksFromCategories(categories).map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.page}`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); onNavigate(link.page); } }}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={`/${link.page}`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { if (onNavigate) { e.preventDefault(); onNavigate(link.page); } }}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </a>
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