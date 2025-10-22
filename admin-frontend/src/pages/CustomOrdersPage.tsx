import React from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { mockCustomOrders } from '../data/mockData';

const statusColors = {
  'submitted': 'bg-[#DBEAFE] text-[#1E40AF]',
  'in-review': 'bg-[#FEF3C7] text-[#92400E]',
  'approved': 'bg-[#E6FFFA] text-[#047857]',
  'in-progress': 'bg-[#FFEDD5] text-[#9A3412]',
  'completed': 'bg-[#E6FFFA] text-[#047857]',
  'rejected': 'bg-[#FEE2E2] text-[#991B1B]',
};

const priorityColors = {
  'high': 'bg-[#FEE2E2] text-[#991B1B]',
  'medium': 'bg-[#FEF3C7] text-[#92400E]',
  'low': 'bg-[#DBEAFE] text-[#1E40AF]',
};

export function CustomOrdersPage() {
  // Calculate dynamic stats from mockCustomOrders
  const totalOrders = mockCustomOrders.length;
  const newOrders = mockCustomOrders.filter(o => o.status === 'submitted').length;
  const inProgressOrders = mockCustomOrders.filter(o => o.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Custom Orders Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage custom order requests
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-muted-foreground">{totalOrders} Total</span>
          <span className="text-[#2196F3]">• {newOrders} New</span>
          <span className="text-[#FF9800]">• {inProgressOrders} In Progress</span>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Custom Order #</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Submission Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Budget Range</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-border hover:bg-[#F3F0FF] transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FDFBFF]'
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{order.customOrderNumber}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {order.submissionDate.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[order.status]}>
                      {order.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    ₨{order.budgetMin.toLocaleString()} - ₨{order.budgetMax.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {order.deadline.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={priorityColors[order.priority]}>
                      {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4CAF50]">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
