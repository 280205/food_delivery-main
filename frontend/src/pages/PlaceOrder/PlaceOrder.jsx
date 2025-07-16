"use client"

import { useContext, useEffect, useState } from "react"
import "./PlaceOrder.css"
import { StoreContext } from "../../components/context/StoreContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, loading, error, setError } = useContext(StoreContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
    if (submitError) setSubmitError(null) // Clear error on input change
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: cartItems[item._id],
        }))

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2), // Add delivery fee if cart is not empty
      }

      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

      if (response.data.success) {
        const { session_url } = response.data
        window.location.replace(session_url)
      } else {
        setSubmitError(response.data.message || "Failed to place order. Please try again.")
      }
    } catch (err) {
      console.error("Order placement error:", err)
      setSubmitError(err.response?.data?.message || "An error occurred while placing your order.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token, getTotalCartAmount, navigate])

  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const totalAmount = subtotal + deliveryFee

  return (
    <div className="place-order-page">
      <div className="place-order-container">
        <form onSubmit={placeOrder} className="place-order-form">
          <div className="delivery-info-section">
            <h2 className="section-title">Delivery Information</h2>
            <p className="section-subtitle">Please provide your delivery details</p>

            {submitError && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {submitError}
              </div>
            )}

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  required
                  id="firstName"
                  name="firstName"
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  type="text"
                  placeholder="Nitin"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  required
                  id="lastName"
                  name="lastName"
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  type="text"
                  placeholder="Pandey"
                />
              </div>
              <div className="input-group full-width">
                <label htmlFor="email">Email Address</label>
                <input
                  required
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={formData.email}
                  type="email"
                  placeholder="nitin@example.com"
                />
              </div>
              <div className="input-group full-width">
                <label htmlFor="street">Street Address</label>
                <input
                  required
                  id="street"
                  name="street"
                  onChange={onChangeHandler}
                  value={formData.street}
                  type="text"
                  placeholder="123 Main St"
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  required
                  id="city"
                  name="city"
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  placeholder="New Delhi"
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  required
                  id="state"
                  name="state"
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  placeholder="NY"
                />
              </div>
              <div className="input-group">
                <label htmlFor="zipcode">Zip Code</label>
                <input
                  required
                  id="zipcode"
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  type="text"
                  placeholder="10001"
                />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  required
                  id="country"
                  name="country"
                  onChange={onChangeHandler}
                  value={formData.country}
                  type="text"
                  placeholder="India"
                />
              </div>
              <div className="input-group full-width">
                <label htmlFor="phone">Phone Number</label>
                <input
                  required
                  id="phone"
                  name="phone"
                  onChange={onChangeHandler}
                  value={formData.phone}
                  type="tel"
                  placeholder="+91 888-123-4567"
                />
              </div>
            </div>
          </div>

          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" className="payment-btn" disabled={isSubmitting || loading}>
                {isSubmitting ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
