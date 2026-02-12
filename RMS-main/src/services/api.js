const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.getAuthToken = () => localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url);
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  postWithFile(endpoint, data = {}, file = null) {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Date) {
        formData.append(key, data[key].toISOString());
      } else {
        formData.append(key, data[key]);
      }
    });
    
    // Add file if provided
    if (file) {
      formData.append('image', file);
    }

    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
    };

    return fetch(url, config).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  putWithFile(endpoint, data = {}, file = null) {
    const formData = new FormData();
    
    // Add all data fields to FormData
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Date) {
        formData.append(key, data[key].toISOString());
      } else {
        formData.append(key, data[key]);
      }
    });
    
    // Add file if provided
    if (file) {
      formData.append('image', file);
    }

    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      method: 'PUT',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
    };

    return fetch(url, config).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

const api = new ApiService();

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  getProfile: () => 
    api.get('/auth/profile'),
};

export const projectAPI = {
  getProjects: (params = {}) => 
    api.get('/projects', params),
  
  getProject: (id) => 
    api.get(`/projects/${id}`),
  
  createProject: (projectData, imageFile = null) => 
    imageFile ? api.postWithFile('/projects', projectData, imageFile) : api.post('/projects', projectData),
  
  updateProject: (id, projectData, imageFile = null) => 
    imageFile ? api.putWithFile(`/projects/${id}`, projectData, imageFile) : api.put(`/projects/${id}`, projectData),
  
  deleteProject: (id) => 
    api.delete(`/projects/${id}`),
};

export const subAdminAPI = {
  getSubAdmins: (params = {}) => 
    api.get('/subadmins', params),
  
  getSubAdmin: (id) => 
    api.get(`/subadmins/${id}`),
  
  createSubAdmin: (userData) => 
    api.post('/subadmins', userData),
  
  updateSubAdmin: (id, userData) => 
    api.put(`/subadmins/${id}`, userData),
  
  deleteSubAdmin: (id) => 
    api.delete(`/subadmins/${id}`),
};

export const userAPI = {
  updateProfile: (userData) => 
    api.put('/users/profile', userData),
  
  changePassword: (passwordData) => 
    api.put('/users/password', passwordData),
  
  updateSettings: (settingsData) => 
    api.put('/users/settings', settingsData),
};

export default api;
