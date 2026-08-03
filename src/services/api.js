import axios from 'axios';

const API_BASE_URL = '/api';

export const api = {
  getAllProducts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/produtos`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/produtos`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  
  getMarcas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/marcas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }
};