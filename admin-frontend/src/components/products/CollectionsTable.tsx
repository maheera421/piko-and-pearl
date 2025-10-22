import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';
import { EditCollectionDialog } from './EditCollectionDialog';

export function CollectionsTable() {
  const { collections, deleteCollection } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState<any>(null);

  const handleDelete = () => {
    if (collectionToDelete) {
      deleteCollection(collectionToDelete);
      toast.success('Collection deleted successfully');
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
    }
  };

  const handleEdit = (collection: any) => {
    setCollectionToEdit(collection);
    setEditDialogOpen(true);
  };

  if (collections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2>Collections</h2>
        <p className="text-muted-foreground mt-1">
          Manage your product collections
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Image</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Collection Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Products</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Created</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection, index) => (
                <tr
                  key={collection.id}
                  className={`border-b border-border hover:bg-[#F3F0FF] transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FDFBFF]'
                  }`}
                >
                  <td className="py-3 px-4">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{collection.name}</td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-primary/10 text-primary">
                      {collection.productIds.length} products
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {new Date(collection.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEdit(collection)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setCollectionToDelete(collection.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Collection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this collection? This action cannot be undone.
              The products in this collection will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Collection Dialog */}
      <EditCollectionDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        collection={collectionToEdit}
      />
    </div>
  );
}
