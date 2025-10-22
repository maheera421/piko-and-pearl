import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ShoppingBag, 
  Clock, 
  Package, 
  XCircle, 
  Truck, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart 
} from 'lucide-react';

export function KPICards() {
  const kpis = [
    {
      title: 'Total Orders',
      value: '34',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Orders',
      value: '8',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      badge: { label: 'Pending', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
    },
    {
      title: 'Delivered Orders',
      value: '4',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      badge: { label: 'Complete', variant: 'secondary' as const, color: 'bg-green-100 text-green-800' },
    },
    {
      title: 'Returned/Rejected',
      value: '8',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      badge: { label: 'Action Required', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
    },
    {
      title: 'Shipped Orders',
      value: '8',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      badge: { label: 'In Transit', variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800' },
    },
    {
      title: 'Total Revenue',
      value: '₹3,02,600',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: { value: '+12.5%', positive: true },
    },
    {
      title: 'Conversion Rate',
      value: '4.6%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: { value: '+0.8%', positive: true },
    },
    {
      title: 'Abandoned Carts',
      value: '21',
      icon: ShoppingCart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      badge: { label: 'Recovery Needed', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      pulse: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-foreground">{kpi.value}</span>
                    {kpi.trend && (
                      <span className={`text-sm flex items-center ${
                        kpi.trend.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className={`w-3 h-3 mr-1 ${
                          kpi.trend.positive ? '' : 'rotate-180'
                        }`} />
                        {kpi.trend.value}
                      </span>
                    )}
                  </div>
                  {kpi.badge && (
                    <Badge 
                      variant={kpi.badge.variant}
                      className={`${kpi.badge.color} ${kpi.pulse ? 'animate-pulse' : ''}`}
                    >
                      {kpi.badge.label}
                    </Badge>
                  )}
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}