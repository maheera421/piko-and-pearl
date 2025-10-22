import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, XCircle, Printer, Award, MapPin } from 'lucide-react';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const orderItems = [
    { name: 'Opal Glow Earrings', price: 3500, quantity: 1 },
    { name: 'Diamond Tennis Bracelet', price: 25000, quantity: 1 },
    { name: 'Rose Gold Chain', price: 16500, quantity: 1 },
  ];

  const statusSteps = [
    { label: 'Pending', status: 'current', icon: '⏳' },
    { label: 'Approved', status: 'upcoming', icon: '✅' },
    { label: 'Shipped', status: 'upcoming', icon: '🚚' },
    { label: 'Delivered', status: 'upcoming', icon: '📦' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 2500;
  const shipping = 0;
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + shipping + tax;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Order Details - {order.id}
            <Badge className="bg-yellow-100 text-yellow-800">
              {order.statusLabel}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items List */}
            <div>
              <h3 className="mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        💍
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Breakdown */}
            <div className="p-4 border rounded-lg">
              <h3 className="mb-4">Order Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (SUMMER2025)</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(tax).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(total).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Status Tracker */}
            <div>
              <h3 className="mb-4">Order Status</h3>
              <div className="flex items-center justify-between">
                {statusSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      step.status === 'current' 
                        ? 'bg-blue-100 border-2 border-blue-500' 
                        : step.status === 'completed'
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100 border-2 border-gray-300'
                    }`}>
                      {step.icon}
                    </div>
                    <span className={`text-sm mt-2 ${
                      step.status === 'current' ? 'text-blue-600 font-medium' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Info & Actions */}
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="p-4 border rounded-lg">
              <h3 className="mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{order.customer}</span>
                    <Badge className="bg-gold-100 text-gold-800 gap-1">
                      <Award className="w-3 h-3" />
                      Repeat Customer
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground">priya.sharma@email.com</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>123 MG Road, Connaught Place</p>
                    <p>New Delhi, Delhi 110001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4" />
                Approve Order
              </Button>
              <Button variant="destructive" className="w-full gap-2">
                <XCircle className="w-4 h-4" />
                Reject Order
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Printer className="w-4 h-4" />
                Print Invoice
              </Button>
            </div>

            {/* Order Meta */}
            <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span>{order.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono">{order.id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}