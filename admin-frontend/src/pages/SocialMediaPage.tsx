import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  RefreshCw,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

const platformIcons: Record<string, any> = {
  Instagram,
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  TikTok: MessageCircle,
  Pinterest: TrendingUp,
};

const platformOptions = [
  { value: 'Instagram', label: 'Instagram', icon: Instagram, color: '#E4405F' },
  { value: 'Facebook', label: 'Facebook', icon: Facebook, color: '#1877F2' },
  { value: 'Twitter', label: 'Twitter (X)', icon: Twitter, color: '#1DA1F2' },
  { value: 'LinkedIn', label: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { value: 'YouTube', label: 'YouTube', icon: Youtube, color: '#FF0000' },
  { value: 'TikTok', label: 'TikTok', icon: MessageCircle, color: '#000000' },
  { value: 'Pinterest', label: 'Pinterest', icon: TrendingUp, color: '#E60023' },
];

export function SocialMediaPage() {
  const { socialAccounts, addSocialAccount, updateSocialAccount, deleteSocialAccount } = useApp();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    platform: '',
    accountName: '',
    accountUrl: '',
  });

  const getIcon = (iconName: string) => {
    return platformIcons[iconName] || MessageCircle;
  };

  const extractUsernameFromUrl = (url: string, platform: string): string => {
    try {
      const urlObj = new URL(url);
      
      switch (platform) {
        case 'Instagram':
          // Extract from instagram.com/username or instagram.com/username/
          const instaMatch = urlObj.pathname.match(/^\/([^/?]+)/);
          return instaMatch ? `@${instaMatch[1]}` : '';
        
        case 'Facebook':
          // Extract from various Facebook URL formats
          const fbMatch = urlObj.pathname.match(/\/([^/?]+)/);
          return fbMatch ? fbMatch[1] : '';
        
        case 'Pinterest':
          // Extract from pin.it or pinterest.com
          const pinterestMatch = urlObj.pathname.match(/^\/([^/?]+)/);
          return pinterestMatch ? pinterestMatch[1] : '';
        
        case 'Twitter':
          const twitterMatch = urlObj.pathname.match(/^\/([^/?]+)/);
          return twitterMatch ? `@${twitterMatch[1]}` : '';
        
        case 'LinkedIn':
          const linkedinMatch = urlObj.pathname.match(/\/company\/([^/?]+)/);
          return linkedinMatch ? linkedinMatch[1] : '';
        
        case 'YouTube':
          const youtubeMatch = urlObj.pathname.match(/\/(c|channel|user|@)\/([^/?]+)/);
          return youtubeMatch ? youtubeMatch[2] : '';
        
        default:
          return '';
      }
    } catch (e) {
      return '';
    }
  };

  const fetchSocialData = async (url: string, platform: string) => {
    setIsLoadingData(true);
    
    // Simulate API call to extract data from URL
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic mock data based on platform
    const platformMultipliers: Record<string, number> = {
      Instagram: 1.2,
      Facebook: 0.9,
      Twitter: 0.8,
      Pinterest: 1.0,
      LinkedIn: 0.7,
      YouTube: 1.5,
      TikTok: 1.3,
    };
    
    const multiplier = platformMultipliers[platform] || 1;
    const baseFollowers = Math.floor((Math.random() * 40 + 10) * multiplier);
    const basePosts = Math.floor((Math.random() * 300 + 100) * multiplier);
    const baseEngagement = (Math.random() * 3 + 2) * multiplier;
    
    const mockData = {
      followers: baseFollowers + 'K',
      posts: basePosts.toString(),
      engagement: baseEngagement.toFixed(1) + '%',
    };
    
    setIsLoadingData(false);
    return mockData;
  };

  const handleAddAccount = async () => {
    if (!formData.platform || !formData.accountUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate URL format
    try {
      new URL(formData.accountUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsSaving(true);
    
    // Extract username if not provided
    let accountName = formData.accountName;
    if (!accountName) {
      accountName = extractUsernameFromUrl(formData.accountUrl, formData.platform);
    }
    
    // Fetch social data from URL
    toast.info('Fetching account data...');
    const socialData = await fetchSocialData(formData.accountUrl, formData.platform);
    
    const platformData = platformOptions.find(p => p.value === formData.platform);
    
    addSocialAccount({
      platform: formData.platform,
      accountName,
      accountUrl: formData.accountUrl,
      ...socialData,
      icon: formData.platform,
      color: platformData?.color || '#9B7FD9',
      connected: true,
    });

    setIsSaving(false);
    toast.success(`${formData.platform} account added successfully!`);
    setAddDialogOpen(false);
    resetForm();
  };

  const handleEditAccount = async () => {
    if (!formData.accountUrl) {
      toast.error('Please fill in account URL');
      return;
    }

    // Validate URL format
    try {
      new URL(formData.accountUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsSaving(true);
    
    // Extract username if not provided
    let accountName = formData.accountName;
    if (!accountName) {
      accountName = extractUsernameFromUrl(formData.accountUrl, selectedAccount.platform);
    }
    
    // Fetch updated social data from URL
    toast.info('Updating account data...');
    const socialData = await fetchSocialData(formData.accountUrl, selectedAccount.platform);
    
    updateSocialAccount(selectedAccount.id, {
      accountName,
      accountUrl: formData.accountUrl,
      ...socialData,
      lastSync: new Date().toISOString(),
    });

    setIsSaving(false);
    toast.success('Account updated successfully!');
    setEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteAccount = () => {
    deleteSocialAccount(selectedAccount.id);
    toast.success('Account deleted successfully!');
    setDeleteDialogOpen(false);
    setSelectedAccount(null);
    setExpandedCard(null);
  };

  const openEditDialog = (account: any) => {
    setSelectedAccount(account);
    setFormData({
      platform: account.platform,
      accountName: account.accountName,
      accountUrl: account.accountUrl,
    });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (account: any) => {
    setSelectedAccount(account);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      platform: '',
      accountName: '',
      accountUrl: '',
    });
    setSelectedAccount(null);
  };

  const [syncingAccount, setSyncingAccount] = useState<string | null>(null);

  const syncAccount = async (accountId: string) => {
    const account = socialAccounts.find(a => a.id === accountId);
    if (!account) return;

    setSyncingAccount(accountId);
    toast.info('Syncing account data...');
    
    const socialData = await fetchSocialData(account.accountUrl, account.platform);
    
    updateSocialAccount(accountId, { 
      ...socialData,
      lastSync: new Date().toISOString() 
    });
    
    setSyncingAccount(null);
    toast.success('Account synced successfully!');
  };

  const toggleExpanded = (accountId: string) => {
    setExpandedCard(expandedCard === accountId ? null : accountId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Social Media Integration</h1>
          <p className="text-muted-foreground mt-1">
            Manage your social media presence and track performance
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Social Account
        </Button>
      </div>

      {/* Social Media Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {socialAccounts.map((account) => {
          const Icon = getIcon(account.icon);
          const isExpanded = expandedCard === account.id;
          
          return (
            <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${account.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: account.color }} />
                  </div>
                  <div>
                    <h3 className="text-base">{account.platform}</h3>
                    <p className="text-sm text-muted-foreground">{account.accountName}</p>
                  </div>
                </div>
                {account.connected && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-0.5">Followers</p>
                  <p className="font-semibold">{account.followers}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <MessageCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-0.5">Posts</p>
                  <p className="font-semibold">{account.posts}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mb-0.5">Engagement</p>
                  <p className="font-semibold">{account.engagement}</p>
                </div>
              </div>

              {/* Expanded Section */}
              {isExpanded && (
                <div className="border-t pt-4 mb-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Account URL</p>
                    <a 
                      href={account.accountUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {account.accountUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {account.lastSync && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Last synced: {new Date(account.lastSync).toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => syncAccount(account.id)}
                      disabled={syncingAccount === account.id}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${syncingAccount === account.id ? 'animate-spin' : ''}`} />
                      {syncingAccount === account.id ? 'Syncing...' : 'Sync'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(account)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openDeleteDialog(account)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Manage Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toggleExpanded(account.id)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Manage
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {socialAccounts.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No Social Accounts Connected</h3>
            <p className="text-muted-foreground mb-4">
              Connect your social media accounts to track performance and manage content
            </p>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Connect Your First Account
            </Button>
          </div>
        </Card>
      )}

      {/* Add Account Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Social Media Account</DialogTitle>
            <DialogDescription>
              Connect a new social media account. We'll automatically fetch your account stats.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Platform Selection */}
            <div>
              <Label>Platform *</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {platformOptions.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = formData.platform === platform.value;
                  return (
                    <button
                      key={platform.value}
                      onClick={() => setFormData({ ...formData, platform: platform.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon 
                        className="h-6 w-6 mx-auto mb-1" 
                        style={{ color: platform.color }}
                      />
                      <p className="text-xs">{platform.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="accountUrl">Account URL *</Label>
              <Input
                id="accountUrl"
                value={formData.accountUrl}
                onChange={(e) => setFormData({ ...formData, accountUrl: e.target.value })}
                placeholder="https://platform.com/yourprofile"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                We'll automatically extract follower count, posts, and engagement data from this URL
              </p>
            </div>

            <div>
              <Label htmlFor="accountName">Account Name (Optional)</Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder="@yourhandle or Your Page Name"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to auto-extract from URL
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddDialogOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleAddAccount} disabled={isSaving || isLoadingData}>
              {isSaving || isLoadingData ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isLoadingData ? 'Fetching Data...' : 'Adding...'}
                </>
              ) : (
                'Add Account'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Social Media Account</DialogTitle>
            <DialogDescription>
              Update your social media account information. We'll refresh your stats automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Platform</Label>
              <Input
                value={formData.platform}
                disabled
                className="mt-1.5 bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="edit-accountUrl">Account URL *</Label>
              <Input
                id="edit-accountUrl"
                value={formData.accountUrl}
                onChange={(e) => setFormData({ ...formData, accountUrl: e.target.value })}
                placeholder="https://platform.com/yourprofile"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                We'll automatically update follower count, posts, and engagement data from this URL
              </p>
            </div>

            <div>
              <Label htmlFor="edit-accountName">Account Name (Optional)</Label>
              <Input
                id="edit-accountName"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder="@yourhandle or Your Page Name"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to auto-extract from URL
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditDialogOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEditAccount} disabled={isSaving || isLoadingData}>
              {isSaving || isLoadingData ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isLoadingData ? 'Fetching Data...' : 'Saving...'}
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Social Media Account?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{selectedAccount?.accountName}</strong> from {selectedAccount?.platform}? 
              This action cannot be undone and you'll need to reconnect the account later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedAccount(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
