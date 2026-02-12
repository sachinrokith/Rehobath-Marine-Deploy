import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectAPI, subAdminAPI } from '../../services/api';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  Clock,
  Ship,
  Anchor,
  Wrench,
  Settings,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalSubAdmins: 0,
    activeSubAdmins: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects
      const projectsResponse = await projectAPI.getProjects({ limit: 5 });
      const projects = projectsResponse.data.projects;
      
      // Calculate project stats
      const projectStats = projects.reduce((acc, project) => {
        acc.totalProjects++;
        if (project.status === 'active') acc.activeProjects++;
        if (project.status === 'completed') acc.completedProjects++;
        return acc;
      }, { totalProjects: 0, activeProjects: 0, completedProjects: 0 });

      // Fetch sub-admins if user is admin
      let subAdminStats = { totalSubAdmins: 0, activeSubAdmins: 0 };
      if (user.role === 'admin') {
        try {
          const subAdminsResponse = await subAdminAPI.getSubAdmins({ limit: 100 });
          const subAdmins = subAdminsResponse.data.subAdmins;
          
          subAdminStats = subAdmins.reduce((acc, subAdmin) => {
            acc.totalSubAdmins++;
            if (subAdmin.isActive) acc.activeSubAdmins++;
            return acc;
          }, { totalSubAdmins: 0, activeSubAdmins: 0 });
        } catch (error) {
          console.error('Failed to fetch sub-admins:', error);
        }
      }

      setStats(prev => ({ ...prev, ...projectStats, ...subAdminStats }));
      setRecentProjects(projects.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const marineServices = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Ship Repair",
      count: stats.activeProjects,
      color: "bg-blue-600"
    },
    {
      icon: <Anchor className="w-8 h-8" />,
      title: "Dry Docking", 
      count: stats.completedProjects,
      color: "bg-green-600"
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Harbor Services",
      count: stats.totalProjects,
      color: "bg-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Marine Style */}
      <div className="relative bg-linear-to-r from-blue-900 to-blue-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-8 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Command Center</h1>
              <p className="text-blue-100">Resource Management System Dashboard</p>
            </div>
          </div>
          <div className="flex items-center text-blue-100">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Welcome back, {user?.username}</span>
          </div>
        </div>
      </div>

      {/* Marine Services Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {marineServices.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className={`${service.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-3 rounded-lg">
                  {service.icon}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{service.count}</p>
                  <p className="text-blue-100 text-sm">Active</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-sm mt-1">Marine operations status</p>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Stats (Admin Only) */}
      {user.role === 'admin' && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Team Management</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Active Sub-admins</p>
                  <p className="text-sm text-gray-600">Currently operational</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.activeSubAdmins}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Total Sub-admins</p>
                  <p className="text-sm text-gray-600">All team members</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-600">{stats.totalSubAdmins}</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Projects - Marine Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Ship className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6">
            {recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <FolderOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Ship className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No marine projects yet</p>
                <p className="text-gray-500 text-sm mt-1">Start by adding your first project</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Marine Style */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all group">
                <Wrench className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-gray-900">New Project</p>
                <p className="text-xs text-gray-500 mt-1">Add marine project</p>
              </button>
              <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all group">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-gray-900">Manage Team</p>
                <p className="text-xs text-gray-500 mt-1">Sub-admin access</p>
              </button>
              <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all group">
                <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-gray-900">Reports</p>
                <p className="text-xs text-gray-500 mt-1">View analytics</p>
              </button>
              <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all group">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-gray-900">Activity Log</p>
                <p className="text-xs text-gray-500 mt-1">Recent actions</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status - Marine Theme */}
      <div className="bg-linear-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">System Status</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Database</span>
            </div>
            <span className="text-xs text-green-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">API Server</span>
            </div>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Storage</span>
            </div>
            <span className="text-xs text-yellow-600 font-medium">78% Used</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
