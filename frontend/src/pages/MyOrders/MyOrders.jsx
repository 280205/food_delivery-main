"use client"

import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { StoreContext } from "../../components/context/StoreContext"
import axios from "axios"
import { assets } from "../../assets/assets"
import { useNavigate } from "react-router-dom"

const MyOrders = () => {
  const { url, token, loading, error, setError } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const navigate = useNavigate()

  const fetchOrders = async () => {
    setIsLoadingOrders(true)
    setError(null)
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
      setData(response.data.data)
    } catch (err) {
      console.error("Failed to fetch orders:", err)
      setError("Failed to load your orders. Please try again later.")
    } finally {
      setIsLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    } else {
      navigate("/cart") // Redirect to cart if not logged in
    }
  }, [token, navigate])

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">Track the status of your recent orders</p>

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {isLoadingOrders ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your orders...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h2 className="empty-orders-title">No Orders Found</h2>
            <p className="empty-orders-message">It looks like you haven't placed any orders yet.</p>
            <button className="browse-menu-btn" onClick={() => navigate("/")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {data.map((order, index) => (
              <div key={index} className="order-card" data-status={order.status.toLowerCase()}>
                <div className="order-header">
                  <img src={assets.parcel_icon || "/placeholder.svg"} alt="Parcel Icon" className="order-icon" />
                  <div className="order-meta">
                    <span className="order-id">Order #{order._id.substring(0, 8)}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="detail-row">
                    <span className="detail-label">Items:</span>
                    <span className="detail-value order-items-list">
                      {order.items.map((item, itemIndex) => (
                        <span key={itemIndex}>
                          {item.name} x {item.quantity}
                          {itemIndex !== order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value amount">${order.amount.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Items:</span>
                    <span className="detail-value">{order.items.length}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value order-status">
                      <span className="status-dot"></span>
                      <b>{order.status}</b>
                    </span>
                  </div>
                </div>

                <div className="order-actions">
                  <button className="track-order-btn" onClick={fetchOrders}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
