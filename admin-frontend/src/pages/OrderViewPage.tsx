import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Edit, Printer, Package, User, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

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
  const { orders } = useApp();

  const order = orders.find(o => o.id === id);

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
    // Create a print-friendly version of the order
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      return;
    }

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
            <p><strong>Date:</strong> ${formatDate(order.date)}</p>
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus.toUpperCase()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>Rs.${(item.price / item.quantity).toLocaleString()}</td>
                  <td>Rs.${item.price.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total: Rs.${order.total.toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
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
            <h1>Order {order.orderNumber}</h1>
            <p className="text-muted-foreground mt-1">
              {formatDate(order.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrintOrder}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={() => navigate(`/orders/edit/${id}`, { state: { fromViewPage: true } })}>
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
                <Badge className={statusColors[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                <Badge className={paymentStatusColors[order.paymentStatus]}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Type</p>
                <Badge variant="outline">
                  {order.customerType === 'new' ? 'New Customer' : 'Repeat Customer'}
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
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4>{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Rs.{item.price.toLocaleString()}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Rs.{(item.price / item.quantity).toLocaleString()} each
                        </p>
                      )}
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
                <span>Free</span>
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
                <p>{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="text-sm break-all">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="text-sm">{order.phone}</p>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <p className="text-sm">{order.shippingAddress}</p>
          </Card>

          {/* Tracking Information (if shipped or has tracking) */}
          {(order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') && (order.courierName || order.trackingNumber) ? (
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
