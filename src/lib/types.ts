export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  items: OrderItem[];
  createdAt: string;
}

export interface ProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
}
