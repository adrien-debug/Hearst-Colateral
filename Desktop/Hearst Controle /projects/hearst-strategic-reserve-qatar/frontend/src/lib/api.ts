import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API methods
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  verify: () => api.get('/api/auth/verify'),
  logout: () => api.post('/api/auth/logout'),
};

export const containersAPI = {
  getAll: () => api.get('/api/containers'),
  getById: (id: string) => api.get(`/api/containers/${id}`),
  getStats: () => api.get('/api/containers/stats'),
  create: (data: any) => api.post('/api/containers', data),
  update: (id: string, data: any) => api.put(`/api/containers/${id}`, data),
  delete: (id: string) => api.delete(`/api/containers/${id}`),
};

export const minersAPI = {
  getAll: (params?: any) => api.get('/api/miners', { params }),
  getByContainer: (containerId: string) =>
    api.get(`/api/miners/container/${containerId}`),
  getStats: () => api.get('/api/miners/stats'),
  update: (id: string, data: any) => api.put(`/api/miners/${id}`, data),
  restart: (id: string) => api.post(`/api/miners/${id}/restart`),
};

export const metricsAPI = {
  getCurrent: () => api.get('/api/metrics/current'),
  getByPeriod: (period: string) =>
    api.get('/api/metrics/period', { params: { period } }),
  getHashrateHistory: (period: string) =>
    api.get('/api/metrics/hashrate/history', { params: { period } }),
  getPowerHistory: (period: string) =>
    api.get('/api/metrics/power/history', { params: { period } }),
  getStats: () => api.get('/api/metrics/stats'),
};

