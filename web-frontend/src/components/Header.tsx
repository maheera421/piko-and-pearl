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
  categories?: any[];
  products?: any[] | undefined;
  allProducts?: any[] | undefined;
}

export function Header({ onNavigate, categories, products, allProducts }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const { getTotalItems } = useCart();

  const defaultNav = [
    { name: "Home", page: "home" },
  ];

  // build navigation from categories if provided
  // Avoid rendering the old hardcoded list while categories are still loading (undefined).
  // Show only 'Home' during loading to prevent flash of static categories.
  const navigation = (categories == null)
    ? [{ name: 'Home', page: 'home' }]
    : (categories.length > 0
        ? [{ name: 'Home', page: 'home' }, ...categories.map(c => ({ name: c.name, page: c.slug || c.name.toLowerCase() }))]
        : [{ name: 'Home', page: 'home' }]
      );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      setSuggestionsVisible(false);
      onNavigate?.('search', query);
    }
  };

  const createSlug = (text: string) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const createCategorySlug = (categoryName: string) => createSlug(`handmade-crochet-${categoryName}`);

  const handleSuggestionClick = (product: any) => {
    // build slug path: category-slug/product-slug
    const categorySlug = createCategorySlug((product.category || '').toString().replace(/^handmade-crochet-/, ''));
    const productSlug = createSlug(product.name || product.title || '')
      || (product.slug || '').toString();
    setSuggestionsVisible(false);
    onNavigate?.(`${categorySlug}/${productSlug}`);
  };

  // derive suggestions using the global product list when available, otherwise fall
  // back to the provided products prop (which may be page-scoped).
  const suggestions = (allProducts || products || [])
    .filter((p: any) => {
      if (!searchQuery) return false;
      const q = searchQuery.toLowerCase();
      const name = (p.name || '').toString().toLowerCase();
      const cat = (p.category || '').toString().toLowerCase();
      return name.includes(q) || cat.includes(q) || (p.sku || '').toString().toLowerCase().includes(q);
    })
    .slice(0, 6);

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
            <nav className="hidden xl:flex items-center space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate?.(item.page)}
                  className="text-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar - expands to fill remaining space so it shifts right when categories occupy left */}
          <div className="flex-1 mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products here..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSuggestionsVisible(true); }}
                onFocus={() => setSuggestionsVisible(true)}
                onBlur={() => setTimeout(() => setSuggestionsVisible(false), 150)}
                className="pl-10 w-full bg-input-background border-border"
              />

              {/* Suggestions dropdown */}
              {suggestionsVisible && suggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50">
                  <ul className="divide-y">
                    {suggestions.map((p: any) => (
                      <li key={p._id || p.id}>
                        <button
                          className="w-full text-left flex items-center gap-3 p-3 hover:bg-muted/50"
                          onMouseDown={(e) => e.preventDefault()} /* keep focus for click */
                          onClick={() => handleSuggestionClick(p)}
                        >
                          <img src={p.image1 || p.image || (p.images && p.images[0])} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                          <div className="flex-1">
                            <div className="font-medium text-foreground truncate">{p.name}</div>
                            <div className="text-sm text-muted-foreground">Rs {p.price}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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