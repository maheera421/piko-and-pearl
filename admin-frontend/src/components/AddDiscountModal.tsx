import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Percent } from 'lucide-react';

interface AddDiscountModalProps {
  onClose: () => void;
}

export function AddDiscountModal({ onClose }: AddDiscountModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    type: '',
    value: '',
    minCartValue: '',
    maxDiscount: '',
    usagePerUser: '1',
    categories: [] as string[],
    validFrom: undefined as Date | undefined,
    validTo: undefined as Date | undefined,
  });

  const categories = ['Gold', 'Silver', 'Diamond', 'Platinum', 'Gemstones'];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== category)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Discount created:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center">
              <Percent className="w-3 h-3 text-white" />
            </div>
            Add New Discount
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discount Code */}
            <div className="space-y-2">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                placeholder="e.g., SUMMER2025"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                required
              />
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Discount Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Off (%)</SelectItem>
                  <SelectItem value="flat">Flat Amount Off (₹)</SelectItem>
                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discount Value */}
            <div className="space-y-2">
              <Label htmlFor="value">
                {formData.type === 'percentage' ? 'Percentage (%)' : 
                 formData.type === 'flat' ? 'Amount (₹)' : 'Value'}
              </Label>
              <Input
                id="value"
                type="number"
                placeholder={formData.type === 'percentage' ? '20' : '5000'}
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                required={formData.type !== 'bogo'}
                disabled={formData.type === 'bogo'}
              />
            </div>

            {/* Usage Per User */}
            <div className="space-y-2">
              <Label htmlFor="usagePerUser">Usage Per User</Label>
              <Input
                id="usagePerUser"
                type="number"
                value={formData.usagePerUser}
                onChange={(e) => setFormData(prev => ({ ...prev, usagePerUser: e.target.value }))}
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Min Cart Value */}
            <div className="space-y-2">
              <Label htmlFor="minCartValue">Minimum Cart Value (₹)</Label>
              <Input
                id="minCartValue"
                type="number"
                placeholder="10000"
                value={formData.minCartValue}
                onChange={(e) => setFormData(prev => ({ ...prev, minCartValue: e.target.value }))}
              />
            </div>

            {/* Max Discount */}
            <div className="space-y-2">
              <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
              <Input
                id="maxDiscount"
                type="number"
                placeholder="5000"
                value={formData.maxDiscount}
                onChange={(e) => setFormData(prev => ({ ...prev, maxDiscount: e.target.value }))}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label>Applicable Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">{category}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valid From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.validFrom ? format(formData.validFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.validFrom}
                    onSelect={(date) => setFormData(prev => ({ ...prev, validFrom: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Valid To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.validTo ? format(formData.validTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.validTo}
                    onSelect={(date) => setFormData(prev => ({ ...prev, validTo: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Discount
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}