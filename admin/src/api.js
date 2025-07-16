// src/api.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Food APIs
export const getAllFood = async () => {
  const res = await axios.get(`${API}/api/food/list`);
  return res.data;
};

export const addFood = async (formData) => {
  const res = await axios.post(`${API}/api/food/add`, formData);
  return res.data;
};

export const removeFood = async (foodId) => {
  const res = await axios.post(`${API}/api/food/remove`, { id: foodId });
  return res.data;
};

// Order APIs
export const getAllOrders = async () => {
  const res = await axios.get(`${API}/api/order/list`);
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await axios.post(`${API}/api/order/status`, { orderId, status });
  return res.data;
};

export const removeOrder = async (orderId) => {
  const res = await axios.post(`${API}/api/order/remove`, { orderId });
  return res.data;
};
