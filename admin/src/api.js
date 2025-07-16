import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Admin Login
export const adminLogin = (email, password) => {
  return axios.post(`${API_URL}/api/user/admin-login`, { email, password });
};

// Get All Food Items
export const getFoodList = (token) => {
  return axios.get(`${API_URL}/api/food/list`, {
    headers: { token }
  });
};

// Add Food Item
export const addFoodItem = (formData, token) => {
  return axios.post(`${API_URL}/api/food/add`, formData, {
    headers: { 
      token,
      "Content-Type": "multipart/form-data"
    }
  });
};

// Delete Food Item
export const deleteFoodItem = (id, token) => {
  return axios.delete(`${API_URL}/api/food/delete/${id}`, {
    headers: { token }
  });
};

// Get All Orders
export const getAllOrders = (token) => {
  return axios.get(`${API_URL}/api/order/admin`, {
    headers: { token }
  });
};

// Update Order Status
export const updateOrderStatus = (orderId, status, token) => {
  return axios.post(`${API_URL}/api/order/update-status`, { orderId, status }, {
    headers: { token }
  });
};
