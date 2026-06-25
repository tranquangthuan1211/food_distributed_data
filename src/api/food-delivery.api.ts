import { apiGet, apiPost, apiPatch } from './api.request';

/**
 * Food Delivery API Client
 * ----------------------------------------------------------------
 * Mỗi hàm bên dưới map 1-1 với 1 endpoint trong food_distributed_be.
 * Base URL đã được Vite proxy "/api" → http://localhost:3000 (xem vite.config.ts).
 *
 * Response wrapper từ BE: { success: boolean; data: T; message?: string }
 * Nên phía component nhớ lấy `.data` ra.
 */

// ====== Auth ======
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => apiPost('/users/register', data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => apiPost('/users/login', data);

// ====== Restaurants ======
export const getRestaurants = () => apiGet('/restaurants');

export const createRestaurant = (data: {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  category?: string;
}) => apiPost('/restaurants', data);

export const getRestaurantMenu = (restaurantId: string) =>
  apiGet(`/restaurants/${restaurantId}/menu`);

// ====== Orders ======
export const createOrder = (data: {
  userId: string;
  restaurantId: string;
  items: Array<{
    menuItemId?: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  paymentMethod?: string;
  deliveryAddress?: string;
  note?: string;
}) => apiPost('/orders', data);

export const updateOrderStatus = (orderId: string, status: string) =>
  apiPatch(`/orders/${orderId}/status`, { status });

export const getUserOrders = (userId: string) =>
  apiGet(`/users/${userId}/orders`);

// ====== Reviews ======
export const createReview = (data: {
  userId: string;
  restaurantId: string;
  orderId?: string;
  rating: number;
  comment?: string;
}) => apiPost('/reviews', data);

// ====== Stats ======
export const getTopFoods = (month: string) =>
  apiGet('/stats/top-foods', { month });

// ====== Graph (Neo4j) ======
export const getRecommendations = (userId: string) =>
  apiGet(`/recommendations/${userId}`);

export const getUserRestaurantGraph = (userId: string) =>
  apiGet(`/graph/user-restaurant/${userId}`);