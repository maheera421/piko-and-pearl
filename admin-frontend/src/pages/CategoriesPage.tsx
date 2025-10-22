import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CategoriesTable } from '../components/categories/CategoriesTable';

export function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Categories Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage product categories for your store
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/categories/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Category
        </Button>
      </div>

      <CategoriesTable />
    </div>
  );
}
