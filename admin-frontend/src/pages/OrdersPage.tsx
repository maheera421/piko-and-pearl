import React from 'react';
import { OrdersTable } from '../components/orders/OrdersTable';
import { useApp } from '../contexts/AppContext';

export function OrdersPage() {
  const { orders } = useApp();
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders Management</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all customer orders
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-muted-foreground">{totalOrders} Total</span>
          <span className="text-[#FFC107]">• {pendingOrders} Pending</span>
          <span className="text-[#FF9800]">• {processingOrders} Processing</span>
          <span className="text-[#4CAF50]">• {deliveredOrders} Delivered</span>
        </div>
      </div>

      <OrdersTable />
    </div>
  );
}
