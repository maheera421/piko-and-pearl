import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { ShoppingBag, Truck, AlertTriangle, Gift, User, Package } from 'lucide-react';
import { mockActivities } from '../../data/mockData';

const iconMap: Record<string, any> = {
  ShoppingBag,
  Truck,
  AlertTriangle,
  Gift,
  User,
  Package,
};

const iconColors: Record<string, { bg: string; text: string }> = {
  order: { bg: '#DBEAFE', text: '#2196F3' },
  product: { bg: '#FFEDD5', text: '#FF9800' },
  'custom-order': { bg: '#E6D9FF', text: '#9B7FD9' },
  customer: { bg: '#E6FFFA', text: '#4CAF50' },
};

export function ActivityFeed() {
  const navigate = useNavigate();

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = iconMap[activity.icon];
          const colors = iconColors[activity.type] || { bg: '#F3F4F6', text: '#6B7280' };

          return (
            <div key={activity.id} className="flex gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.bg }}
              >
                <Icon className="h-5 w-5" style={{ color: colors.text }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => navigate('/notifications')}
        className="w-full mt-6 text-sm text-primary hover:underline"
      >
        View all activity
      </button>
    </Card>
  );
}
