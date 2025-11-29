import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const fetchJson = async (url: string) => {
        const res = await fetch(url);
        const text = await res.text();
        const isHtml = typeof text === 'string' && text.trim().startsWith('<!DOCTYPE html');
        let json = null;
        try { json = !isHtml && text ? JSON.parse(text) : null; } catch { json = null; }
        return { res, text, json, isHtml };
      };

      const bases = ['', 'http://localhost:5000', 'http://127.0.0.1:5000'];
      let loaded = false;
      for (const base of bases) {
        try {
          const { res, json, text, isHtml } = await fetchJson(`${base}/api/customers/all`);
          if (isHtml || res.status === 404) {
            console.warn(`customers fetch from ${base || 'same-origin'} returned HTML/404, trying next`);
            continue;
          }
          if (!res.ok) {
            console.error('Failed to load customers', json ?? text);
            break;
          }
          if (json && json.success) {
            setCustomers(json.customers || []);
            loaded = true;
            break;
          } else {
            console.error('Failed to load customers', json ?? text);
            break;
          }
        } catch (err) {
          console.warn('customers fetch error for base', base, err);
          continue;
        }
      }

      if (!loaded) setCustomers([]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1>Customers Management</h1>
        <p className="text-muted-foreground mt-1">
          Total: {customers.length} Customers
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Total Orders</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Member Since</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-4 px-4 text-center">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="py-4 px-4 text-center">No customers found</td></tr>
              ) : (
                customers.map((customer, index) => (
                <tr
                  key={customer._id || index}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                        { (customer.fullName || '?').charAt(0).toUpperCase() }
                      </div>
                      <div className="font-medium">{customer.fullName}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{customer.email}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {customer.totalOrders ?? 0}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    ₨{(customer.totalSpent ?? 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {customer.memberSince ? new Date(customer.memberSince).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={customer.type === 'New' ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'bg-[#E6FFFA] text-[#047857]'}
                    >
                      {customer.type ?? (customer.totalOrders === 0 ? 'New' : 'Returning')}
                    </Badge>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
