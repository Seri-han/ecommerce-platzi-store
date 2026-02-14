import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15000,
});

export const debugApi = async () => {
  try {
    // Get a single product to see its structure
    const response = await API.get('/products/1');
    console.log('🔍 FULL PRODUCT OBJECT:', response.data);
    console.log('🔍 Title:', response.data.title);
    console.log('🔍 Images field:', response.data.images);
    console.log('🔍 Images type:', typeof response.data.images);
    console.log('🔍 Images array length:', response.data.images?.length);
    if (response.data.images && response.data.images.length > 0) {
      console.log('🔍 First image:', response.data.images[0]);
      console.log('🔍 First image type:', typeof response.data.images[0]);
    }
    return response.data;
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
};