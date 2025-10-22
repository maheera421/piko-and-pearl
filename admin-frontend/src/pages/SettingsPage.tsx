import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';

export function SettingsPage() {
  const { paymentMethods, updatePaymentMethods } = useApp();
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [isSavingStore, setIsSavingStore] = useState(false);
  const [isSavingShipping, setIsSavingShipping] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const handleSavePayment = async () => {
    setIsSavingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingPayment(false);
    toast.success('Payment settings saved successfully!');
  };

  const handleSaveStore = async () => {
    setIsSavingStore(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingStore(false);
    toast.success('Store settings saved successfully!');
  };

  const handleSaveShipping = async () => {
    setIsSavingShipping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingShipping(false);
    toast.success('Shipping settings saved successfully!');
  };

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingNotifications(false);
    toast.success('Notification settings saved successfully!');
  };
  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your store settings and preferences
        </p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList>
          <TabsTrigger value="store">Store Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="shipping">Shipping Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card className="p-6">
            <h3 className="mb-6">Store Information</h3>
            <div className="space-y-4 max-w-2xl">
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Piko & Pearl" className="mt-1.5" />
              </div>
              
              <div>
                <Label htmlFor="store-email">Contact Email</Label>
                <Input id="store-email" type="email" defaultValue="contact@pikoandpearl.com" className="mt-1.5" />
              </div>
              
              <div>
                <Label htmlFor="store-phone">Contact Phone</Label>
                <Input id="store-phone" type="tel" defaultValue="+92 300 1234567" className="mt-1.5" />
              </div>
              
              <div>
                <Label htmlFor="store-address">Store Address</Label>
                <Textarea id="store-address" defaultValue="Lahore, Punjab, Pakistan" className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" defaultValue="PKR (₨)" className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone"
                  className="w-full mt-1.5 px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="PKT">Pakistan Standard Time (PKT)</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                  <option value="EST">Eastern Standard Time (EST)</option>
                  <option value="PST">Pacific Standard Time (PST)</option>
                  <option value="GMT">Greenwich Mean Time (GMT)</option>
                </select>
              </div>

              <Button className="mt-4" onClick={handleSaveStore} disabled={isSavingStore}>
                {isSavingStore ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <h3 className="mb-6">Payment Methods</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Cash on Delivery (COD)</p>
                  <p className="text-sm text-muted-foreground">Accept cash payments on delivery</p>
                </div>
                <Switch 
                  checked={paymentMethods.cod}
                  onCheckedChange={(checked) => updatePaymentMethods({ cod: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">Accept online card payments</p>
                </div>
                <Switch 
                  checked={paymentMethods.card}
                  onCheckedChange={(checked) => updatePaymentMethods({ card: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">MasterCard</p>
                  <p className="text-sm text-muted-foreground">Accept MasterCard payments</p>
                </div>
                <Switch 
                  checked={paymentMethods.mastercard}
                  onCheckedChange={(checked) => updatePaymentMethods({ mastercard: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">JazzCash</p>
                  <p className="text-sm text-muted-foreground">Mobile wallet payments</p>
                </div>
                <Switch 
                  checked={paymentMethods.jazzcash}
                  onCheckedChange={(checked) => updatePaymentMethods({ jazzcash: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">EasyPaisa</p>
                  <p className="text-sm text-muted-foreground">Mobile wallet payments</p>
                </div>
                <Switch 
                  checked={paymentMethods.easypaisa}
                  onCheckedChange={(checked) => updatePaymentMethods({ easypaisa: checked })}
                />
              </div>

              <Button className="mt-4" onClick={handleSavePayment} disabled={isSavingPayment}>
                {isSavingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Payment Settings'
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="p-6">
            <h3 className="mb-6">Shipping Configuration</h3>
            <div className="space-y-4 max-w-2xl">
              <div>
                <Label htmlFor="free-shipping">Free Shipping Threshold</Label>
                <Input id="free-shipping" type="number" defaultValue="2000" placeholder="₨2000" className="mt-1.5" />
                <p className="text-sm text-muted-foreground mt-1">
                  Offer free shipping for orders above this amount
                </p>
              </div>

              <div>
                <Label htmlFor="shipping-fee">Standard Shipping Fee</Label>
                <Input id="shipping-fee" type="number" defaultValue="200" placeholder="₨200" className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="delivery-time">Estimated Delivery Time</Label>
                <Input id="delivery-time" defaultValue="3-5 business days" className="mt-1.5" />
              </div>

              <div>
                <Label htmlFor="return-policy">Return Policy</Label>
                <Textarea 
                  id="return-policy" 
                  defaultValue="Returns accepted within 7 days of delivery for unused items in original packaging." 
                  rows={4}
                  className="mt-1.5"
                />
              </div>

              <Button className="mt-4" onClick={handleSaveShipping} disabled={isSavingShipping}>
                {isSavingShipping ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Shipping Settings'
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="mb-6">Email Notifications</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">New Order Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email when a new order is placed</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when product stock is low</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Payment Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified of successful payments</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly sales and analytics reports</p>
                </div>
                <Switch />
              </div>

              <Button className="mt-4" onClick={handleSaveNotifications} disabled={isSavingNotifications}>
                {isSavingNotifications ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Notification Preferences'
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
