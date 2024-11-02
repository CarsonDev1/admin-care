import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-boilerplate.onrender.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Thêm interceptor vào axios instance
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await api.post('/auth/refresh-tokens', {
          refreshToken: refreshToken
        });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Xử lý khi refresh token cũng hết hạn
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Điều hướng về trang đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default api;
