import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '';

const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vista_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = {
  login: (username, password) => api.post('/api/auth/login', { username, password }),
  me: () => api.get('/api/auth/me'),
};

export const dashboard = {
  stats: () => api.get('/api/dashboard/stats'),
  updateStats: (data) => api.put('/api/dashboard/stats', data),
  updateChart: (key, data) => api.put(`/api/dashboard/charts/${key}`, data),
  heatmap: () => api.get('/api/dashboard/heatmap'),
  updateHeatmap: (points) => api.put('/api/dashboard/heatmap', { points }),
};

export const cameras = {
  list: () => api.get('/api/cameras'),
  create: (data) => api.post('/api/cameras', data),
  update: (id, data) => api.put(`/api/cameras/${id}`, data),
  delete: (id) => api.delete(`/api/cameras/${id}`),
  setCount: (count) => api.post('/api/cameras/set-count', { count }),
};

export const tracking = {
  list: () => api.get('/api/tracking'),
  create: (data) => api.post('/api/tracking', data),
  delete: (id) => api.delete(`/api/tracking/${id}`),
};

export const alerts = {
  list: () => api.get('/api/alerts'),
  create: (data) => api.post('/api/alerts', data),
  update: (id, data) => api.put(`/api/alerts/${id}`, data),
  delete: (id) => api.delete(`/api/alerts/${id}`),
};

export const analytics = {
  get: (category) => api.get(`/api/analytics/${category}`),
  update: (category, items) => api.put(`/api/analytics/${category}`, { items }),
  updateItem: (id, data) => api.put(`/api/analytics/item/${id}`, data),
};

export const team = {
  list: () => api.get('/api/team'),
  create: (data) => api.post('/api/team', data),
  update: (id, data) => api.put(`/api/team/${id}`, data),
  delete: (id) => api.delete(`/api/team/${id}`),
};

export const contact = {
  submit: (data) => api.post('/api/contact', data),
  list: () => api.get('/api/contact'),
};

export const reports = {
  upload: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post('/api/reports/upload', fd);
  },
  process: (fileId, data) => api.post(`/api/reports/process/${fileId}`, data),
  list: () => api.get('/api/reports/'),
  get: (id) => api.get(`/api/reports/${id}`),
  pdfUrl: (id) => `${API}/api/reports/${id}/download/pdf`,
  videoUrl: (id) => `${API}/api/reports/${id}/download/video`,
};

export default api;
