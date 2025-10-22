import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const paymentStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' },
];

export function OrderEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useApp();

  // Check if we came from the view page by checking location state
  const locationState = window.history.state?.usr as { fromViewPage?: boolean } | undefined;
  const fromViewPage = locationState?.fromViewPage || false;

  const order = orders.find(o => o.id === id);

  const [formData, setFormData] = useState({
    status: order?.status || 'pending',
    paymentStatus: order?.paymentStatus || 'pending',
    courierName: order?.courierName || '',
    trackingNumber: order?.trackingNumber || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1>Order Not Found</h1>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    // Validation for processing status
    if (formData.status === 'processing' || formData.status === 'shipped' || formData.status === 'delivered') {
      if (!formData.courierName || !formData.trackingNumber) {
        toast.error('Courier name and tracking number are required for processing, shipped, or delivered status');
        return;
      }
    }

    setIsSaving(true);

    // Simulate saving delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update the order in context
    updateOrder(id!, {
      status: formData.status as any,
      paymentStatus: formData.paymentStatus as any,
      courierName: formData.courierName,
      trackingNumber: formData.trackingNumber,
    });

    toast.success('Order updated successfully!');
    
    setIsSaving(false);
    navigate('/orders');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1>Edit Order {order.orderNumber}</h1>
            <p className="text-muted-foreground mt-1">
              {formatDate(order.date)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Status Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Order Status</h3>
            <div className="space-y-6">
              {/* Order Status */}
              <div>
                <Label htmlFor="status">
                  Order Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Status */}
              <div>
                <Label htmlFor="paymentStatus">
                  Payment Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentStatus: value }))}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Courier and Tracking Info (shown when status is processing, shipped, or delivered) */}
              {(formData.status === 'processing' || formData.status === 'shipped' || formData.status === 'delivered') && (
                <>
                  <div className="pt-4 border-t border-border">
                    <h4 className="mb-4">Shipping Information</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="courierName">
                          Courier Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="courierName"
                          placeholder="e.g., TCS, Leopards, M&P"
                          value={formData.courierName}
                          onChange={(e) => setFormData(prev => ({ ...prev, courierName: e.target.value }))}
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="trackingNumber">
                          Tracking Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="trackingNumber"
                          placeholder="Enter tracking number"
                          value={formData.trackingNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                          className="mt-1.5"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Customer will receive this tracking number
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/orders/view/${id}`)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p>{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-semibold text-primary">Rs.{order.total.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="text-sm">{order.items.length} product(s)</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Shipping Address</h3>
            <p className="text-sm">{order.shippingAddress}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
