import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@pikoandpearl.com';
const ADMIN_PASSWORD = 'crochetstore123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    console.log('🔐 Initial auth check:', authStatus);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      console.log('✅ User is authenticated');
    } else {
      console.log('❌ User is NOT authenticated - showing login');
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    console.log('🔑 Login attempt:', email);
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      console.log('✅ Login successful');
      return true;
    }
    console.log('❌ Login failed');
    return false;
  };

  const logout = () => {
    console.log('🚪 Logout function called');
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    console.log('✅ Logout complete - auth cleared');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
