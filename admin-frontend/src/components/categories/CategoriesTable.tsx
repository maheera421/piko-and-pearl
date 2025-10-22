import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { GripVertical, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

interface SortableRowProps {
  category: any;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

function SortableRow({ category, index, onEdit, onDelete, onToggleActive }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-border hover:bg-muted/50 transition-colors ${
        index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
      }`}
    >
      <td className="py-3 px-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center text-2xl">
          {category.icon}
        </div>
      </td>
      <td className="py-3 px-4 font-medium">{category.name}</td>
      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
        {category.slug}
      </td>
      <td className="py-3 px-4">
        <Badge className="bg-primary/10 text-primary">
          {category.productCount} products
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm">{category.displayOrder}</td>
      <td className="py-3 px-4">
        <Switch
          checked={category.active}
          onCheckedChange={(checked) => onToggleActive(category.id, checked)}
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(category.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export function CategoriesTable() {
  const navigate = useNavigate();
  const { categories, reorderCategories, updateCategory, deleteCategory } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      const newOrder = arrayMove(categories, oldIndex, newIndex);
      reorderCategories(newOrder);
      toast.success('Category order updated');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      toast.success('Category deleted successfully');
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    updateCategory(id, { active });
    toast.success(`Category ${active ? 'activated' : 'deactivated'}`);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 w-12"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Icon</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Category Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Slug</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Product Count</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Display Order</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <SortableContext
                items={categories.map((cat) => cat.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {categories.map((category, index) => (
                    <SortableRow
                      key={category.id}
                      category={category}
                      index={index}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      onToggleActive={handleToggleActive}
                    />
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </div>
        </DndContext>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category.
              Products in this category will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
