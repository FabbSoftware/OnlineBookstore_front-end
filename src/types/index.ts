export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export interface User {
  id: string; // UUID
  email: string;
  fullName: string;
  role: Role;
}

export interface Book {
  id: string; // UUID
  title: string;
  author: string;
  price: number;
  description?: string;
  isbn?: string;
  coverImageUrl?: string;
  stockQuantity: number;
}

export interface CartItem {
  id: string; // UUID
  bookId: string; // UUID
  bookTitle: string;
  bookAuthor: string;
  bookPrice: number;
  bookCoverImageUrl?: string;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: string; // UUID
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string; // UUID
  bookId: string; // UUID
  bookTitle: string;
  bookAuthor: string;
  bookCoverImageUrl?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string; // UUID
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  contactPhone: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface AddToCartRequest {
  bookId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CheckoutRequest {
  shippingAddress: string;
  contactPhone: string;
}

export interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  fieldErrors?: { field: string; message: string }[];
}
