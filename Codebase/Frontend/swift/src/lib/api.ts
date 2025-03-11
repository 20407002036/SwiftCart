import axios from 'axios';
import { Product } from './data';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/account/auth/login/', { 
      Email: email, 
      password: password });
    return data;
  },
  verifyEmail: async (email: string, verificationCode: string) => {
    const { data } = await api.post('/account/auth/verifyemail/', {
      Email: email,
      VerificationCode: verificationCode,
    });
    return data;
  },
  signup: async (email: string, password: string, firstName: string, lastName: string) => {
    const { data } = await api.post('/account/auth/signup/', { 
      Email : email,
      password: password,
      FirstName: firstName,
      LastName: lastName
     });
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
  updateProfile: async (profile: any) => {
    const { data } = await api.put('/auth/profile', profile);
    return data;
  },
};

// Products API
export const products = {
  getAll: async () => {
    const { data } = await api.get('/products/');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};

// Orders API
export const orders = {
  getAll: async () => {
    const { data } = await api.get('/orders');
    return data;
  },
  create: async (order: any) => {
    const { data } = await api.post('/orders', order);
    return data;
  },
};