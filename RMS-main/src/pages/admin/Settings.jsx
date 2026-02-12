import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import { Settings, User, Shield, Bell, Database, Save, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    darkMode: false
  });
  
  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    clearMessages();
  };

  const handleSystemSettingChange = (setting) => {
    setSystemSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    clearMessages();
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    clearMessages();

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You are not logged in. Please log in again.');
      return;
    }

    // Validation
    const errors = {};
    if (!profileData.username.trim()) errors.username = 'Username is required';
    if (!profileData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) errors.email = 'Email is invalid';

    if (profileData.newPassword) {
      if (!profileData.currentPassword) errors.currentPassword = 'Current password is required';
      if (profileData.newPassword.length < 6) errors.newPassword = 'Password must be at least 6 characters';
      if (profileData.newPassword !== profileData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(', '));
      return;
    }

    setLoading(true);
    try {
      console.log('Updating profile with token:', token ? 'Token exists' : 'No token');
      
      // Update profile information
      await userAPI.updateProfile({
        username: profileData.username,
        email: profileData.email
      });

      // Update password if provided
      if (profileData.newPassword) {
        await userAPI.changePassword({
          currentPassword: profileData.currentPassword,
          newPassword: profileData.newPassword
        });
      }
      
      // Update user context
      if (updateUser) {
        updateUser({
          ...user,
          username: profileData.username,
          email: profileData.email
        });
      }
      
      setSuccessMessage('Profile updated successfully!');
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
      
      // Handle authentication errors specifically
      if (error.message.includes('Access denied') || error.message.includes('Unauthorized')) {
        setErrorMessage('Your session has expired. Please log in again.');
        // Optionally redirect to login
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setErrorMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSystemSettingsUpdate = async () => {
    clearMessages();
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You are not logged in. Please log in again.');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Updating settings with token:', token ? 'Token exists' : 'No token');
      
      await userAPI.updateSettings(systemSettings);
      setSuccessMessage('System settings updated successfully!');
    } catch (error) {
      console.error('Failed to update system settings:', error);
      
      // Handle authentication errors specifically
      if (error.message.includes('Access denied') || error.message.includes('Unauthorized')) {
        setErrorMessage('Your session has expired. Please log in again.');
        // Optionally redirect to login
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setErrorMessage(error.response?.data?.message || 'Failed to update system settings. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    setSuccessMessage(`${action} feature coming soon!`);
    setTimeout(() => clearMessages(), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system settings</p>
      </div>

      {/* Authentication Status */}
      <div className={`p-4 rounded-lg border ${
        user ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            user ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className={`text-sm font-medium ${
            user ? 'text-green-800' : 'text-red-800'
          }`}>
            {user ? `Logged in as ${user.username} (${user.role})` : 'Not logged in'}
          </span>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={profileData.currentPassword}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={profileData.newPassword}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={profileData.confirmPassword}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Settings
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive email updates about your projects</p>
                  </div>
                  <button
                    onClick={() => handleSystemSettingChange('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      systemSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => handleSystemSettingChange('twoFactorAuth')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      systemSettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Use dark theme across the admin panel</p>
                  </div>
                  <button
                    onClick={() => handleSystemSettingChange('darkMode')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      systemSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSystemSettingsUpdate}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{user?.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickAction('Edit Profile')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button 
                onClick={() => handleQuickAction('Change Password')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </button>
              <button 
                onClick={() => handleQuickAction('Notification Settings')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center transition-colors"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notification Settings
              </button>
              <button 
                onClick={() => handleQuickAction('Export Data')}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center transition-colors"
              >
                <Database className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">System Information</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="text-gray-900">Feb 4, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Environment</span>
                <span className="text-gray-900">Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
