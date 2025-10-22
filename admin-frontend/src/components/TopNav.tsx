import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SearchModal } from './SearchModal';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import logo from 'figma:asset/b36bbc8fe399bdb0a7973841c9c95ba843e68528.png';

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const navigate = useNavigate();
  const { getUnreadCount, userProfile } = useApp();
  const { logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadNotifications = getUnreadCount();

  const handleLogout = () => {
    console.log('🚪 === TOPNAV LOGOUT CLICKED ===');
    
    // Clear auth state
    logout();
    
    // Show toast
    toast.success('Logged out successfully');
    
    // Navigate to login page
    console.log('🔄 Navigating to login page');
    navigate('/login');
  };

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <img src={logo} alt="Piko and Pearl" className="h-10" />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <button
            onClick={() => setSearchOpen(true)}
            className="relative h-10 w-full rounded-lg border border-input bg-background pl-10 pr-20 text-left text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <span>Search products, orders, customers...</span>
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2">
          {/* Search Icon for Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#F44336] text-white text-xs flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 px-2"
              >
                {userProfile.profilePhoto ? (
                  <img 
                    src={userProfile.profilePhoto} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm text-white">{userProfile.firstName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <span className="hidden sm:inline text-sm">{userProfile.firstName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{userProfile.firstName} {userProfile.lastName}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.preventDefault();
                  handleLogout();
                }} 
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
