import { useState, useEffect } from "react";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCategories } from "./components/ProductCategories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { CategoryPage } from "./components/CategoryPage";
import { ProductCard } from "./components/ProductCard";
import { About } from "./components/About";
import { Toaster } from "./components/ui/sonner";

import { Footer } from "./components/Footer";
// legacy static category pages removed - dynamic CategoryPage is used instead
import { CartPage } from "./components/pages/CartPage";
import { ContactPage } from "./components/pages/ContactPage";
import { SearchPage } from "./components/pages/SearchPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import { WishlistPage } from "./components/pages/WishlistPage";
// import { EternalBloomsPage } from "./components/pages/EternalBloomsPage";
import { FeaturedProductsPage } from "./components/pages/FeaturedProductsPage";
// import { NewCollectionPage } from "./components/pages/NewCollectionPage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { CareInstructionsPage } from "./components/pages/CareInstructionsPage";
import { FAQPage } from "./components/pages/FAQPage";

// Helper function to create URL-friendly slugs (matches admin logic)
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Helper function to create category slugs
const createCategorySlug = (categoryName: string): string => {
  return createSlug(`handmade-crochet-${categoryName}`);
};

// Helper function to find product by slug
const findProductBySlug = (category: string, slug: string, products: any[]) => {
  return products.find(p => createSlug(p.name) === slug);
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [navigationData, setNavigationData] = useState<any>(null);

  const navigate = (page: string, query?: string, data?: any) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    if (query !== undefined) {
      setSearchQuery(query);
    }
    if (data !== undefined) {
      setNavigationData(data);
    } else {
      setNavigationData(null);
    }
    // Update browser URL to reflect slug-style navigation
    try {
      const newPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', newPath);
    } catch (e) {
      // ignore (some environments may restrict pushState)
    }
    window.scrollTo(0, 0);
  };

  // API base: normalize VITE_API_BASE so it always includes '/api' at the end
  const rawApiBase = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5000/api';
  const API_BASE = rawApiBase.endsWith('/api') || rawApiBase.endsWith('/api/')
    ? rawApiBase.replace(/\/$/, '')
    : rawApiBase.replace(/\/$/, '') + '/api';

  // dynamic data from backend
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize currentPage from the URL path when the app first mounts
    const initialPath = window.location.pathname.replace(/^\//, '');
    if (initialPath && initialPath !== '/') {
      setCurrentPage(initialPath);
    }

    // Listen for browser navigation (back/forward) and sync currentPage
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      setCurrentPage(path || 'home');
    };
    window.addEventListener('popstate', onPopState);

    // fetch categories and products
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('fetchCategories error', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('fetchProducts error', err);
      }
    };

    fetchCategories();
    fetchProducts();

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Manage document title based on current route and fetched data
  useEffect(() => {
    const setDefault = () => {
      document.title = 'Piko and Pearl';
      const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (desc) desc.content = '';
      const kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (kw) kw.content = '';
    };

    // Home or unknown pages -> default title
    if (!currentPage || currentPage === 'home' || currentPage === '/') {
      setDefault();
      return;
    }

    // Product detail page (categorySlug/productSlug)
    if (currentPage.includes('/')) {
      const [categorySlug, productSlug] = currentPage.split('/');
      const match = products.find((p: any) => {
        const pSlug = createSlug(p.name || '');
        const pCategorySlug = createCategorySlug((p.category || '').toString().replace(/^handmade-crochet-/, ''));
        return pSlug === productSlug || (pCategorySlug === categorySlug && pSlug === productSlug);
      });
      if (match) {
        document.title = match.metaTitle || match.name || 'Piko and Pearl';
        const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (desc) desc.content = match.metaDescription || match.description || '';
        const kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
        if (kw) kw.content = Array.isArray(match.keywords) ? match.keywords.join(',') : (match.keywords || '');
        return;
      }
    }

    // Category page
    const matchedCategory = categories.find(c => c.slug === currentPage || createCategorySlug(c.name) === currentPage);
    if (matchedCategory) {
      document.title = matchedCategory.metaTitle || matchedCategory.name || 'Piko and Pearl';
      const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (desc) desc.content = matchedCategory.metaDescription || matchedCategory.content || '';
      const kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (kw) kw.content = Array.isArray(matchedCategory.keywords) ? matchedCategory.keywords.join(',') : (matchedCategory.keywords || '');
      return;
    }

    // Fallback to default
    setDefault();
  }, [currentPage, categories, products]);

  // Helper: get products grouped by category name (from fetched products)
  const getAllProducts = () => {
    const grouped: any = {};
    products.forEach((p: any) => {
      const key = (p.category || 'uncategorized').toString().toLowerCase();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
    });
    return grouped;
  };

  const getProductById = (category: string, id: string) => {
    const products = getAllProducts();
    const categoryProducts = (products as any)[category];
    if (!categoryProducts) return null;
    
    const product = categoryProducts.find((p: any) => p.id.toString() === id);
    return product ? { product, category: category.charAt(0).toUpperCase() + category.slice(1), allProducts: categoryProducts } : null;
  };

  // Home page content
  const HomePage = () => (
    <div className="min-h-screen bg-background">
      <Header onNavigate={navigate} categories={categories} />
      <Hero onNavigate={navigate} />
  <main>
    <ProductCategories onNavigate={navigate} categories={categories} />
  <FeaturedProducts onNavigate={navigate} products={products.filter((p: any) => p.featured)} categories={categories} />
        <About onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} categories={categories} />
    </div>
  );

  // Render different pages based on current page
  const renderPage = () => {
  // Handle product detail pages with slug-style routing: 'category-slug/product-slug'
      if (currentPage.includes('/')) {
        const [categorySlug, productSlug] = currentPage.split('/');

        // Try to find a product where the slug of the name matches productSlug
        // and its category slug (generated from product.category) matches categorySlug.
        const match = products.find((p: any) => {
          const pSlug = createSlug(p.name || '');
          const pCategorySlug = createCategorySlug((p.category || '').toString().replace(/^handmade-crochet-/, ''));
          return pSlug === productSlug || (pCategorySlug === categorySlug && pSlug === productSlug);
        });

        if (match) {
          const allProductsForCategory = products.filter((p: any) => createCategorySlug((p.category || '').toString().replace(/^handmade-crochet-/, '')) === categorySlug);
          // Use product's category name (from product document) for display
          const productCategoryName = match.category || (categories.find((c: any) => createCategorySlug(c.name) === categorySlug)?.name) || categorySlug;
          const productData = { product: match, category: productCategoryName, allProducts: allProductsForCategory };
          return <ProductDetailPage onNavigate={navigate} productData={productData} previousPage={previousPage} categories={categories} />;
        }
      }

      // If currentPage matches a category slug, render the CategoryPage dynamically
      const matchedCategory = categories.find(c => c.slug === currentPage || createCategorySlug(c.name) === currentPage);
      if (matchedCategory) {
        const catProducts = products.filter((p: any) => {
          const pCatSlug = createCategorySlug((p.category || '').toString().replace(/^handmade-crochet-/, ''));
          return pCatSlug === currentPage || (p.category && p.category.toString().toLowerCase() === (matchedCategory.name || '').toString().toLowerCase());
        });
        return <CategoryPage onNavigate={navigate} category={matchedCategory} products={catProducts} categories={categories} />;
      }

    switch (currentPage) {
      // legacy static category pages removed - dynamic CategoryPage will handle category slugs
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} referenceData={navigationData} />;
      case 'search':
        return <SearchPage onNavigate={navigate} initialQuery={searchQuery} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={navigate} products={products} categories={categories} />;
      case 'featured':
        return <FeaturedProductsPage onNavigate={navigate} products={products.filter((p: any) => p.featured)} categories={categories} />;
      // legacy pages removed/not implemented: 'eternal-blooms' and 'new-collection'
      // they will fallthrough to the default HomePage
      case 'care-instructions':
        return <CareInstructionsPage onNavigate={navigate} />;
      case 'faq':
        return <FAQPage onNavigate={navigate} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {renderPage()}
          <Toaster />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}