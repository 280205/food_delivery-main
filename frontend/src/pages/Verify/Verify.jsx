"use client"

import { useContext, useEffect, useState } from "react"
import "./Verify.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import { StoreContext } from "../../components/context/StoreContext"
import axios from "axios"

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url, setFoodList, setCartItems } = useContext(StoreContext) // Added setCartItems to clear cart
  const navigate = useNavigate()

  const [status, setStatus] = useState("verifying") // 'verifying', 'success', 'failed'
  const [message, setMessage] = useState("Verifying your payment. Please wait...")

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId })
      if (response.data.success) {
        setStatus("success")
        setMessage("Payment successful! Your order has been placed.")
        setCartItems({}) // Clear cart on successful order
        setTimeout(() => navigate("/myorders"), 2000) // Redirect after 2 seconds
      } else {
        setStatus("failed")
        setMessage(response.data.message || "Payment verification failed. Please try again.")
        setTimeout(() => navigate("/"), 3000) // Redirect to home or cart on failure
      }
    } catch (error) {
      console.error("Payment verification error:", error)
      setStatus("failed")
      setMessage("An error occurred during verification. Please check your order history.")
      setTimeout(() => navigate("/"), 3000)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="verify-page">
      <div className="verify-container">
        {status === "verifying" && (
          <>
            <div className="spinner-large"></div>
            <h2 className="verify-message">{message}</h2>
          </>
        )}
        {status === "success" && (
          <>
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="verify-message success">{message}</h2>
            <p className="redirect-message">Redirecting to your orders...</p>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="failed-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="verify-message failed">{message}</h2>
            <p className="redirect-message">Redirecting to home...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Verify
