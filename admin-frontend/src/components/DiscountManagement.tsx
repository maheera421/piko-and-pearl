import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Percent, Plus, Edit, Eye, ToggleLeft, Calendar, Users, Target } from 'lucide-react';

interface DiscountManagementProps {
  onAddDiscount: () => void;
}

export function DiscountManagement({ onAddDiscount }: DiscountManagementProps) {
  const discounts = [
    {
      code: 'SUMMER2025',
      type: '% Off',
      value: '20%',
      validity: '2024-01-15 to 2024-02-15',
      status: 'active',
      usage: 87,
      maxUsage: 500,
      description: 'Summer collection special discount',
      category: 'Seasonal',
    },
    {
      code: 'GOLD50',
      type: 'Flat ₹ Off',
      value: '₹5,000',
      validity: '2024-01-10 to 2024-01-31',
      status: 'active',
      usage: 23,
      maxUsage: 100,
      description: 'Gold jewelry exclusive offer',
      category: 'Product Specific',
    },
    {
      code: 'BOGO',
      type: 'BOGO',
      value: 'Buy 1 Get 1',
      validity: '2024-01-01 to 2024-01-30',
      status: 'soon',
      usage: 0,
      maxUsage: 200,
      description: 'Buy one get one free deal',
      category: 'Promotional',
    },
    {
      code: 'WELCOME10',
      type: '% Off',
      value: '10%',
      validity: '2023-12-01 to 2024-01-01',
      status: 'expired',
      usage: 156,
      maxUsage: 300,
      description: 'Welcome bonus for new customers',
      category: 'Customer Acquisition',
    },
    {
      code: 'DIAMOND25',
      type: '% Off',
      value: '25%',
      validity: '2024-01-20 to 2024-02-20',
      status: 'active',
      usage: 45,
      maxUsage: 150,
      description: 'Premium diamond collection discount',
      category: 'Premium',
    },
    {
      code: 'LOYALTY15',
      type: '% Off',
      value: '15%',
      validity: '2024-01-01 to 2024-12-31',
      status: 'active',
      usage: 234,
      maxUsage: 1000,
      description: 'Loyalty program exclusive discount',
      category: 'Loyalty',
    },
  ];

  const usageData = [
    { day: 'Mon', usage: 12 },
    { day: 'Tue', usage: 19 },
    { day: 'Wed', usage: 3 },
    { day: 'Thu', usage: 25 },
    { day: 'Fri', usage: 18 },
    { day: 'Sat', usage: 32 },
    { day: 'Sun', usage: 28 },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          label: '✅ Active',
          bgGradient: 'from-green-50 to-green-100',
          borderColor: 'border-green-200'
        };
      case 'soon': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          label: '⏳ Soon',
          bgGradient: 'from-yellow-50 to-yellow-100',
          borderColor: 'border-yellow-200'
        };
      case 'expired': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          label: '❌ Expired',
          bgGradient: 'from-red-50 to-red-100',
          borderColor: 'border-red-200'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          label: status,
          bgGradient: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '% Off': return <Percent className="w-4 h-4" />;
      case 'Flat ₹ Off': return <Target className="w-4 h-4" />;
      case 'BOGO': return <Users className="w-4 h-4" />;
      default: return <Percent className="w-4 h-4" />;
    }
  };

  const getUsagePercentage = (usage: number, maxUsage: number) => {
    return (usage / maxUsage) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center">
              <Percent className="w-3 h-3 text-white" />
            </div>
            Discount & Promotions
          </CardTitle>
          <Button onClick={onAddDiscount} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Discount
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Discount Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discounts.map((discount, index) => {
            const statusConfig = getStatusConfig(discount.status);
            const usagePercentage = getUsagePercentage(discount.usage, discount.maxUsage);
            
            return (
              <Card key={index} className={`relative overflow-hidden transition-all hover:shadow-md ${statusConfig.borderColor}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.bgGradient} opacity-20`}></div>
                
                <CardContent className="relative p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm border">
                          {getTypeIcon(discount.type)}
                        </div>
                        <Badge className={`${statusConfig.color} text-xs px-2 py-1`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{discount.code}</h3>
                      <p className="text-sm text-muted-foreground">{discount.description}</p>
                    </div>
                  </div>

                  {/* Discount Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Discount Value</span>
                      <span className="font-semibold text-purple-600">{discount.value}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <Badge variant="outline" className="text-xs">
                        {discount.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <Badge variant="secondary" className="text-xs">
                        {discount.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="font-medium">
                        {discount.usage} / {discount.maxUsage}
                      </span>
                    </div>
                    <Progress 
                      value={usagePercentage} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {usagePercentage.toFixed(1)}% used
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {discount.validity}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`gap-1 text-xs ${
                        discount.status === 'active' 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      <ToggleLeft className="w-3 h-3" />
                      {discount.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {discounts.filter(d => d.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-600">
              {discounts.filter(d => d.status === 'soon').length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">
              {discounts.filter(d => d.status === 'expired').length}
            </div>
            <div className="text-sm text-muted-foreground">Expired</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">
              {discounts.reduce((sum, d) => sum + d.usage, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Uses</div>
          </div>
        </div>

        {/* Usage Chart */}
        <div>
          <h4 className="mb-4 flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded"></div>
            Discount Usage This Week
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}