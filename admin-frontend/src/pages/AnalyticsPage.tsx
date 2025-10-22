import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useApp } from '../contexts/AppContext';

const categoryColors = ['#9B7FD9', '#4CAF50', '#FF9800', '#2196F3', '#E91E63', '#FFC107', '#00BCD4', '#FF5722'];

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('this-month');
  const { categories, paymentMethods } = useApp();

  // Generate sales data based on categories
  const salesData = useMemo(() => {
    return categories.map((cat, index) => ({
      category: cat.name,
      revenue: Math.floor(Math.random() * 500000) + 250000, // Random revenue for demo
      fill: categoryColors[index % categoryColors.length],
    }));
  }, [categories]);

  // Generate payment data based on enabled payment methods
  const paymentData = useMemo(() => {
    const enabledMethods = [
      { name: 'COD', enabled: paymentMethods.cod, value: 60, color: '#9B7FD9' },
      { name: 'Card', enabled: paymentMethods.card, value: 30, color: '#4CAF50' },
      { name: 'MasterCard', enabled: paymentMethods.mastercard, value: 15, color: '#FF9800' },
      { name: 'JazzCash', enabled: paymentMethods.jazzcash, value: 10, color: '#2196F3' },
      { name: 'EasyPaisa', enabled: paymentMethods.easypaisa, value: 8, color: '#E91E63' },
    ].filter(method => method.enabled);

    // Normalize values to 100%
    const total = enabledMethods.reduce((sum, method) => sum + method.value, 0);
    return enabledMethods.map(method => ({
      ...method,
      value: Math.round((method.value / total) * 100),
    }));
  }, [paymentMethods]);

  // Filter data based on date range
  const getFilteredMetrics = () => {
    const baseRevenue = 2456000;
    const baseOrders = 567;
    
    switch(dateRange) {
      case 'today':
        return {
          revenue: Math.floor(baseRevenue / 30),
          orders: Math.floor(baseOrders / 30),
        };
      case 'this-week':
        return {
          revenue: Math.floor(baseRevenue / 4),
          orders: Math.floor(baseOrders / 4),
        };
      case 'this-year':
        return {
          revenue: baseRevenue * 12,
          orders: baseOrders * 12,
        };
      default: // this-month
        return {
          revenue: baseRevenue,
          orders: baseOrders,
        };
    }
  };

  const metrics = getFilteredMetrics();
  const avgOrderValue = Math.floor(metrics.revenue / metrics.orders);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your store performance
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="products">Product Analytics</TabsTrigger>
          <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-muted/30 border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <h3 className="text-2xl font-semibold">₨{metrics.revenue.toLocaleString()}</h3>
            </Card>
            <Card className="p-6 bg-muted/30 border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <h3 className="text-2xl font-semibold">{metrics.orders}</h3>
            </Card>
            <Card className="p-6 bg-muted/30 border-border">
              <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
              <h3 className="text-2xl font-semibold">₨{avgOrderValue.toLocaleString()}</h3>
            </Card>
            <Card className="p-6 bg-muted/30 border-border">
              <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
              <h3 className="text-2xl font-semibold">2.3%</h3>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="category" stroke="#718096" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#718096" style={{ fontSize: '12px' }} 
                    tickFormatter={(value) => `₨${value / 1000}k`} />
                  <Tooltip formatter={(value: number) => `₨${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Sales by Payment Method</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-6">
            <h3 className="mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {mockProducts.slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg text-muted-foreground">#{index + 1}</span>
                    <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">45 sold</p>
                    <p className="text-sm text-muted-foreground">₨{(product.price * 45).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="p-6 bg-primary/10 border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
              <h3 className="text-2xl font-semibold">856</h3>
            </Card>
            <Card className="p-6 bg-success/10 border-success/20">
              <p className="text-sm text-muted-foreground mb-1">New (this month)</p>
              <h3 className="text-2xl font-semibold text-success dark:text-success">143</h3>
            </Card>
            <Card className="p-6 bg-info/10 border-info/20">
              <p className="text-sm text-muted-foreground mb-1">Repeat Customers</p>
              <h3 className="text-2xl font-semibold">234</h3>
            </Card>
            <Card className="p-6 bg-warning/10 border-warning/20">
              <p className="text-sm text-muted-foreground mb-1">Avg Lifetime Value</p>
              <h3 className="text-2xl font-semibold">₨8,540</h3>
            </Card>
            <Card className="p-6 bg-secondary/10 border-secondary/20">
              <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
              <h3 className="text-2xl font-semibold">45%</h3>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import mock data at the top
import { mockProducts } from '../data/mockData';
