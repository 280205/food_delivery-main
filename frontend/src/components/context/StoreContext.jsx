"use client"

import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = "http://localhost:4000"
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addToCart = async (itemId) => {
    setLoading(true)
    try {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
      }

      if (token) {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
      }
    } catch (error) {
      setError("Failed to add item to cart")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    setLoading(true)
    try {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
      if (token) {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
      }
    } catch (error) {
      setError("Failed to remove item from cart")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount
  }

  const fetchFoodList = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url + "/api/food/list")
      setFoodList(response.data.data)
    } catch (error) {
      setError("Failed to fetch food list")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
      setCartItems(response.data.cartData)
    } catch (error) {
      setError("Failed to load cart data")
      console.error(error)
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  }, [])

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
  }

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
}

export default StoreContextProvider
