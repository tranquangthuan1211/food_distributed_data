// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  label?: string;
  street?: string;
  city?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Restaurant types
export interface Restaurant {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  category?: string;
  rating: number;
  ratingCount: number;
  isOpen: boolean;
  createdAt: string;
}

export interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt: string;
}

// Order types
export interface OrderItem {
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'ewallet';
  deliveryAddress?: string;
  note?: string;
  createdAt: string;
}

// Review types
export interface Review {
  _id: string;
  userId: string;
  restaurantId: string;
  orderId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// Stats types
export interface FoodStats {
  foodId: string;
  foodName: string;
  restaurantId: string;
  totalSold: number;
}

// Graph types
export interface Recommendation {
  foodId: string;
  name: string;
  price: number;
  score: number;
}

export interface UserRestaurantGraph {
  userName: string;
  restaurantId: string;
  restaurantName: string;
  category: string;
  orderCount: number;
  totalSpent: number;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}