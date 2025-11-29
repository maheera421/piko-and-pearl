import React, { useEffect, useState, useMemo } from 'react';
import { OrdersTable } from '../components/orders/OrdersTable';
import { Order } from '../types/Order';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const envBaseRaw = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '');
      const envBase = envBaseRaw ? (/\/api$/.test(envBaseRaw) ? envBaseRaw : `${envBaseRaw}/api`) : '';
      const originBase = `${window.location.origin}/api`;
      const bases = [
        'http://localhost:5000/api',
        'http://127.0.0.1:5000/api',
        originBase,
        envBase,
      ].filter(Boolean);

      const seen = new Set<string>();
      const uniqueBases = bases.filter(b => {
        if (seen.has(b)) return false;
        seen.add(b);
        return true;
      });

      let found: any[] | null = null;
      for (const base of uniqueBases) {
        try {
          // First attempt /orders
          const url1 = `${base}/orders?ts=${Date.now()}`;
          console.log('[OrdersPage] Trying base:', base, 'endpoint:/orders');
          const r1 = await fetch(url1, { headers: { Accept: 'application/json' }, cache: 'no-store' });
          const ct1 = r1.headers.get('content-type') || '';
          if (r1.ok && ct1.includes('application/json')) {
            const json1 = await r1.json();
            const arr1 =
              Array.isArray(json1) ? json1 :
              Array.isArray(json1?.data) ? json1.data :
              Array.isArray(json1?.orders) ? json1.orders :
              Array.isArray(json1?.result) ? json1.result :
              Array.isArray(json1?.payload) ? json1.payload :
              Array.isArray(json1?.items) ? json1.items : [];
            if (arr1.length) {
              found = arr1;
              console.log('[OrdersPage] Success with /orders base:', base, 'count:', arr1.length);
              break;
            }
          }
          // Second attempt /orders/all if first failed or empty
          const url2 = `${base}/orders/all?ts=${Date.now()}`;
            console.log('[OrdersPage] Fallback trying /orders/all base:', base);
          const r2 = await fetch(url2, { headers: { Accept: 'application/json' }, cache: 'no-store' });
          const ct2 = r2.headers.get('content-type') || '';
          if (r2.ok && ct2.includes('application/json')) {
            const json2 = await r2.json();
            const arr2 =
              Array.isArray(json2) ? json2 :
              Array.isArray(json2?.data) ? json2.data :
              Array.isArray(json2?.orders) ? json2.orders :
              Array.isArray(json2?.result) ? json2.result :
              Array.isArray(json2?.payload) ? json2.payload :
              Array.isArray(json2?.items) ? json2.items : [];
            if (arr2.length) {
              found = arr2;
              console.log('[OrdersPage] Success with /orders/all base:', base, 'count:', arr2.length);
              break;
            }
          }
        } catch (e) {
          console.warn('[OrdersPage] Base failed:', base, e);
        }
      }

      if (!found) {
        setError('Failed to fetch orders from all bases');
        setOrders([]);
      } else {
        const normalized: Order[] = found.map((o: any) => {
          const items = Array.isArray(o.items)
            ? o.items.map((it: any) => ({
                ...it,
                subtotal:
                  typeof it.subtotal === 'number'
                    ? it.subtotal
                    : (it.price || 0) * (it.quantity || 0),
              }))
            : [];
          return {
            ...o,
            items,
            orderStatus: o.orderStatus || o.status,
            paymentStatus: o.paymentStatus,
          };
        });

        // NEW: build per-customer aggregates
        const stats: Record<
          string,
          { fullName: string; totalOrders: number; totalSpent: number; type: 'new' | 'returning' }
        > = {};
        for (const ord of normalized) {
          const email = ord.customerDetails?.email || '';
          const name = ord.customerDetails?.fullName || email || 'Unknown';
          if (!email) continue;
          if (!stats[email]) {
            stats[email] = { fullName: name, totalOrders: 0, totalSpent: 0, type: 'new' };
          }
          stats[email].totalOrders += 1;
          stats[email].totalSpent += Number(ord.total || 0);
          stats[email].type = stats[email].totalOrders > 1 ? 'returning' : 'new';
        }
        try {
          localStorage.setItem('customerStats', JSON.stringify(stats));
        } catch {}

        console.log('[OrdersPage] Final normalized count:', normalized.length);
        setOrders(normalized);
      }
      setLoading(false);
    })();
  }, []);

  const tableOrders = useMemo(
    () =>
      orders.map(o => ({
        id: o._id || (o as any).id,
        orderNumber: o.orderNumber,
        customerName: o.customerDetails?.fullName || (o as any).customerName || '',
        total: o.total,
        status: (o as any).status || o.orderStatus,
        paymentStatus: o.paymentStatus,
        paymentStatusLower:
          (o as any).paymentStatusLower || (o.paymentStatus || '').toLowerCase(),
        itemsCount:
          (o as any).itemsCount ||
          (Array.isArray(o.items) ? o.items.length : 0),
        createdAt: o.createdAt,
      })),
    [orders]
  );

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
  const processingOrders = orders.filter(o => o.orderStatus === 'Processing').length;
  const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders Management</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all customer orders
        </p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-muted-foreground">{totalOrders} Total</span>
          <span className="text-[#FFC107]">• {pendingOrders} Pending</span>
          <span className="text-[#FF9800]">• {processingOrders} Processing</span>
          <span className="text-[#4CAF50]">• {deliveredOrders} Delivered</span>
        </div>
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {/* Use OrdersTable styling with fetched MongoDB data */}
      <OrdersTable
        orders={orders}
        loading={loading}
      />
    </div>
  );
}
