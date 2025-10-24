import { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCategories } from "./components/ProductCategories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { About } from "./components/About";
import { Toaster } from "./components/ui/sonner";

import { Footer } from "./components/Footer";
import { FlowersPage } from "./components/pages/FlowersPage";
import { BagsPage } from "./components/pages/BagsPage";
import { BagCharmsPage } from "./components/pages/BagCharmsPage";
import { BandanasPage } from "./components/pages/BandanasPage";
import { AccessoriesPage } from "./components/pages/AccessoriesPage";
import { CartPage } from "./components/pages/CartPage";
import { ContactPage } from "./components/pages/ContactPage";
import { SearchPage } from "./components/pages/SearchPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import { WishlistPage } from "./components/pages/WishlistPage";
import { EternalBloomsPage } from "./components/pages/EternalBloomsPage";
import { FeaturedProductsPage } from "./components/pages/FeaturedProductsPage";
import { NewCollectionPage } from "./components/pages/NewCollectionPage";
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
    window.scrollTo(0, 0);
  };

  // Product data for all categories
  const getAllProducts = () => {
    const flowers = [
      {
        id: 1,
        name: "Lavender Rose Bouquet",
        price: 2499,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        reviews: 32,
        description: "Beautiful handcrafted lavender roses that last forever"
      },
      {
        id: 2,
        name: "Sunflower Centerpiece",
        price: 2199,
        originalPrice: 2799,
        image: "https://images.unsplash.com/photo-1753366556699-4be495e5bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3VuZmxvd2VyJTIweYllbG93JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 28,
        description: "Bright sunflower arrangement perfect for any occasion"
      },
      {
        id: 3,
        name: "Daisy Chain Garland",
        price: 1899,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1749301560225-3032826b9e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGFpc3klMjB3aGl0ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzU5MjY4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.7,
        reviews: 19,
        description: "Delicate daisy garland for home decoration"
      },
      {
        id: 4,
        name: "Peony Bloom Set",
        price: 2999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1508808703020-ef18109db02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwcGVvbnklMjBwaW5rJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTkyNjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5.0,
        reviews: 15,
        description: "Luxurious peony blooms in soft pastel colors"
      },
      {
        id: 5,
        name: "Wildflower Bouquet",
        price: 2399,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1575175090204-0a470102fc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwd2lsZGZsb3dlciUyMGJvdXF1ZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTkyNjgwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 24,
        description: "Mixed wildflower arrangement with natural charm"
      },
      {
        id: 6,
        name: "Cherry Blossom Branch",
        price: 2699,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1602750665669-6c7cc05144cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hlcnJ5JTIwYmxvc3NvbSUyMHBpbmt8ZW58MXx8fHwxNzU5MjY4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        reviews: 21,
        description: "Delicate cherry blossom branch for spring decor"
      },
      {
        id: 7,
        name: "Mini Rose Trio",
        price: 1599,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.6,
        reviews: 35,
        description: "Set of three small roses perfect for any space"
      },
      {
        id: 8,
        name: "Tulip Garden Set",
        price: 2799,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1749301560225-3032826b9e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZGFpc3klMjB3aGl0ZSUyMGZsb3dlcnN8ZW58MXx8fHwxNzU5MjY4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 27,
        description: "Beautiful tulip collection for spring lovers"
      }
    ];

    const bags = [
      {
        id: 1,
        name: "Boho Tote Bag",
        price: 2899,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 18,
        description: "Spacious handwoven tote perfect for everyday use"
      },
      {
        id: 2,
        name: "Mini Crossbody Bag",
        price: 2299,
        originalPrice: 2699,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 24,
        description: "Compact crossbody for hands-free convenience"
      },
      {
        id: 3,
        name: "Market Basket Bag",
        price: 3000,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 15,
        description: "Eco-friendly market bag with sturdy handles"
      },
      {
        id: 4,
        name: "Evening Clutch",
        price: 1999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.6,
        reviews: 12,
        description: "Sophisticated clutch for special occasions"
      },
      {
        id: 5,
        name: "Bucket Bag",
        price: 2599,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 21,
        description: "Trendy bucket style with drawstring closure"
      },
      {
        id: 6,
        name: "Laptop Tote",
        price: 3000,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1693887705535-5fd7c2ddb023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGUlMjBwdXJwbGV8ZW58MXx8fHwxNzU5MTY0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 9,
        description: "Work-ready tote with laptop compartment"
      }
    ];

    const charms = [
      {
        id: 1,
        name: "Butterfly Charm",
        price: 899,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 22,
        description: "Delicate butterfly design with pearl accents"
      },
      {
        id: 2,
        name: "Tassel Charm",
        price: 699,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 18,
        description: "Elegant tassel charm in various colors"
      },
      {
        id: 3,
        name: "Mini Flower Charm",
        price: 799,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 25,
        description: "Cute mini flower perfect for any bag"
      },
      {
        id: 4,
        name: "Geometric Charm",
        price: 999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.6,
        reviews: 14,
        description: "Contemporary geometric design"
      },
      {
        id: 5,
        name: "Pom Pom Charm",
        price: 599,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 31,
        description: "Fluffy pom pom in vibrant colors"
      },
      {
        id: 6,
        name: "Heart Charm",
        price: 849,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1588987617819-c04a0d4b0233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY2hhcm0lMjBzbWFsbCUyMGl0ZW1zfGVufDF8fHx8MTc1OTE2NDE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 19,
        description: "Sweet heart design with decorative stitching"
      }
    ];

    const bandanas = [
      {
        id: 1,
        name: "Classic Crochet Bandana",
        price: 1299,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 34,
        description: "Comfortable bandana perfect for daily wear"
      },
      {
        id: 2,
        name: "Boho Flower Bandana",
        price: 1499,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 28,
        description: "Beautiful floral pattern with soft texture"
      },
      {
        id: 3,
        name: "Holiday Special Bandana",
        price: 1199,
        originalPrice: 1399,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 22,
        description: "Festive design for special occasions"
      },
      {
        id: 4,
        name: "Reversible Bandana",
        price: 1799,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 16,
        description: "Two patterns in one reversible design"
      },
      {
        id: 5,
        name: "Summer Vibes Bandana",
        price: 1399,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.6,
        reviews: 31,
        description: "Light and breezy for warm weather"
      },
      {
        id: 6,
        name: "Personalized Bandana",
        price: 1999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1552959933-595ad8829c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFuZGFuYSUyMGhhbmRtYWRlfGVufDF8fHx8MTc1OTE2NDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 5.0,
        reviews: 12,
        description: "Add custom text or patterns for a personal touch"
      }
    ];

    const accessories = [
      {
        id: 1,
        name: "Hair Scrunchie Set",
        price: 1299,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 45,
        description: "Set of 3 soft crochet scrunchies"
      },
      {
        id: 2,
        name: "Crochet Headband",
        price: 1599,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 32,
        description: "Cozy winter headband with flower detail"
      },
      {
        id: 3,
        name: "Phone Case Cover",
        price: 1799,
        originalPrice: 2199,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 28,
        description: "Protective crochet phone case with strap"
      },
      {
        id: 4,
        name: "Bookmark Set",
        price: 999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.6,
        reviews: 19,
        description: "Adorable bookmarks with tassels"
      },
      {
        id: 5,
        name: "Coin Purse",
        price: 1399,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.9,
        reviews: 37,
        description: "Small purse perfect for coins and cards"
      },
      {
        id: 6,
        name: "Cup Cozy Set",
        price: 1599,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.8,
        reviews: 24,
        description: "Keep your drinks warm with style"
      },
      {
        id: 7,
        name: "Jewelry Pouch",
        price: 1999,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 5.0,
        reviews: 15,
        description: "Delicate pouch for storing jewelry"
      },
      {
        id: 8,
        name: "Plant Pot Cover",
        price: 1799,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1753370474751-c15e55efb1a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkxNjQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 21,
        description: "Stylish cover for your plant pots"
      }
    ];

    return { flowers, bags, charms, bandanas, accessories };
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
      <Header onNavigate={navigate} />
      <Hero onNavigate={navigate} />
      <main>
        <ProductCategories onNavigate={navigate} />
        <FeaturedProducts onNavigate={navigate} />
        <About onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );

  // Render different pages based on current page
  const renderPage = () => {
    // Handle product detail pages with slug-based routing
    if (currentPage.startsWith('product-')) {
      const parts = currentPage.split('-');
      if (parts.length >= 3) {
        const category = parts[1];
        const idOrSlug = parts.slice(2).join('-'); // Join remaining parts for slug
        
        // Try to get product by ID first (backward compatibility)
        let productData = getProductById(category, idOrSlug);
        
        // If not found by ID, try to find by slug
        if (!productData) {
          const products = getAllProducts();
          const categoryProducts = (products as any)[category];
          if (categoryProducts) {
            const product = findProductBySlug(category, idOrSlug, categoryProducts);
            if (product) {
              productData = {
                product,
                category: category.charAt(0).toUpperCase() + category.slice(1),
                allProducts: categoryProducts
              };
            }
          }
        }
        
        return <ProductDetailPage onNavigate={navigate} productData={productData} previousPage={previousPage} />;
      }
    }

    switch (currentPage) {
      case 'flowers':
      case 'category/handmade-crochet-flowers':
        return <FlowersPage onNavigate={navigate} />;
      case 'bags':
      case 'category/handmade-crochet-bags':
        return <BagsPage onNavigate={navigate} />;
      case 'charms':
        return <BagCharmsPage onNavigate={navigate} />;
      case 'bandanas':
      case 'category/handmade-crochet-bandanas':
        return <BandanasPage onNavigate={navigate} />;
      case 'accessories':
      case 'category/handmade-crochet-accessories':
        return <AccessoriesPage onNavigate={navigate} />;
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
        return <WishlistPage onNavigate={navigate} />;
      case 'eternal-blooms':
        return <EternalBloomsPage onNavigate={navigate} />;
      case 'featured':
        return <FeaturedProductsPage onNavigate={navigate} />;
      case 'new-collection':
        return <NewCollectionPage onNavigate={navigate} />;
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