import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Instagram, Eye, Heart, Users, ExternalLink } from 'lucide-react';

export function SalesOverview() {
  const revenueData = [
    { name: 'Gold', value: 45, color: '#fbbf24' },
    { name: 'Diamond', value: 35, color: '#a78bfa' },
    { name: 'Silver', value: 20, color: '#94a3b8' },
  ];

  const weeklyData = [
    { day: 'Mon', online: 12000, offline: 8000 },
    { day: 'Tue', online: 15000, offline: 12000 },
    { day: 'Wed', online: 18000, offline: 9000 },
    { day: 'Thu', online: 22000, offline: 15000 },
    { day: 'Fri', online: 25000, offline: 18000 },
    { day: 'Sat', online: 28000, offline: 22000 },
    { day: 'Sun', online: 20000, offline: 16000 },
  ];

  const instagramMetrics = [
    { label: 'Reach (7 days)', value: '8,421', icon: Eye, trend: '+12%' },
    { label: 'Engagement Rate', value: '7.2%', icon: Heart, trend: '+2.3%' },
    { label: 'Top Post Reach', value: '3.4K', icon: TrendingUp, trend: '+45%' },
    { label: 'New Followers', value: '+210', icon: Users, trend: '+18%' },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              Revenue Breakdown
            </CardTitle>
            <Select defaultValue="7days">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.value}%</div>
                    <div className="text-sm text-muted-foreground">₹{(item.value * 3026).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Sales Chart */}
          <div className="mt-6">
            <h4 className="mb-4">Online vs Offline Sales</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="online" fill="#3b82f6" name="Online" />
                  <Bar dataKey="offline" fill="#fbbf24" name="Offline" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instagram Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
            Instagram Reach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {instagramMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-pink-600" />
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{metric.value}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600">
              <ExternalLink className="w-4 h-4" />
              Boost Top Post
            </Button>
            <Button variant="outline" className="gap-2">
              <Instagram className="w-4 h-4" />
              View Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}