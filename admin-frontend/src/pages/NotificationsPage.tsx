import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingBag, Package, AlertTriangle, Gift, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useApp } from '../contexts/AppContext';

export function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1>Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No {filter === 'unread' ? 'unread' : ''} notifications</p>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-accent/30' : ''
                  } hover:bg-accent/50`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${notification.color}15` }}
                    >
                      {notification.type === 'order' && notification.read && (
                        <CheckCircle className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                      {notification.type === 'order' && !notification.read && (
                        <ShoppingBag className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                      {notification.type === 'product' && notification.title.includes('Out of Stock') && (
                        <Package className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                      {notification.type === 'product' && notification.title.includes('Low Stock') && (
                        <AlertTriangle className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                      {notification.type === 'custom-order' && (
                        <Gift className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                      {notification.type === 'customer' && (
                        <User className="h-5 w-5" style={{ color: notification.color }} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <Badge className="bg-primary/10 text-primary h-5 px-2">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
