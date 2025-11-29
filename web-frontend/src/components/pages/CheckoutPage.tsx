import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, ShoppingBag, Lock } from "lucide-react";
import { useCart } from "../CartContext";
import { useAuth } from "../AuthContext";
import { toast } from "sonner";
import { CreateOrderPayload } from "../../types/order";

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

const COUNTRIES = [
  "Pakistan",
  "UAE",
  "Saudi Arabia",
  "UK",
  "USA",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France"
];

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { isAuthenticated, user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card"); // card -> Online, cod -> COD
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan"
  });

  const { items: cartItems, getTotalPrice, clearCart } = useCart();
  
    // API helpers
  const requestJson = async (url: string, opts: RequestInit) => {
    const res = await fetch(url, opts);
    const text = await res.text();
    const isHtml = typeof text === 'string' && text.trim().startsWith('<!DOCTYPE html');
    let json: any = null;
    try {
      json = !isHtml && text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    return { res, text, json, isHtml };
  };

  const tryEndpoints = async (path: string, opts: RequestInit) => {
    const baseApi = import.meta.env.VITE_API_BASE || '';
    const bases = [baseApi.replace(/\/+$/, ''), 'http://localhost:5000', 'http://127.0.0.1:5000'];
    for (const base of bases) {
      try {
        const { res, text, json, isHtml } = await requestJson(`${base}${path}`, opts);
        if (isHtml || res.status === 404) continue;
        return { res, text, json };
      } catch {}
    }
    throw new Error('All endpoints failed');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to continue with checkout");
      onNavigate('profile');
    }
  }, [isAuthenticated, onNavigate]);

  // Pre-fill form with user data if authenticated - use actual fullName from customer model
  useEffect(() => {
    if (isAuthenticated) {
      // Try to get customer data from localStorage (set during login/signup)
      const customerData = localStorage.getItem('customer');
      let fullName = '';
      let email = '';
      
      if (customerData) {
        try {
          const customer = JSON.parse(customerData);
          fullName = customer.fullName || '';
          email = customer.email || '';
        } catch (e) {
          console.warn('Failed to parse customer data', e);
        }
      }
      
      // Fallback to user from AuthContext if customer data not available
      if (!fullName && user?.name) {
        fullName = user.name;
      }
      if (!email && user?.email) {
        email = user.email;
      }

      setShippingInfo(prev => ({
        ...prev,
        fullName,
        email
      }));
    }
  }, [user, isAuthenticated]);

  const subtotal = getTotalPrice();
  const shipping = 200; // Fixed shipping Rs 200
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      toast.error("Please fill in all required shipping information.");
      return;
    }

    // Add customerId if available
    let customerId: string | undefined = undefined;
    try {
      const customerStr = localStorage.getItem('customer');
      if (customerStr) {
        const customer = JSON.parse(customerStr);
        if (customer && customer._id) customerId = String(customer._id);
      }
    } catch {
      // ignore parsing error
    }

    const paymentMethodMapped = paymentMethod === 'cod' ? 'COD' : 'Online';
    const payload: CreateOrderPayload = {
      customerDetails: {
        fullName: shippingInfo.fullName,
        email: shippingInfo.email,
        phoneNumber: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country
      },
      items: cartItems.map(ci => ({
        productName: ci.name,
        category: ci.category,
        quantity: ci.quantity,
        price: ci.price
      })),
      paymentMethod: paymentMethodMapped,
      total,
      // attach customerId if present
      // @ts-expect-error backend accepts optional customerId
      customerId,
    };

    // Add a timeout controller to avoid hanging
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const result = await tryEndpoints('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const { res, json } = result;

      if (!res.ok) {
        const message =
          (json && (json.message || json.error)) ||
          `Request failed with status ${res.status}`;
        toast.error(message);
        console.error('Order create error:', { status: res.status, body: json });
        return;
      }

      const orderNumber = json?.orderNumber;
      if (orderNumber) {
        toast.success(`Your order with order number #${orderNumber} has been placed successfully!`);
      } else {
        toast.success('Order placed successfully!');
      }
      console.log('Order created:', json);
    } catch (err: any) {
      clearTimeout(timeout);
      const message =
        err?.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : (err?.message || 'Network error');
      toast.error(message);
      console.error('Network error creating order:', err);
      return;
    }
    clearCart();
    
    // Navigate to home
    onNavigate('home');
  };

  // Don't render if not authenticated (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Show empty state if no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Add some items to your cart before proceeding to checkout.
              </p>
            </div>
            <Button onClick={() => onNavigate('home')} size="lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('cart')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Button>
            <h1 className="text-2xl font-bold text-primary">Checkout</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Shipping Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 XXX XXXXXXX"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Street address, apartment, suite, etc."
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select 
                      value={shippingInfo.country} 
                      onValueChange={(value) => setShippingInfo({...shippingInfo, country: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Credit/Debit Card</span>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Cash on Delivery</span>
                        <Badge variant="outline">Available in Pakistan</Badge>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Rs {(item.price * item.quantity).toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals - Tax removed */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal </span>
                    <span>Rs {subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rs {shipping}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs {total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    5-7 business days within Pakistan
                  </p>
                </div>

                {/* Place Order Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  Place Order - Rs {total.toFixed(0)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}