// admin/src/api.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ✅ Connects to backend

// Food APIs
export const getAllFood = () => axios.get(`${API}/api/food/list`);

export const addFood = (data, token) =>
  axios.post(`${API}/api/food/add`, data, {
    headers: { token },
  });

export const deleteFood = (id, token) =>
  axios.delete(`${API}/api/food/delete/${id}`, {
    headers: { token },
  });

// Order APIs
export const getAllOrders = (token) =>
  axios.get(`${API}/api/order/list`, {
    headers: { token },
  });

export const updateOrderStatus = (id, status, token) =>
  axios.post(
    `${API}/api/order/update`,
    { id, status },
    {
      headers: { token },
    }
  );
