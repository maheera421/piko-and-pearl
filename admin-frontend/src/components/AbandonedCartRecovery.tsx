import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, RefreshCw, Mail, MessageCircle, Phone } from 'lucide-react';

export function AbandonedCartRecovery() {
  const abandonedCarts = [
    {
      cartId: 'CART-001',
      customer: 'Neha Agarwal',
      phone: '+91 98765 43210',
      items: 'Diamond Earrings, Gold Chain',
      value: '₹67,500',
      lastActivity: '2 hours ago',
      status: 'pending',
    },
    {
      cartId: 'CART-002',
      customer: 'Rohit Sharma',
      phone: '+91 87654 32109',
      items: 'Silver Bracelet',
      value: '₹12,300',
      lastActivity: '5 hours ago',
      status: 'pending',
    },
    {
      cartId: 'CART-003',
      customer: 'Anita Desai',
      phone: '+91 76543 21098',
      items: 'Gold Ring, Pendant',
      value: '₹45,200',
      lastActivity: '1 day ago',
      status: 'recovered',
    },
    {
      cartId: 'CART-004',
      customer: 'Vikram Singh',
      phone: '+91 65432 10987',
      items: 'Diamond Necklace',
      value: '₹89,900',
      lastActivity: '3 hours ago',
      status: 'pending',
    },
  ];

  const recoveryData = [
    { day: 'Mon', recovered: 15000, abandoned: 25000 },
    { day: 'Tue', recovered: 22000, abandoned: 30000 },
    { day: 'Wed', recovered: 18000, abandoned: 28000 },
    { day: 'Thu', recovered: 25000, abandoned: 35000 },
    { day: 'Fri', recovered: 32000, abandoned: 40000 },
    { day: 'Sat', recovered: 28000, abandoned: 38000 },
    { day: 'Sun', recovered: 20000, abandoned: 32000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'recovered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendReminder = (cartId: string, method: string) => {
    // Mock function - would integrate with actual messaging services
    console.log(`Sending ${method} reminder for ${cartId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
            <ShoppingCart className="w-3 h-3 text-white" />
          </div>
          Abandoned Cart Recovery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cart Watchlist Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cart ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {abandonedCarts.map((cart, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{cart.cartId}</TableCell>
                  <TableCell>{cart.customer}</TableCell>
                  <TableCell className="text-sm">{cart.phone}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-48 truncate">
                    {cart.items}
                  </TableCell>
                  <TableCell className="font-medium">{cart.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{cart.lastActivity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(cart.status)}>
                      {cart.status === 'pending' ? 'Pending' : 'Recovered'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => sendReminder(cart.cartId, 'auto')}
                        disabled={cart.status === 'recovered'}
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-green-600"
                        onClick={() => sendReminder(cart.cartId, 'whatsapp')}
                        disabled={cart.status === 'recovered'}
                      >
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-blue-600"
                        onClick={() => sendReminder(cart.cartId, 'email')}
                        disabled={cart.status === 'recovered'}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-purple-600"
                        onClick={() => sendReminder(cart.cartId, 'call')}
                        disabled={cart.status === 'recovered'}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Recovery Chart */}
        <div>
          <h4 className="mb-4">Cart Recovery Performance</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="recovered" fill="#10b981" name="Recovered" />
                <Bar dataKey="abandoned" fill="#f59e0b" name="Abandoned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-4 h-4" />
            Bulk WhatsApp Campaign
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Sequence
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Auto Recovery
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}