"use client"

import { useContext, useState } from "react"
import "./Cart.css"
import { StoreContext } from "../../components/context/StoreContext"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url, loading } = useContext(StoreContext)
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const isCartEmpty = Object.values(cartItems).every((quantity) => quantity === 0)

  const handlePromoSubmit = (e) => {
    e.preventDefault()
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(10)
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  const cartItemsArray = food_list.filter((item) => cartItems[item._id] > 0)
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal + deliveryFee - discountAmount

  return (
    <div className="cart-page">
      <div className="cart-container">
        {isCartEmpty ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6" />
              </svg>
            </div>
            <h2 className="empty-cart-title">Your Cart is Empty</h2>
            <p className="empty-cart-message">
              Looks like you haven't added any items yet. Explore our delicious menu to start your culinary journey!
            </p>
            <button className="browse-menu-btn" onClick={() => navigate("/")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <h1 className="cart-title">Shopping Cart</h1>
              <p className="cart-subtitle">{cartItemsArray.length} items in your cart</p>
            </div>

            <div className="cart-content">
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <span>Item</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span>Action</span>
                </div>

                <div className="cart-items-list">
                  {cartItemsArray.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="item-info">
                        <div className="item-image-wrapper">
                          <img src={`${url}/images/${item.image}`} alt={item.name} className="item-image" />
                        </div>
                        <div className="item-details">
                          <h3 className="item-name">{item.name}</h3>
                          <p className="item-description">{item.description?.substring(0, 60)}...</p>
                        </div>
                      </div>

                      <div className="item-price">
                        <span className="currency">$</span>
                        <span className="amount">{item.price}</span>
                      </div>

                      <div className="item-quantity">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn decrease"
                            onClick={() => removeFromCart(item._id)}
                            disabled={loading}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                          <span className="quantity-value">{cartItems[item._id]}</span>
                          <button
                            className="quantity-btn increase"
                            onClick={() => addToCart(item._id)}
                            disabled={loading}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="item-total">
                        <span className="currency">$</span>
                        <span className="amount">{(item.price * cartItems[item._id]).toFixed(2)}</span>
                      </div>

                      <div className="item-actions">
                        <button
                          className="remove-btn"
                          onClick={() => {
                            // Remove all quantities of this item
                            for (let i = 0; i < cartItems[item._id]; i++) {
                              removeFromCart(item._id)
                            }
                          }}
                          disabled={loading}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary-section">
                <div className="promo-code-card">
                  <h3 className="promo-title">Have a Promo Code?</h3>
                  <p className="promo-subtitle">Enter your code to get instant discount</p>
                  <form className="promo-form" onSubmit={handlePromoSubmit}>
                    <div className="promo-input-group">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <button type="submit" className="promo-btn" disabled={promoApplied || !promoCode}>
                        {promoApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {promoApplied && (
                      <div className="promo-success">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Promo code applied! You saved ${discountAmount.toFixed(2)}
                      </div>
                    )}
                  </form>
                </div>

                <div className="order-summary-card">
                  <h3 className="summary-title">Order Summary</h3>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal ({cartItemsArray.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>Discount ({discount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="checkout-btn" onClick={() => navigate("/order")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
