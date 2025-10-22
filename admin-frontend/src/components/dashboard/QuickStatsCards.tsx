import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { AlertCircle, Package, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    label: 'Pending Orders',
    value: '25',
    icon: AlertCircle,
    color: '#FFC107',
    bgColor: '#FEF3C7',
    action: 'View All',
    link: '/orders',
  },
  {
    label: 'Low Stock Items',
    value: '8',
    icon: Package,
    color: '#FF9800',
    bgColor: '#FFEDD5',
    action: 'View Products',
    link: '/products',
  },
  {
    label: 'Custom Order Requests',
    value: '5',
    icon: Gift,
    color: '#9B7FD9',
    bgColor: '#E6D9FF',
    action: 'Review',
    link: '/custom-orders',
  },
];

export function QuickStatsCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-6 border-l-4"
          style={{ borderLeftColor: stat.color }}
        >
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: stat.bgColor }}
            >
              <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground truncate">{stat.label}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4"
            onClick={() => navigate(stat.link)}
          >
            {stat.action}
          </Button>
        </Card>
      ))}
    </div>
  );
}
