import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Tạo instance axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý token hết hạn
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu là lỗi 401 (Unauthorized) và chưa retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  getMe: () => axiosInstance.get('/auth/me'),
};

// User API
export const userAPI = {
  getUsers: () => axiosInstance.get('/users/'),
  getUser: (id) => axiosInstance.get(`/users/${id}`),
  updateUser: (id, data) => axiosInstance.put(`/users/${id}`, data),
  deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
};

// Product API
export const productAPI = {
  getProducts: () => axiosInstance.get('/products/'),
  getProduct: (id) => axiosInstance.get(`/products/${id}`),
  createProduct: (data) => axiosInstance.post('/products/', data),
  updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
};

// Category API
export const categoryAPI = {
  getCategories: () => axiosInstance.get('/categories/'),
  getCategory: (id) => axiosInstance.get(`/categories/${id}`),
  createCategory: (data) => axiosInstance.post('/categories/', data),
  updateCategory: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  deleteCategory: (id) => axiosInstance.delete(`/categories/${id}`),
};

// Order API
export const orderAPI = {
  getOrders: () => axiosInstance.get('/orders/'),
  getOrder: (id) => axiosInstance.get(`/orders/${id}`),
  updateOrder: (id, data) => axiosInstance.put(`/orders/${id}`, data),
  deleteOrder: (id) => axiosInstance.delete(`/orders/${id}`),
};

export default axiosInstance; 