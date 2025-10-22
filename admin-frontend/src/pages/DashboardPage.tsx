import React from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { TopProductsChart } from '../components/dashboard/TopProductsChart';
import { OrderStatusChart } from '../components/dashboard/OrderStatusChart';
import { RecentOrdersTable } from '../components/dashboard/RecentOrdersTable';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsChart />
        <OrderStatusChart />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
}
