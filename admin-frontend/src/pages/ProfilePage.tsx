import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { User, Lock, Bell, Palette, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';

export function ProfilePage() {
  const { userProfile, updateUserProfile } = useApp();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ profilePhoto: reader.result as string });
        toast.success('Profile photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateUserProfile(formData);
    setIsUpdatingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully!');
  };

  const handleSavePreferences = async () => {
    setIsSavingPreferences(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingPreferences(false);
    toast.success('Preferences saved successfully!');
  };
  return (
    <div className="space-y-6">
      <div>
        <h1>Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          {userProfile.profilePhoto ? (
            <img 
              src={userProfile.profilePhoto} 
              alt="Profile" 
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl">
              {formData.firstName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h3>{formData.firstName} {formData.lastName}</h3>
            <p className="text-sm text-muted-foreground mb-3">Administrator</p>
            <label htmlFor="photo-upload">
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </span>
              </Button>
            </label>
            <input 
              id="photo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handlePhotoChange}
            />
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3>Personal Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input 
              id="first-name" 
              value={formData.firstName} 
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="mt-1.5" 
            />
          </div>
          
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input 
              id="last-name" 
              value={formData.lastName} 
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="mt-1.5" 
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1.5" 
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1.5" 
            />
          </div>
        </div>

        <Button className="mt-6" onClick={handleUpdateProfile} disabled={isUpdatingProfile}>
          {isUpdatingProfile ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Information'
          )}
        </Button>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h3>Login & Security</h3>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" className="mt-1.5" />
          </div>
          
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" className="mt-1.5" />
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" className="mt-1.5" />
          </div>

        </div>

        <Button className="mt-6">Change Password</Button>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h3>Notification Preferences</h3>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive browser notifications</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">New Orders</p>
              <p className="text-sm text-muted-foreground">Notify me when new orders arrive</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Low Stock Alerts</p>
              <p className="text-sm text-muted-foreground">Get alerts for low stock items</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <Button className="mt-6" onClick={handleSavePreferences} disabled={isSavingPreferences}>
          {isSavingPreferences ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </Card>

      {/* Display Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h3>Display Preferences</h3>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
          </div>
        </div>
      </Card>
    </div>
  );
}
