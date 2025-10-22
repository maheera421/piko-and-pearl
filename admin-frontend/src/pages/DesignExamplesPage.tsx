import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const mockDesigns = [
  { id: '1', title: 'Sunflower Bouquet Design', category: 'Flowers', image: 'https://images.unsplash.com/photo-1597049548956-93f1e72ef0e5?w=400', featured: true },
  { id: '2', title: 'Crochet Bag Pattern', category: 'Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', featured: false },
  { id: '3', title: 'Charm Collection', category: 'Bag Charms', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400', featured: true },
  { id: '4', title: 'Rose Designs', category: 'Flowers', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400', featured: false },
  { id: '5', title: 'Beach Bag Style', category: 'Bags', image: 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=400', featured: true },
  { id: '6', title: 'Accessory Ideas', category: 'Accessories', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', featured: false },
];

export function DesignExamplesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Design Examples Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Upload design examples for custom order inspiration
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Upload New Design
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDesigns.map((design) => (
          <Card key={design.id} className="overflow-hidden group cursor-pointer">
            <div className="relative aspect-square">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-medium mb-1">{design.title}</h4>
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    {design.category}
                  </Badge>
                </div>
              </div>
              {design.featured && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary text-white">Featured</Badge>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
