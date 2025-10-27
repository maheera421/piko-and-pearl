import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, Search, Filter } from "lucide-react";
import ProductCard from "../ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SearchPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
  products?: any[] | undefined;
}

export function SearchPage({ onNavigate, initialQuery = "", products }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  const [sortBy, setSortBy] = useState("relevance");
  const [category, setCategory] = useState("all");
  

  // Prefer dynamic products passed from App; fall back to the legacy static list
  const legacyProducts: any[] = [];

  const allProducts = (products && products.length > 0)
    ? products.map(p => ({
        id: p._id ?? p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.previousPrice ?? p.originalPrice ?? null,
        image: p.image1 || p.image || (p.images && p.images[0]) || '',
        rating: p.rating ?? 0,
        reviews: p.reviews?.length ?? (p.reviews ?? 0),
        badge: p.badge ?? p.metaTitle ?? '',
        category: p.category || '',
        description: p.description || p.metaDescription || '',
      }))
    : legacyProducts;

  const filteredResults = allProducts.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Sale": return "destructive";
      case "New": return "secondary";
      case "Bestseller": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-primary">Search Products</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="py-8 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="text"
                placeholder="Search products here..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            {/* Popular Searches */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["flowers", "tote bag", "sunflower", "lavender", "daisy"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="flowers">Flowers</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="bag charms">Bag Charms</SelectItem>
                  <SelectItem value="bandanas">Bandanas</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {filteredResults.length} results
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Search results for "{searchQuery}"
              </h2>
            </div>
          )}

          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => onNavigate('keychains')}>Browse Keychains</Button>
                <Button variant="outline" onClick={() => onNavigate('bags')}>Browse Bags</Button>
                <Button variant="outline" onClick={() => onNavigate('charms')}>Browse Charms</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredResults.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} hideDescription={true} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}