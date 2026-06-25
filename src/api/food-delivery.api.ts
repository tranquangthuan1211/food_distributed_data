import { apiGet, apiPost, apiPatch, apiDelete } from './api.request';

// User APIs
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

// Restaurant APIs
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

// Order APIs
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

// Review APIs
export const createReview = (data: {
  userId: string;
  restaurantId: string;
  orderId?: string;
  rating: number;
  comment?: string;
}) => apiPost('/reviews', data);

// Stats APIs
export const getTopFoods = (month: string) =>
  apiGet('/stats/top-foods', { month });

// Graph APIs
export const getRecommendations = (userId: string) =>
  apiGet(`/recommendations/${userId}`);

export const getUserRestaurantGraph = (userId: string) =>
  apiGet(`/graph/user-restaurant/${userId});