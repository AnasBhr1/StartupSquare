import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Target, 
  CreditCard, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  User 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';
import CurrencySelector from '../components/common/CurrencySelector';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user.role) {
      case 'manager':
        return [
          { path: '/manager/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { path: '/manager/sessions', label: 'Sessions', icon: <CalendarClock className="w-5 h-5" /> },
          { path: '/manager/goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
          { path: '/manager/payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
        ];
      case 'coach':
        return [
          { path: '/coach/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { path: '/coach/goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
        ];
      case 'entrepreneur':
        return [
          { path: '/entrepreneur/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { path: '/entrepreneur/goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  // Get page title from current path
  const getPageTitle = () => {
    const currentPath = location.pathname;
    const currentNav = navItems.find(item => item.path === currentPath);
    return currentNav?.label || 'Dashboard';
  };

  // Role label with proper formatting
  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900 ml-2">Coaching MS</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="px-3 py-4">
          <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navigation
          </span>
          <nav className="mt-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center h-16 px-6 bg-white border-b">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <CurrencySelector />
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-3 focus:outline-none transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block text-sm text-left">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{getRoleLabel(user.role)}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  onBlur={() => setProfileDropdownOpen(false)}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;