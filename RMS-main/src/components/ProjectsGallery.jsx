import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import { 
  Search, Filter, Eye, Calendar, User, Ship, Anchor, Wrench, 
  BarChart3, Clock, CheckCircle, X, ArrowLeft, ArrowRight
} from 'lucide-react';

const ProjectsGallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0
  });

  useEffect(() => {
    fetchProjects();
  }, [searchTerm, statusFilter, pagination.current]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: 12
      };
      
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const response = await projectAPI.getProjects(params);
      setProjects(response.data.projects || []);
      setPagination(response.data.pagination || { current: 1, total: 1, count: 0 });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMarineIcon = (index) => {
    const icons = [Ship, Anchor, Wrench, BarChart3];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading marine projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50">
      {/* Header Section - Marine Style */}
      <div className="relative bg-linear-to-r from-blue-900 to-blue-700 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Projects Gallery</h1>
                <p className="text-blue-100">Explore our completed maritime operations and vessel projects</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-blue-100 text-sm">
                  <span className="font-semibold">{pagination.count}</span> Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search marine projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full lg:w-64">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Projects</option>
                <option value="completed">Completed Projects</option>
                <option value="active">Active Operations</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid - Marine Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image.startsWith('data:') ? project.image : `http://localhost:5000${project.image}`} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getMarineIcon(index)}
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status || 'completed'}
                  </span>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {project.name || `Marine Project ${index + 1}`}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description || 'Marine operation and vessel management project for maritime services.'}
                </p>
                
                {/* Project Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Client: {project.client || 'Maritime Client'}</span>
                  </div>
                  {project.startDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Start: {formatDate(project.startDate)}</span>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>End: {formatDate(project.endDate)}</span>
                    </div>
                  )}
                </div>
                
                {/* View Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center group-hover:scale-105">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ship className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Projects Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No marine projects found matching your criteria. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('completed');
                setPagination(prev => ({ ...prev, current: 1 }));
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.total > 1 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{projects.length}</span> of{' '}
                <span className="font-medium">{pagination.count}</span> projects
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current: Math.max(1, prev.current - 1) }))}
                  disabled={pagination.current === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-900">
                  Page {pagination.current} of {pagination.total}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current: Math.min(pagination.total, prev.current + 1) }))}
                  disabled={pagination.current === pagination.total}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black transition-opacity"
              style={{ opacity: 0.5 }}
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Modal Panel */}
            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Project Details</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Image and Basic Info */}
                  <div>
                    {/* Project Image */}
                    <div className="relative h-64 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl overflow-hidden mb-6">
                      {selectedProject.image ? (
                        <img 
                          src={selectedProject.image.startsWith('data:') ? selectedProject.image : `http://localhost:5000${selectedProject.image}`} 
                          alt={selectedProject.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Ship className="w-16 h-16 text-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Project Name</h4>
                        <p className="text-gray-700">{selectedProject.name}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                        <p className="text-gray-700">{selectedProject.client || 'Maritime Client'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Description and Dates */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedProject.description || 'Marine operation and vessel management project for maritime services.'}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Project Timeline</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-gray-700">
                              <strong>Start:</strong> {formatDate(selectedProject.startDate)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-gray-700">
                              <strong>End:</strong> {formatDate(selectedProject.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Project Manager</h4>
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-gray-700">
                            {selectedProject.createdBy?.username || 'Marine Team'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGallery;
