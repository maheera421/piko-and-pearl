import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Edit, Printer, Package, User, Phone, Mail, MapPin } from 'lucide-react';
import { Order } from '../types/Order';

const statusColors = {
  pending: 'bg-[#FEF3C7] text-[#92400E]',
  approved: 'bg-[#DBEAFE] text-[#1E40AF]',
  processing: 'bg-[#FFEDD5] text-[#9A3412]',
  shipped: 'bg-[#E6D9FF] text-[#6B46C1]',
  delivered: 'bg-[#E6FFFA] text-[#047857]',
  cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
};

const paymentStatusColors = {
  paid: 'bg-[#E6FFFA] text-[#047857]',
  pending: 'bg-[#FEF3C7] text-[#92400E]',
  failed: 'bg-[#FEE2E2] text-[#991B1B]',
};

export function OrderViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  // Build ordered bases (localhost first, then origin, then VITE_API_BASE)
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
    // dedupe
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
      } catch {
        // try next base
      }
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        const json = await fetchFromBases(`orders/${id}?ts=${Date.now()}`);
        if (json) {
          const data = json.data ?? json.order ?? json;
          if (data && Array.isArray(data.items)) {
            data.items = data.items.map((it: any) => ({
              ...it,
              subtotal: typeof it.subtotal === 'number' ? it.subtotal : (it.price || 0) * (it.quantity || 0),
            }));
          }
          setOrder(data || null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="space-y-6"><div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => navigate('/orders')}><ArrowLeft className="h-5 w-5" /></Button><h1>Loading...</h1></div></div>;
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handlePrintOrder = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Order ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #9B7FD9; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #E6D9FF; }
            .header { margin-bottom: 20px; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Piko & Pearl</h1>
            <h2>Order ${order.orderNumber}</h2>
            <p><strong>Date:</strong> ${formatDate(new Date(order.createdAt))}</p>
            <p><strong>Customer:</strong> ${order.customerDetails.fullName}</p>
            <p><strong>Email:</strong> ${order.customerDetails.email}</p>
            <p><strong>Phone:</strong> ${order.customerDetails.phoneNumber}</p>
            <p><strong>Shipping Address:</strong> ${order.customerDetails.address}, ${order.customerDetails.city}, ${order.customerDetails.country}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          </div>
          <table>
            <thead>
              <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>Rs.${item.price.toLocaleString()}</td>
                  <td>Rs.${(item.subtotal).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total"><p>Total: Rs.${order.total.toLocaleString()}</p></div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const statusKey = order.orderStatus.toLowerCase() as keyof typeof statusColors;
  const payKey = order.paymentStatus.toLowerCase() as keyof typeof paymentStatusColors;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1>Order {order.orderNumber}</h1>
            <p className="text-muted-foreground mt-1">
              {formatDate(new Date(order.createdAt))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrintOrder}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={() => navigate(`/orders/edit/${order._id}`, { state: { fromViewPage: true } })}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card className="p-6">
            <h3 className="mb-4">Order Status</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Status</p>
                <Badge className={statusColors[statusKey]}>
                  {order.orderStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                <Badge className={paymentStatusColors[payKey]}>
                  {order.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <Badge variant="outline">
                  {order.customerDetails.fullName}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <h3 className="mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    {/* image optional */}
                    <div className="flex-1">
                      <h4>{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="text-xs text-muted-foreground">Category: {item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Rs.{item.subtotal.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Rs.{item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                  {index < order.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Order Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs.{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Rs.200</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg text-primary">
                  Rs.{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Customer & Shipping */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p>{order.customerDetails.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="text-sm break-all">{order.customerDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="text-sm">{order.customerDetails.phoneNumber}</p>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <p className="text-sm">
              {order.customerDetails.address}, {order.customerDetails.city}
              {order.customerDetails.postalCode ? `, ${order.customerDetails.postalCode}` : ''}
              , {order.customerDetails.country}
            </p>
          </Card>

          {/* Tracking Information - optional if you later add fields */}
          {(order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered') && (order.courierName || order.trackingNumber) ? (
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Tracking Information
              </h3>
              <div className="space-y-3">
                {order.courierName && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Courier</p>
                    <p>{order.courierName}</p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                    <p className="text-sm font-mono">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
