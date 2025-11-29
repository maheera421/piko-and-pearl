import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, Edit, Printer, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const statusColors = {
  pending: 'bg-[#FEF3C7] text-[#92400E]',
  approved: 'bg-[#DBEAFE] text-[#1E40AF]',
  processing: 'bg-[#FFEDD5] text-[#9A3412]',
  shipped: 'bg-[#E6D9FF] text-[#6B46C1]',
  delivered: 'bg-[#E6FFFA] text-[#047857]',
  cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
};

// Accept orders via props; loading optional
export function OrdersTable({ orders, loading }: { orders: any[]; loading?: boolean }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  // Normalize incoming orders to the shape this table expects
  const rows = useMemo(() => {
    return (orders || []).map((o) => {
      const customerDetails = o.customerDetails || {};
      return {
        id: o._id || o.id,
        orderNumber: o.orderNumber,
        customerName: o.customerName || customerDetails.fullName || '',
        email: o.email || customerDetails.email || '',
        phone: o.phone || customerDetails.phoneNumber || '',
        date: o.date || o.createdAt,
        status: (o.status || o.orderStatus || 'pending').toString().toLowerCase(),
        paymentStatus:
          (o.paymentStatusLower ||
            (o.paymentStatus || '').toString().toLowerCase()) || 'pending',
        total: Number(o.total || 0),
        items: Array.isArray(o.items)
          ? o.items.map((it: any) => ({
              productName: it.productName,
              quantity: it.quantity,
              price: Number(
                typeof it.subtotal === 'number'
                  ? it.subtotal
                  : (it.price || 0) * (it.quantity || 0)
              ),
            }))
          : [],
        shippingAddress:
          o.shippingAddress ||
          [
            customerDetails.address,
            customerDetails.city,
            customerDetails.postalCode,
            customerDetails.country,
          ]
            .filter(Boolean)
            .join(', '),
      };
    });
  }, [orders]);

  const handlePrintOrder = (order: any) => {
    // Create a print-friendly version of the order
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      toast.error('Please allow popups to print');
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
                  <td>Rs.${(Number(item.price) / (item.quantity || 1)).toLocaleString()}</td>
                  <td>Rs.${Number(item.price).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total: Rs.${Number(order.total).toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // Filter using normalized rows
  const filteredOrders = rows.filter(order => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      (order.orderNumber || '').toLowerCase().includes(q) ||
      (order.customerName || '').toLowerCase().includes(q) ||
      (order.email || '').toLowerCase().includes(q) ||
      (order.phone || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order #, customer name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Order Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Payment</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!filteredOrders || filteredOrders.length === 0) ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    {loading ? 'Loading orders...' : 'No orders found matching your criteria'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b border-border hover:bg-muted/50 transition-colors ${
                      index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium">{order.orderNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{order.email}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[order.status] || statusColors.pending}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          order.paymentStatus === 'paid'
                            ? 'bg-[#E6FFFA] text-[#047857]'
                            : order.paymentStatus === 'pending'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#FEE2E2] text-[#991B1B]'
                        }
                      >
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      Rs.{Number(order.total).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => navigate(`/orders/view/${order.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => navigate(`/orders/edit/${order.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handlePrintOrder(order)}
                          title="Print Order"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
