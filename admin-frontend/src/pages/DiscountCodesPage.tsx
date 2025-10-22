import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { mockDiscountCodes } from '../data/mockData';
import { Edit, Trash2, BarChart3 } from 'lucide-react';

export function DiscountCodesPage() {
  const activeCodesCount = mockDiscountCodes.filter(c => c.status === 'active').length;
  const totalSavings = mockDiscountCodes.reduce((sum, code) => 
    sum + (code.currentUses * code.value * (code.type === 'percentage' ? 30 : 1)), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1>Discount Codes Management</h1>
          <p className="text-muted-foreground mt-1">
            {activeCodesCount} Active Codes | Total Savings: ₨{totalSavings.toLocaleString()}
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Code
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDiscountCodes.map((code) => {
          const usagePercent = code.maxUses ? (code.currentUses / code.maxUses) * 100 : 0;
          
          return (
            <Card key={code.id} className="p-6 border-l-4" style={{ 
              borderLeftColor: code.status === 'active' ? '#9B7FD9' : '#D1D5DB' 
            }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-mono font-semibold text-lg">{code.code}</h3>
                    <Badge className={
                      code.status === 'active'
                        ? 'bg-[#E6FFFA] text-[#047857]'
                        : 'bg-[#FEE2E2] text-[#991B1B]'
                    }>
                      {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{code.description}</p>
                </div>
                <Switch checked={code.status === 'active'} />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount Value:</span>
                  <span className="font-semibold text-primary">
                    {code.type === 'percentage' ? `${code.value}%` : `₨${code.value}`} OFF
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Purchase:</span>
                  <span className="font-medium">₨{code.minPurchase.toLocaleString()}</span>
                </div>

                {code.maxUses && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="font-medium">
                        {code.currentUses} / {code.maxUses}
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                  </div>
                )}

                {!code.maxUses && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">{code.currentUses} (Unlimited)</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Valid Period:</span>
                  <span className="font-medium text-xs">
                    {code.validFrom.toLocaleDateString()} - {code.validTo.toLocaleDateString()}
                  </span>
                </div>

                {code.firstTimeOnly && (
                  <Badge className="bg-[#DBEAFE] text-[#1E40AF]">
                    First-time customers only
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Stats
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
