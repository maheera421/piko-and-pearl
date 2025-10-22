import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const statusColors = {
  pending: 'bg-[#FEF3C7] text-[#92400E]',
  approved: 'bg-[#DBEAFE] text-[#1E40AF]',
  processing: 'bg-[#FFEDD5] text-[#9A3412]',
  shipped: 'bg-[#E6D9FF] text-[#6B46C1]',
  delivered: 'bg-[#E6FFFA] text-[#047857]',
  cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
};

export function RecentOrdersTable() {
  const navigate = useNavigate();
  const { orders } = useApp();

  // Get the 5 most recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3>Recent Orders</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/orders')}
        >
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {recentOrders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No orders yet</p>
          <p className="text-sm mt-1">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Order #</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/orders/view/${order.id}`)}
                >
                  <td className="py-3">
                    <span className="font-medium text-sm">{order.orderNumber}</span>
                  </td>
                  <td className="py-3">
                    <div>
                      <div className="font-medium text-sm">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-3">
                    <Badge className={statusColors[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-semibold">
                    Rs.{order.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
