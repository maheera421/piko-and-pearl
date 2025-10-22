import React from 'react';
import { Wallet, ShoppingBag, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../ui/card';

const kpis = [
  {
    title: 'Total Revenue',
    value: '₨ 450,000',
    subtitle: 'This Month',
    trend: { value: '+12.5%', isPositive: true },
    comparison: 'vs last month',
    icon: Wallet,
    color: '#9B7FD9',
  },
  {
    title: 'Total Orders',
    value: '127',
    subtitle: 'This Month',
    trend: { value: '+8.3%', isPositive: true },
    comparison: '25 pending, 102 completed',
    icon: ShoppingBag,
    color: '#A892E8',
  },
  {
    title: 'Active Customers',
    value: '856',
    subtitle: 'Total Customers',
    trend: { value: '+143', isPositive: true },
    comparison: 'new this month',
    icon: Users,
    color: '#C8B6FF',
  },
  {
    title: 'Average Order Value',
    value: '₨ 3,543',
    subtitle: 'Per Order',
    trend: { value: '-2.1%', isPositive: false },
    comparison: 'vs last month',
    icon: TrendingUp,
    color: '#E6D9FF',
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <Card
          key={kpi.title}
          className="p-6 border-l-4 hover:shadow-lg transition-shadow duration-200"
          style={{ borderLeftColor: kpi.color }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
              <h3 className="text-2xl font-semibold mb-1">{kpi.value}</h3>
              <p className="text-xs text-muted-foreground mb-2">{kpi.subtitle}</p>
              
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                    kpi.trend.isPositive
                      ? 'bg-[#E6FFFA] text-[#047857]'
                      : 'bg-[#FEE2E2] text-[#991B1B]'
                  }`}
                >
                  {kpi.trend.isPositive ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {kpi.trend.value}
                </span>
                <span className="text-xs text-muted-foreground">{kpi.comparison}</span>
              </div>
            </div>

            <div
              className="h-12 w-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${kpi.color}20` }}
            >
              <kpi.icon className="h-6 w-6" style={{ color: kpi.color }} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
