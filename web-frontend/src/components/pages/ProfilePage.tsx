import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ArrowLeft, User, Mail, Lock, UserPlus, Moon, Sun, Upload, X } from "lucide-react";
import { useAuth } from "../AuthContext";
import { toast } from "sonner";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load profile photo
  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast.success(`Dark mode ${newDarkMode ? 'enabled' : 'disabled'}`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
        localStorage.setItem('profilePhoto', result);
        toast.success("Profile photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem('profilePhoto');
    toast.success("Profile photo removed");
  };

  const requestJson = async (url: string, opts: RequestInit) => {
    const res = await fetch(url, opts);
    const text = await res.text();
    // Detect HTML error page from dev servers
    const isHtml = typeof text === 'string' && text.trim().startsWith('<!DOCTYPE html');
    const json = !isHtml && text ? JSON.parse(text) : null;
    return { res, text, json, isHtml };
  };

  const tryEndpoints = async (path: string, opts: RequestInit) => {
    // Try same-origin first, then localhost:5000, then 127.0.0.1
    const bases = ['', 'http://localhost:5000', 'http://127.0.0.1:5000'];
    for (const base of bases) {
      try {
        const { res, text, json, isHtml } = await requestJson(`${base}${path}`, opts);
        // If we got an HTML page (like "Cannot POST ...") or a 404 from dev server, continue to next base
        if (isHtml || res.status === 404) {
          console.warn(`Request to ${base || 'same-origin'} returned HTML or 404, trying next base.`);
          continue;
        }
        return { res, text, json };
      } catch (err) {
        console.warn(`Request to ${base || 'same-origin'} failed:`, err);
        // try next
      }
    }
    throw new Error('All endpoints failed');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const opts: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      };
      const { res, json, text } = await tryEndpoints('/api/customers/signin', opts);
      if (!res.ok) {
        const message = json?.message || text || `Signin failed (${res.status})`;
        toast.error(message);
        return;
      }
      if (!json || !json.success) {
        toast.error(json?.message || 'Invalid email or password');
        return;
      }

      // persist token and customer
      if (json.token) localStorage.setItem('customer_token', json.token);
      if (json.customer) localStorage.setItem('customer', JSON.stringify(json.customer));

      try { await login?.(formData.email, formData.password); } catch { /* ignore */ }

      toast.success("Welcome back!");
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      try { onNavigate('account'); } catch { window.location.reload(); }
    } catch (error: any) {
      console.error('signin error', error);
      toast.error("Signin failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const payload = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
    const opts: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      const { res, json, text } = await tryEndpoints('/api/customers/signup', opts);
      if (!res.ok) {
        const message = json?.message || text || `Signup failed (${res.status})`;
        toast.error(message);
        return;
      }
      if (!json || !json.success) {
        toast.error(json?.message || 'Signup failed. Please try again.');
        return;
      }

      // If backend gave token use it, otherwise attempt signin
      if (json.token) {
        localStorage.setItem('customer_token', json.token);
      } else {
        // Attempt immediate signin (use same tryEndpoints to respect fallback)
        try {
          const signinOpts: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
          };
          const signinRes = await tryEndpoints('/api/customers/signin', signinOpts);
          const signinJson = signinRes.json;
          if (signinRes.res.ok && signinJson?.success && signinJson.token) {
            localStorage.setItem('customer_token', signinJson.token);
            json.customer = signinJson.customer || json.customer;
          } else {
            console.warn('Auto-signin after signup failed', signinJson ?? signinRes.text);
          }
        } catch (err) {
          console.warn('Auto-signin error', err);
        }
      }

      if (json.customer) {
        localStorage.setItem('customer', JSON.stringify(json.customer));
      }

      try { await login?.(formData.email, formData.password); } catch { /* ignore */ }

      toast.success("Account created successfully!");
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      try { onNavigate('account'); } catch { window.location.reload(); }
    } catch (error: any) {
      console.error('signup fetch error', error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password change if attempting to update
    if (profileData.newPassword) {
      if (!profileData.currentPassword) {
        toast.error("Please enter your current password");
        return;
      }
      if (profileData.newPassword !== profileData.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
      if (profileData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
    }

    toast.success("Profile updated successfully!");
    // Clear password fields after update
    setProfileData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    onNavigate('home');
  };

  // Show login/signup form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white dark:bg-card border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <h1 className="text-2xl font-bold text-primary">My Account</h1>
              <div className="w-32"></div>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </CardTitle>
                  <p className="text-center text-sm text-muted-foreground">
                    {authMode === 'login' 
                      ? 'Welcome back! Sign in to your account' 
                      : 'Join Piko & Pearl to start shopping'}
                  </p>
                </CardHeader>
                <CardContent>
                  {authMode === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label>Email Address *</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Password *</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
                            placeholder="Enter your password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('signup')}
                            className="text-primary hover:underline"
                          >
                            Sign up
                          </button>
                        </p>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label>Full Name *</Label>
                        <div className="relative mt-2">
                          <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your full name"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Email Address *</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Password *</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
                            placeholder="Create a password (min 6 characters)"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Confirm Password *</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, confirmPassword: e.target.value})}
                            placeholder="Confirm your password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('login')}
                            className="text-primary hover:underline"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show profile page if authenticated
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-primary">My Account</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Photo Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative">
                        <img 
                          src={profilePhoto} 
                          alt={user?.name ? `${user.name} profile photo` : 'Profile photo'} 
                          loading="lazy"
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                        <button
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
                      <Button type="button" variant="outline" className="cursor-pointer" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </span>
                      </Button>
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF (max 5MB)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, name: e.target.value})}
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, email: e.target.value})}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-4">Change Password</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Current Password</Label>
                        <Input
                          type="password"
                          value={profileData.currentPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, currentPassword: e.target.value})}
                          className="mt-2"
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <Label>New Password</Label>
                        <Input
                          type="password"
                          value={profileData.newPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, newPassword: e.target.value})}
                          className="mt-2"
                          placeholder="Enter new password (min 6 characters)"
                        />
                      </div>
                      
                      <div>
                        <Label>Confirm New Password</Label>
                        <Input
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, confirmPassword: e.target.value})}
                          className="mt-2"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Appearance Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : (
                      <Sun className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
