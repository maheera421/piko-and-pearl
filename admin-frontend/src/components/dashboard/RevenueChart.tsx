import React, { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const dailyData = [
  { name: 'Mon', revenue: 3500, previous: 3200 },
  { name: 'Tue', revenue: 4200, previous: 3800 },
  { name: 'Wed', revenue: 3800, previous: 3500 },
  { name: 'Thu', revenue: 5100, previous: 4700 },
  { name: 'Fri', revenue: 6200, previous: 5800 },
  { name: 'Sat', revenue: 7500, previous: 6900 },
  { name: 'Sun', revenue: 5800, previous: 5200 },
];

const weeklyData = [
  { name: 'Week 1', revenue: 28000, previous: 24000 },
  { name: 'Week 2', revenue: 32000, previous: 28000 },
  { name: 'Week 3', revenue: 35000, previous: 30000 },
  { name: 'Week 4', revenue: 38000, previous: 34000 },
];

const monthlyData = [
  { name: 'Jan', revenue: 25000, previous: 22000 },
  { name: 'Feb', revenue: 28000, previous: 24000 },
  { name: 'Mar', revenue: 35000, previous: 30000 },
  { name: 'Apr', revenue: 42000, previous: 35000 },
  { name: 'May', revenue: 38000, previous: 36000 },
  { name: 'Jun', revenue: 45000, previous: 40000 },
  { name: 'Jul', revenue: 48000, previous: 42000 },
  { name: 'Aug', revenue: 52000, previous: 45000 },
  { name: 'Sep', revenue: 55000, previous: 48000 },
  { name: 'Oct', revenue: 60000, previous: 52000 },
  { name: 'Nov', revenue: 58000, previous: 54000 },
];

const yearlyData = [
  { name: '2019', revenue: 320000, previous: 280000 },
  { name: '2020', revenue: 380000, previous: 320000 },
  { name: '2021', revenue: 450000, previous: 380000 },
  { name: '2022', revenue: 520000, previous: 450000 },
  { name: '2023', revenue: 580000, previous: 520000 },
  { name: '2024', revenue: 650000, previous: 580000 },
];

export function RevenueChart() {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [showPrevious, setShowPrevious] = useState(true);

  const chartData = useMemo(() => {
    switch (timeFrame) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  }, [timeFrame]);

  const total = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.revenue, 0);
  }, [chartData]);

  const previousTotal = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.previous, 0);
  }, [chartData]);

  const growth = useMemo(() => {
    if (previousTotal === 0) return 0;
    return ((total - previousTotal) / previousTotal * 100).toFixed(1);
  }, [total, previousTotal]);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-foreground">
              ₨{total.toLocaleString()}
            </span>
            <span className={`text-sm flex items-center gap-1 ${
              parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(growth) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(growth))}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="show-previous"
              checked={showPrevious}
              onCheckedChange={setShowPrevious}
            />
            <Label htmlFor="show-previous" className="text-sm cursor-pointer">
              Compare Previous
            </Label>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            {['daily', 'weekly', 'monthly', 'yearly'].map((frame) => (
              <button
                key={frame}
                onClick={() => setTimeFrame(frame)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  timeFrame === frame
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9B7FD9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9B7FD9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            stroke="#718096"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#718096"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₨${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`₨${value.toLocaleString()}`, '']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#9B7FD9"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            name="Revenue"
          />
          {showPrevious && (
            <Area
              type="monotone"
              dataKey="previous"
              stroke="#CBD5E1"
              strokeWidth={2}
              fill="url(#colorPrevious)"
              strokeDasharray="5 5"
              name="Previous Period"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
