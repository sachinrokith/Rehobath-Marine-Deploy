import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, AlertCircle, Shield, Lock, Mail, Anchor } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
        }}
      >
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${7 + Math.random() * 10}s`
            }}
          >
            <div className={`w-1 h-1 bg-blue-400/30 rounded-full ${i % 3 === 0 ? 'w-2 h-2' : i % 3 === 1 ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}></div>
          </div>
        ))}
        
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 text-blue-800/20 animate-pulse" viewBox="0 0 1440 320" fill="currentColor">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="w-full h-16 text-blue-700/20 absolute bottom-0 animate-pulse delay-75" viewBox="0 0 1440 320" fill="currentColor">
            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Login Container with Enhanced Styling */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo and Title with Animation */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-linear-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/30 transform hover:scale-110 hover:rotate-3 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Shield className="w-10 h-10 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in-up">
            Admin Portal
          </h1>
          <p className="text-blue-200 text-lg mb-3 animate-fade-in-up delay-75">Resource Management System</p>
          <div className="flex items-center justify-center space-x-2 animate-fade-in-up delay-150">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-medium">Marine Services Management</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Enhanced Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden group animate-fade-in-up delay-300">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {/* Enhanced Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-3 backdrop-blur-sm animate-shake">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-2 animate-pulse" />
                  <p className="text-red-200 text-xs font-medium">{error}</p>
                </div>
              </div>
            )}
            
            {/* Enhanced Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex text-xs font-semibold text-blue-200 items-center">
                <Mail className="w-3 h-3 mr-1" />
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 text-sm"
                  placeholder="email"
                />
              </div>
            </div>
            
            {/* Enhanced Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex text-xs font-semibold text-blue-200 items-center">
                <Lock className="w-3 h-3 mr-1" />
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 group-hover:scale-110"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-blue-500/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isSubmitting ? (
                  <div className="flex items-center relative z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span className="text-sm">Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center relative z-10">
                    <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-sm">Sign in to Admin Portal</span>
                  </div>
                )}
              </button>
            </div>

            {/* Enhanced Back to Website */}
            <div className="text-center pt-4 border-t border-white/10">
              <Link 
                to="/"
                className="inline-flex items-center text-xs text-blue-300 hover:text-white transition-all duration-300 group hover:scale-105"
              >
                <Anchor className="w-4 h-4 mr-1 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <span className="font-medium">Back to Website</span>
              </Link>
            </div>
          </form>
        </div>

        {/* Enhanced Footer Info */}
        <div className="text-center mt-6 animate-fade-in-up delay-500">
          <p className="text-blue-300/70 text-xs font-medium mb-3">
            Secure access for authorized personnel only
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center text-blue-400/60 text-xs bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <Lock className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Encrypted</span>
            </div>
            <div className="flex items-center text-blue-400/60 text-xs bg-white/5 px-2 py-1 rounded-full backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <Shield className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Protected</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  );
};

export default Login;
