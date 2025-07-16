"use client"

import { useContext, useState } from "react"
import "./FoodItem.css"
import { StoreContext } from "../context/StoreContext"

const FoodItem = ({ id, name, price, description, image, index }) => {
  const { cartItems, addToCart, removeFromCart, url, loading } = useContext(StoreContext)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const itemCount = cartItems[id] || 0

  return (
    <div
      className="food-item"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="food-item-img-container">
        {!imageLoaded && <div className="image-skeleton"></div>}
        <img
          className={`food-item-image ${imageLoaded ? "loaded" : ""}`}
          src={`${url}/images/${image}`}
          alt={name}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="food-item-overlay">
          <div className="overlay-content">
            <button className="quick-view-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Quick View
            </button>
          </div>
        </div>

        {itemCount > 0 && (
          <div className="cart-badge">
            <span>{itemCount}</span>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3 className="food-item-name">{name}</h3>
          <div className="food-item-rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`star ${i < 4 ? "filled" : ""}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="rating-text">(4.0)</span>
          </div>
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-footer">
          <div className="food-item-price">
            <span className="currency">$</span>
            <span className="amount">{price}</span>
          </div>

          <div className="food-item-counter">
            {itemCount === 0 ? (
              <button className="add-btn" onClick={() => addToCart(id)} disabled={loading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6" />
                </svg>
                Add to Cart
              </button>
            ) : (
              <div className="counter-controls">
                <button className="counter-btn decrease" onClick={() => removeFromCart(id)} disabled={loading}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="counter-value">{itemCount}</span>
                <button className="counter-btn increase" onClick={() => addToCart(id)} disabled={loading}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
