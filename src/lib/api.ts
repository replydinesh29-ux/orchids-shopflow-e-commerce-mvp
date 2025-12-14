import axios from 'axios';
import { Product, ProductsResponse, Order, OrderItem } from './types';

const PRODUCT_API = 'http://localhost:8081/api/v1';
const ORDER_API = 'http://localhost:8082/api/v1';

export const productApi = {
  getAllProducts: async (page = 0, size = 20): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products`, {
      params: { page, size }
    });
    return response.data;
  },

  searchProducts: async (keyword: string, page = 0, size = 20): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products`, {
      params: { keyword, page, size }
    });
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${PRODUCT_API}/products/${id}`);
    return response.data;
  }
};

export const orderApi = {
  createOrder: async (orderData: {
    customerId: number;
    shippingAddress: string;
    items: OrderItem[];
  }): Promise<Order> => {
    const response = await axios.post(`${ORDER_API}/orders`, orderData);
    return response.data;
  },

  getOrder: async (orderNumber: string): Promise<Order> => {
    const response = await axios.get(`${ORDER_API}/orders/${orderNumber}`);
    return response.data;
  }
};
