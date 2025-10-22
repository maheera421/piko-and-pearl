import React from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockCustomers } from '../data/mockData';

export function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Customers Management</h1>
        <p className="text-muted-foreground mt-1">
          Total: {mockCustomers.length} Customers
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Total Orders</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Member Since</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{customer.email}</td>
                  <td className="py-3 px-4 text-sm">{customer.phone}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {customer.totalOrders}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    ₨{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {customer.memberSince.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        customer.totalOrders === 1
                          ? 'bg-[#DBEAFE] text-[#1E40AF]'
                          : 'bg-[#E6FFFA] text-[#047857]'
                      }
                    >
                      {customer.totalOrders === 1 ? 'New' : 'Returning'}
                    </Badge>
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
