import axios from 'axios';
import { 
  Product, 
  ProductsResponse, 
  Order, 
  OrderItem,
  Category,
  Brand,
  Seller,
  Review,
  WishlistItem,
  FilterOptions,
  User,
  Address,
  ComparisonItem,
  SearchSuggestion
} from './types';

const PRODUCT_API = 'http://localhost:8081/api/v1';
const ORDER_API = 'http://localhost:8082/api/v1';

export const productApi = {
  getAllProducts: async (page = 0, size = 20, filters?: FilterOptions): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products`, {
      params: { page, size, ...filters }
    });
    return response.data;
  },

  searchProducts: async (keyword: string, page = 0, size = 20, filters?: FilterOptions): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products`, {
      params: { keyword, page, size, ...filters }
    });
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${PRODUCT_API}/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId: number, page = 0, size = 20): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products/category/${categoryId}`, {
      params: { page, size }
    });
    return response.data;
  },

  getProductsByBrand: async (brandId: number, page = 0, size = 20): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products/brand/${brandId}`, {
      params: { page, size }
    });
    return response.data;
  },

  getProductsBySeller: async (sellerId: number, page = 0, size = 20): Promise<ProductsResponse> => {
    const response = await axios.get(`${PRODUCT_API}/products/seller/${sellerId}`, {
      params: { page, size }
    });
    return response.data;
  },

  getSimilarProducts: async (productId: number, limit = 10): Promise<Product[]> => {
    const response = await axios.get(`${PRODUCT_API}/products/${productId}/similar`, {
      params: { limit }
    });
    return response.data;
  },

  getSearchSuggestions: async (query: string): Promise<SearchSuggestion[]> => {
    const response = await axios.get(`${PRODUCT_API}/search/suggestions`, {
      params: { q: query }
    });
    return response.data;
  }
};

export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${PRODUCT_API}/categories`);
    return response.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await axios.get(`${PRODUCT_API}/categories/${id}`);
    return response.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await axios.get(`${PRODUCT_API}/categories/slug/${slug}`);
    return response.data;
  }
};

export const brandApi = {
  getAllBrands: async (): Promise<Brand[]> => {
    const response = await axios.get(`${PRODUCT_API}/brands`);
    return response.data;
  },

  getBrandById: async (id: number): Promise<Brand> => {
    const response = await axios.get(`${PRODUCT_API}/brands/${id}`);
    return response.data;
  },

  getBrandBySlug: async (slug: string): Promise<Brand> => {
    const response = await axios.get(`${PRODUCT_API}/brands/slug/${slug}`);
    return response.data;
  }
};

export const sellerApi = {
  getAllSellers: async (): Promise<Seller[]> => {
    const response = await axios.get(`${PRODUCT_API}/sellers`);
    return response.data;
  },

  getSellerById: async (id: number): Promise<Seller> => {
    const response = await axios.get(`${PRODUCT_API}/sellers/${id}`);
    return response.data;
  },

  getSellerBySlug: async (slug: string): Promise<Seller> => {
    const response = await axios.get(`${PRODUCT_API}/sellers/slug/${slug}`);
    return response.data;
  }
};

export const reviewApi = {
  getProductReviews: async (productId: number, page = 0, size = 10): Promise<{ content: Review[]; totalPages: number; totalElements: number }> => {
    const response = await axios.get(`${PRODUCT_API}/products/${productId}/reviews`, {
      params: { page, size }
    });
    return response.data;
  },

  createReview: async (productId: number, reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
    const response = await axios.post(`${PRODUCT_API}/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  markReviewHelpful: async (reviewId: number): Promise<void> => {
    await axios.post(`${PRODUCT_API}/reviews/${reviewId}/helpful`);
  }
};

export const wishlistApi = {
  getWishlist: async (userId: number): Promise<WishlistItem[]> => {
    const response = await axios.get(`${PRODUCT_API}/users/${userId}/wishlist`);
    return response.data;
  },

  addToWishlist: async (userId: number, productId: number): Promise<WishlistItem> => {
    const response = await axios.post(`${PRODUCT_API}/users/${userId}/wishlist`, { productId });
    return response.data;
  },

  removeFromWishlist: async (userId: number, wishlistItemId: number): Promise<void> => {
    await axios.delete(`${PRODUCT_API}/users/${userId}/wishlist/${wishlistItemId}`);
  }
};

export const comparisonApi = {
  getComparison: async (userId: number): Promise<ComparisonItem[]> => {
    const response = await axios.get(`${PRODUCT_API}/users/${userId}/comparison`);
    return response.data;
  },

  addToComparison: async (userId: number, productId: number): Promise<ComparisonItem> => {
    const response = await axios.post(`${PRODUCT_API}/users/${userId}/comparison`, { productId });
    return response.data;
  },

  removeFromComparison: async (userId: number, productId: number): Promise<void> => {
    await axios.delete(`${PRODUCT_API}/users/${userId}/comparison/${productId}`);
  },

  clearComparison: async (userId: number): Promise<void> => {
    await axios.delete(`${PRODUCT_API}/users/${userId}/comparison`);
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
  },

  getUserOrders: async (userId: number, page = 0, size = 10): Promise<{ content: Order[]; totalPages: number; totalElements: number }> => {
    const response = await axios.get(`${ORDER_API}/users/${userId}/orders`, {
      params: { page, size }
    });
    return response.data;
  },

  cancelOrder: async (orderNumber: string): Promise<Order> => {
    const response = await axios.put(`${ORDER_API}/orders/${orderNumber}/cancel`);
    return response.data;
  }
};

export const userApi = {
  getUserProfile: async (userId: number): Promise<User> => {
    const response = await axios.get(`${PRODUCT_API}/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId: number, userData: Partial<User>): Promise<User> => {
    const response = await axios.put(`${PRODUCT_API}/users/${userId}`, userData);
    return response.data;
  },

  getUserAddresses: async (userId: number): Promise<Address[]> => {
    const response = await axios.get(`${PRODUCT_API}/users/${userId}/addresses`);
    return response.data;
  },

  addAddress: async (userId: number, address: Omit<Address, 'id'>): Promise<Address> => {
    const response = await axios.post(`${PRODUCT_API}/users/${userId}/addresses`, address);
    return response.data;
  },

  updateAddress: async (userId: number, addressId: number, address: Partial<Address>): Promise<Address> => {
    const response = await axios.put(`${PRODUCT_API}/users/${userId}/addresses/${addressId}`, address);
    return response.data;
  },

  deleteAddress: async (userId: number, addressId: number): Promise<void> => {
    await axios.delete(`${PRODUCT_API}/users/${userId}/addresses/${addressId}`);
  }
};