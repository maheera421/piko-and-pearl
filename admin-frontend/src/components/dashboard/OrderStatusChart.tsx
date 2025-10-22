import React, { useMemo } from 'react';
import { Card } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../../contexts/AppContext';

const statusConfig = [
  { name: 'pending', label: 'Pending', color: '#FFC107', bgColor: '#FEF3C7' },
  { name: 'approved', label: 'Approved', color: '#2196F3', bgColor: '#DBEAFE' },
  { name: 'processing', label: 'Processing', color: '#FF9800', bgColor: '#FFEDD5' },
  { name: 'shipped', label: 'Shipped', color: '#D7BEE8', bgColor: '#F3E8FF' },
  { name: 'delivered', label: 'Delivered', color: '#4CAF50', bgColor: '#D1FAE5' },
];

export function OrderStatusChart() {
  const { orders } = useApp();

  const data = useMemo(() => {
    return statusConfig.map(status => ({
      name: status.label,
      value: orders.filter(order => order.status === status.name).length,
      color: status.color,
      bgColor: status.bgColor,
    }));
  }, [orders]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
        {/* Pie Chart */}
        <div className="flex-shrink-0 mx-auto lg:mx-0" style={{ width: '240px', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Cards */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          {data.map((item) => (
            <Card 
              key={item.name} 
              className="p-4 border-l-4 hover:shadow-sm transition-shadow"
              style={{ borderLeftColor: item.color }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <div
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((item.value / total) * 100)}% of total
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">orders</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
