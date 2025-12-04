import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const loginUser = (data) => api.post('/login', data);
export const registerUser = (data) => api.post('/register', data);
export const getRestaurants = () => api.get('/restaurants');
export const getMenu = (restaurantId) => api.get(`/products?restaurant_id=${restaurantId}`);

export default api;