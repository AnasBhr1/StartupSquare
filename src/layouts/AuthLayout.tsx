import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LayoutDashboard className="h-10 w-10 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 ml-2">Coaching MS</h1>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Outlet />
        </div>
        <p className="text-center text-gray-500 mt-8">
          © {new Date().getFullYear()} Startup Square. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;