import React, { useState, useEffect } from "react";
import { getRestaurants, loginUser } from "../../api/food-delivery.api";
import { Restaurant, User } from "../../types/food-delivery";

export default function ApiDemo() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testApi = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Test restaurants API
      const restaurantData = await getRestaurants();
      setRestaurants(restaurantData.data);
      
      // Test login API
      const loginData = await loginUser({
        email: "test@example.com",
        password: "123456"
      });
      setUser(loginData.data.user);
      console.log("Token:", loginData.data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Food Delivery API Demo</h1>
      
      <button
        onClick={testApi}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50 mb-6"
      >
        {loading ? "Loading..." : "Test API Calls"}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Restaurants ({restaurants.length})</h2>
          <div className="space-y-2">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="border rounded p-3">
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.category}</p>
                <p className="text-sm">Rating: {restaurant.rating}/5 ({restaurant.ratingCount})</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">User Info</h2>
          {user ? (
            <div className="border rounded p-3">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p className="text-gray-500">No user data yet</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">API Endpoints</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>GET /api/restaurants</li>
          <li>POST /api/users/login</li>
          <li>POST /api/users/register</li>
          <li>POST /api/restaurants</li>
          <li>POST /api/orders</li>
          <li>And 7 more endpoints...</li>
        </ul>
      </div>
    </div>
  );
}
