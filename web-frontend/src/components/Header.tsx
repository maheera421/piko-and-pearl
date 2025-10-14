import { useState } from "react";
import { ShoppingBag, Menu, X, Search, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { VisuallyHidden } from "./ui/visually-hidden";
import { Badge } from "./ui/badge";
import { useCart } from "./CartContext";
import logo from "figma:asset/b36bbc8fe399bdb0a7973841c9c95ba843e68528.png";

interface HeaderProps {
  onNavigate?: (page: string, query?: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWishlist, setShowWishlist] = useState(false);
  const { getTotalItems } = useCart();

  const navigation = [
    { name: "Home", page: "home" },
    { name: "Flowers", page: "flowers" },
    { name: "Bags", page: "bags" },
    { name: "Bag Charms", page: "charms" },
    { name: "Bandanas", page: "bandanas" },
    { name: "Accessories", page: "accessories" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      onNavigate?.('search', query);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-4">
          {/* Left Side - Mobile Menu and Desktop Navigation */}
          <div className="flex items-center space-x-4 shrink-0">
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Navigate to different sections of the website</SheetDescription>
                </VisuallyHidden>
                <div className="flex flex-col space-y-4 mt-6 pl-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        onNavigate?.(item.page);
                        setIsOpen(false);
                      }}
                      className="text-lg text-foreground hover:text-primary transition-colors py-2 text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate?.(item.page)}
                  className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar - Expanded */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search flowers, bags, charms, bandanas, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-input-background border-border"
              />
            </form>
          </div>

          {/* Right Side - Icons and Logo */}
          <div className="flex items-center space-x-4 shrink-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex relative"
              onClick={() => onNavigate?.('wishlist')}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => onNavigate?.('profile')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => onNavigate?.('cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {getTotalItems()}
              </Badge>
            </Button>
            
            {/* Logo - Right Aligned */}
            <img 
              src={logo}
              alt="Piko and Pearl - handmade crochet shop"
              className="h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onNavigate?.('home')}
            />
          </div>
        </div>
      </div>
    </header>
  );
}