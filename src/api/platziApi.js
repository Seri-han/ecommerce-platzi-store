import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15000,
});

let categoriesCache = null;

API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const platziApi = {
  getAllProducts: async (limit = 50, offset = 0) => {
    try {
      const response = await API.get(`/products?limit=${limit}&offset=${offset}`);
      console.log('📦 Products from API:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const response = await API.get(`/products?categoryId=${categoryId}`);
      console.log(`📦 Products for category ${categoryId}:`, response.data);
      return response;
    } catch (error) {
      console.error('Error fetching by category:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await API.get(`/products/${id}`);
      console.log('📦 Single product:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      if (categoriesCache) {
        return { data: categoriesCache };
      }

      const response = await API.get('/categories');
      console.log('📂 All categories:', response.data);
      
      categoriesCache = response.data;
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};