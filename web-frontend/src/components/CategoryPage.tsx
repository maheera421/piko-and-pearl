import { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Header } from './Header';
import { Footer } from './Footer';

interface CategoryPageProps {
  onNavigate: (page: string) => void;
  category: any;
  products: any[];
  categories?: any[];
}

export function CategoryPage({ onNavigate, category, products, categories }: CategoryPageProps) {
  useEffect(() => {
    // set SEO meta tags
    if (category) {
      document.title = category.metaTitle || category.name;

      let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!desc) {
        desc = document.createElement('meta');
        desc.name = 'description';
        document.head.appendChild(desc);
      }
      desc.content = category.metaDescription || category.content || '';

      let kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!kw) {
        kw = document.createElement('meta');
        kw.name = 'keywords';
        document.head.appendChild(kw);
      }
      kw.content = Array.isArray(category.keywords) ? category.keywords.join(',') : (category.keywords || '');
    }
    return () => {
      // optionally cleanup meta tags
    };
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={onNavigate} categories={categories} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{category.name}</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">{category.content || category.description || ''}</p>
        </header>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p._id || p.id}>
                <ProductCard product={p} onNavigate={onNavigate} hideDescription={true} categories={categories} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} categories={categories} />
    </div>
  );
}

export default CategoryPage;
