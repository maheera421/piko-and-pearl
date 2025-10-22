import React from 'react';
import { Card } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sunflower Bouquet', sales: 45 },
  { name: 'Tote Bag Purple', sales: 38 },
  { name: 'Beach Bag', sales: 32 },
  { name: 'Rose Bundle', sales: 28 },
  { name: 'Hair Scrunchie Set', sales: 25 },
];

export function TopProductsChart() {
  return (
    <Card className="p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
          <XAxis type="number" stroke="#718096" style={{ fontSize: '12px' }} />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            stroke="#718096"
            style={{ fontSize: '11px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`${value} units`, 'Sales']}
          />
          <Bar dataKey="sales" fill="#9B7FD9" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
