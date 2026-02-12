import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

export const platziApi = {
    getAllProducts: () => API.get('/products'),
    getProductById: (id) => API.get(`/products/${id}`),
    getProductsByCategory: (categoryId) => API.get(`/categories/${categoryId}/products`),
    getAllCategories: () => API.get('/categories'),
    searchProducts: (query) => API.get('/products').then(res => 
    res.data.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
  )
}