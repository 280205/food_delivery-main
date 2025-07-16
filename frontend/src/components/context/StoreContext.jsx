"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use VITE_API_URL from .env
  const url = import.meta.env.VITE_API_URL;

  // ✅ Add to Cart
  const addToCart = async (itemId) => {
    setLoading(true);
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
      }));

      if (token) {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      }
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (itemId) => {
    setLoading(true);
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
      }));

      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      }
    } catch (err) {
      setError("Failed to remove item from cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch Food List
  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data);
    } catch (err) {
      setError("Failed to fetch food list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load Cart Data
  const loadCartData = async (userToken) => {
    try {
      const res = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: userToken } });
      setCartItems(res.data.cartData);
    } catch (err) {
      setError("Failed to load cart data");
      console.error(err);
    }
  };

  // ✅ Load on mount
  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
    };
    init();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
    error,
    setError,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
