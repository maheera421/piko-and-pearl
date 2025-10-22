import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { AddProductPage } from './pages/AddProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AddCategoryPage } from './pages/AddCategoryPage';
import { EditCategoryPage } from './pages/EditCategoryPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderViewPage } from './pages/OrderViewPage';
import { OrderEditPage } from './pages/OrderEditPage';

import { CustomersPage } from './pages/CustomersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('🔒 ProtectedRoute - Auth:', isAuthenticated, 'Loading:', isLoading);
  
  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('🚫 Not authenticated - Redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Authenticated - Showing protected content');
  return <>{children}</>;
}

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('🌐 PublicRoute - Auth:', isAuthenticated, 'Loading:', isLoading);
  
  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    console.log('✅ Already authenticated - Redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('📝 Not authenticated - Showing login page');
  return <>{children}</>;
}

// Main App Component with Auth
function AppRoutes() {
  return (
    <Routes>
      {/* Public Route - Login */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/new" element={<AddCategoryPage />} />
        <Route path="categories/edit/:id" element={<EditCategoryPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/view/:id" element={<OrderViewPage />} />
        <Route path="orders/edit/:id" element={<OrderEditPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="social-media" element={<SocialMediaPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Toaster position="top-right" />
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
