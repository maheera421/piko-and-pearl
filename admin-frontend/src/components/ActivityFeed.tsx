import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, Package, AlertTriangle, ShoppingCart, TrendingUp, Clock } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      title: '5 orders pending shipping',
      description: 'Orders waiting for dispatch since morning',
      time: '2 minutes ago',
      type: 'warning',
      icon: Package,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Stock low for Rose Gold Bangles',
      description: 'Only 3 units left in inventory',
      time: '15 minutes ago',
      type: 'alert',
      icon: AlertTriangle,
      priority: 'medium',
    },
    {
      id: 3,
      title: 'New 10% Offer expiring in 2 days',
      description: 'SUMMER2025 code expires on Jan 17',
      time: '1 hour ago',
      type: 'info',
      icon: Clock,
      priority: 'low',
    },
    {
      id: 4,
      title: 'Ajay abandoned cart worth ₹15K',
      description: 'Diamond earrings left in cart for 3 hours',
      time: '3 hours ago',
      type: 'cart',
      icon: ShoppingCart,
      priority: 'medium',
    },
    {
      id: 5,
      title: 'Revenue milestone reached',
      description: 'Monthly target of ₹3L achieved early',
      time: '5 hours ago',
      type: 'success',
      icon: TrendingUp,
      priority: 'low',
    },
    {
      id: 6,
      title: 'New customer registration',
      description: 'Priya Singh joined premium membership',
      time: '1 day ago',
      type: 'info',
      icon: Bell,
      priority: 'low',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600';
      case 'alert': return 'text-red-600';
      case 'success': return 'text-green-600';
      case 'cart': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50';
      case 'alert': return 'bg-red-50';
      case 'success': return 'bg-green-50';
      case 'cart': return 'bg-orange-50';
      default: return 'bg-blue-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low': return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded flex items-center justify-center">
              <Bell className="w-3 h-3 text-white" />
            </div>
            Activity Feed
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className={`p-4 rounded-lg border transition-colors hover:shadow-sm ${getTypeBg(activity.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getTypeBg(activity.type)}`}>
                    <Icon className={`w-4 h-4 ${getTypeColor(activity.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {activity.title}
                      </h4>
                      {getPriorityBadge(activity.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      {activity.priority === 'high' && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-red-600">5</div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-yellow-600">12</div>
              <div className="text-xs text-muted-foreground">Medium Priority</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">28</div>
              <div className="text-xs text-muted-foreground">Resolved Today</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}