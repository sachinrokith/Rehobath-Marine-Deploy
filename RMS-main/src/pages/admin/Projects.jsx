import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, Calendar, User, FolderOpen,
  Ship, Anchor, Wrench, Settings, BarChart3, Clock, CheckCircle, X
} from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    client: '',
    startDate: '',
    endDate: '',
    image: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0
  });

  useEffect(() => {
    fetchProjects();
  }, [searchTerm, statusFilter, pagination.current]);

  const handleEditProject = async () => {
    // Validate form
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Project name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.client.trim()) errors.client = 'Client name is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    else if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare project data for marine project
      const projectData = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        client: formData.client,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      };

      console.log('Updating project with data:', projectData);
      
      await projectAPI.updateProject(editingProject._id, projectData, formData.image);
      
      // Reset form and close modal
      setFormData({ name: '', description: '', status: 'active', client: '', startDate: '', endDate: '', image: null });
      setFormErrors({});
      setEditingProject(null);
      setShowEditModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to update project:', error);
      setFormErrors({ submit: error.response?.data?.message || error.message || 'Failed to update project' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddProject = async () => {
    // Validate form
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Project name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.client.trim()) errors.client = 'Client name is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    else if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare project data for marine project
      const projectData = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        client: formData.client,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      };

      await projectAPI.createProject(projectData, formData.image);
      
      // Reset form and close modal
      setFormData({ name: '', description: '', status: 'active', client: '', startDate: '', endDate: '', image: null });
      setFormErrors({});
      setShowAddModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
      setFormErrors({ submit: error.response?.data?.message || error.message || 'Failed to create project' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setFormErrors(prev => ({ ...prev, image: 'Only JPEG, PNG, GIF, and WebP images are allowed' }));
        return;
      }

      if (file.size > maxSize) {
        setFormErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      // Clear image error
      if (formErrors.image) {
        setFormErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    // Clear file input
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: 10
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

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || '',
      description: project.description || '',
      status: project.status || 'active',
      client: project.client || '',
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      image: null
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this marine project?')) return;

    try {
      await projectAPI.deleteProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMarineIcon = (index) => {
    const icons = [Ship, Anchor, Wrench, Settings, BarChart3];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Marine Projects</h1>
              <p className="text-blue-100">Manage your maritime operations and vessel projects</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Filters - Marine Style */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filter Projects</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
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
              <option value="">All Status</option>
              <option value="active">Active Operations</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid - Marine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={project._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Project Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  {getMarineIcon(index)}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                  {project.status || 'active'}
                </span>
              </div>
              <h3 className="text-lg font-bold line-clamp-1">
                {project.name || `Marine Project ${index + 1}`}
              </h3>
            </div>
            
            {/* Project Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description || 'Marine operation and vessel management project for maritime services.'}
              </p>
              
              {/* Project Meta - Marine Fields */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Client: {project.client || 'Maritime Client'}</span>
                </div>
                {project.startDate && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {project.endDate && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Created by: {project.createdBy?.username || 'Marine Team'}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleEditClick(project)}
                  className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors flex items-center justify-center group"
                >
                  <Edit className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center group"
                >
                  <Trash2 className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - Marine Theme */}
      {projects.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ship className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No Marine Projects Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start managing your maritime operations by creating your first marine project. Track vessel repairs, docking schedules, and more.
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Marine Project
          </button>
        </div>
      )}

      {/* Pagination - Marine Style */}
      {pagination.total > 1 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
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
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black transition-opacity"
              style={{ opacity: 0.3 }}
              onClick={() => {
                setShowEditModal(false);
                setEditingProject(null);
                setFormData({ name: '', description: '', status: 'active', client: '', startDate: '', endDate: '', image: null });
                setFormErrors({});
              }}
            ></div>

            {/* Modal Panel */}
            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Marine Project</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProject(null);
                      setFormData({ name: '', description: '', status: 'active', client: '', startDate: '', endDate: '', image: null });
                      setFormErrors({});
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleEditProject(); }}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id="edit-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project description"
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="edit-client" className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        id="edit-client"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.client ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter client name"
                      />
                      {formErrors.client && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.client}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Image
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="file"
                              id="edit-image"
                              name="image"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                                  <Plus className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-600">Click to upload new image</p>
                                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP (max 5MB)</p>
                              </div>
                            </div>
                          </label>
                        </div>
                        
                        {formData.image && (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="shrink-0">
                              <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {formData.image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="shrink-0 text-red-600 hover:text-red-800"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                        
                        {formErrors.image && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-startDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="edit-startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.startDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="edit-endDate" className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="edit-endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.endDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        id="edit-status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {formErrors.submit && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                        {formErrors.submit}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleEditProject}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating...' : 'Update Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProject(null);
                    setFormData({ name: '', description: '', status: 'active', client: '', startDate: '', endDate: '', image: null });
                    setFormErrors({});
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black transition-opacity"
              style={{ opacity: 0.3 }}
              onClick={() => setShowAddModal(false)}
            ></div>

            {/* Modal Panel */}
            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Marine Project</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project description"
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        id="client"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.client ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter client name"
                      />
                      {formErrors.client && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.client}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Image
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="file"
                              id="image"
                              name="image"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                                  <Plus className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-600">Click to upload image</p>
                                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP (max 5MB)</p>
                              </div>
                            </div>
                          </label>
                        </div>
                        
                        {formData.image && (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="shrink-0">
                              <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {formData.image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="shrink-0 text-red-600 hover:text-red-800"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                        
                        {formErrors.image && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.startDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {formErrors.endDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {formErrors.submit && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                        {formErrors.submit}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
