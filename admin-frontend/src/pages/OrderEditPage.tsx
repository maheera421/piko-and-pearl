import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Order } from '../types/Order';

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const paymentStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Paid', label: 'Paid' },
];

export function OrderEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    status: 'Pending',
    paymentStatus: 'Pending',
    courierName: '',
    trackingNumber: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  const getBases = () => {
    const envRaw = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '');
    const env = envRaw ? (/\/api$/.test(envRaw) ? envRaw : `${envRaw}/api`) : '';
    const origin = `${window.location.origin}/api`;
    const list = [
      'http://localhost:5000/api',
      'http://127.0.0.1:5000/api',
      origin,
      env,
    ].filter(Boolean);
    const seen = new Set<string>();
    return list.filter(b => !seen.has(b) && (seen.add(b), true));
  };

  const fetchFromBases = async (path: string, init?: RequestInit) => {
    for (const base of getBases()) {
      try {
        const url = `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
        const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store', ...(init || {}) });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) continue;
        const json = await res.json();
        return json;
      } catch {}
    }
    return null;
  };

  const sendToBases = async (path: string, body: any) => {
    for (const base of getBases()) {
      try {
        const url = `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.ok) return true;
      } catch {}
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchFromBases(`orders/${id}?ts=${Date.now()}`);
        if (json) {
          const data = json.data ?? json.order ?? json;
          if (!data) return;
          data.items = Array.isArray(data.items)
            ? data.items.map((it: any) => ({
                ...it,
                subtotal: typeof it.subtotal === 'number' ? it.subtotal : (it.price || 0) * (it.quantity || 0),
              }))
            : [];
          setOrder(data);
          setFormData(prev => ({
            ...prev,
            status: data.orderStatus,
            paymentStatus: data.paymentStatus,
          }));
        }
      } catch {}
    })();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const ok = await sendToBases(`orders/${order!._id}`, {
        orderStatus: formData.status,
        paymentStatus: formData.paymentStatus,
      });
      if (ok) {
        toast.success('Order updated successfully!');
      } else {
        toast.error('Failed to update order');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setIsSaving(false);
      navigate('/orders');
    }
  };

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
              {formatDate(new Date(order.createdAt))}
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
                {/* Hidden input to provide name/id for autofill */}
                <input type="hidden" id="status" name="status" value={formData.status} />
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="mt-1.5" aria-label="Order Status">
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
                {/* Hidden input to provide name/id for autofill */}
                <input type="hidden" id="paymentStatus" name="paymentStatus" value={formData.paymentStatus} />
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentStatus: value }))}
                >
                  <SelectTrigger className="mt-1.5" aria-label="Payment Status">
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

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/orders/view/${order._id}`)}
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
                <p>{order.customerDetails.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{order.customerDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm">{order.customerDetails.phoneNumber}</p>
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
            <p className="text-sm">
              {order.customerDetails.address}, {order.customerDetails.city}
              {order.customerDetails.postalCode ? `, ${order.customerDetails.postalCode}` : ''}
              , {order.customerDetails.country}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
