import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Eye, Edit, X, Search, Filter } from 'lucide-react';

interface OrderManagementProps {
  onViewOrder: (order: any) => void;
}

export function OrderManagement({ onViewOrder }: OrderManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15 10:30',
      customer: 'Priya Sharma',
      items: '3 items',
      value: '₹45,000',
      payment: 'Card',
      status: 'pending',
      statusLabel: 'Pending',
    },
    {
      id: 'ORD-002',
      date: '2024-01-15 09:15',
      customer: 'Ajay Kumar',
      items: '1 item',
      value: '₹25,500',
      payment: 'UPI',
      status: 'delivered',
      statusLabel: 'Delivered',
    },
    {
      id: 'ORD-003',
      date: '2024-01-14 16:45',
      customer: 'Sneha Patel',
      items: '2 items',
      value: '₹32,200',
      payment: 'Net Banking',
      status: 'shipped',
      statusLabel: 'Shipped',
    },
    {
      id: 'ORD-004',
      date: '2024-01-14 14:20',
      customer: 'Raj Mehta',
      items: '4 items',
      value: '₹78,900',
      payment: 'Card',
      status: 'returned',
      statusLabel: 'Returned',
    },
    {
      id: 'ORD-005',
      date: '2024-01-13 11:30',
      customer: 'Kavya Singh',
      items: '1 item',
      value: '₹15,600',
      payment: 'UPI',
      status: 'pending',
      statusLabel: 'Pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.payment.toLowerCase() === paymentFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          Order Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Methods</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="net banking">Net Banking</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Orders Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Order Value</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.items}</TableCell>
                  <TableCell className="font-medium">{order.value}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.payment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.statusLabel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewOrder(order)}
                        className="gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                        <X className="w-3 h-3" />
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}