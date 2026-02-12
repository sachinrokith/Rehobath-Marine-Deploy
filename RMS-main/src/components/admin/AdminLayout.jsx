import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  LogOut,
  Menu,
  X,
  Home,
  Settings
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'subadmin']
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: FolderOpen,
      roles: ['admin', 'subadmin']
    },
    {
      name: 'Sub-admins',
      href: '/admin/subadmins',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      roles: ['admin', 'subadmin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:fixed md:top-0 md:left-0 md:translate-x-0 shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RMS</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors relative z-10
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <Home className="w-4 h-4 mr-1" />
                Back to Website
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
