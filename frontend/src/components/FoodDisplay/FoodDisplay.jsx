"use client"

import { useContext, useState, useEffect } from "react"
import "./FoodDisplay.css"
import { StoreContext } from "../context/StoreContext"
import FoodItem from "../FoodItem/FoodItem"

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext)
  const [isVisible, setIsVisible] = useState(false)
  const [filteredFoods, setFilteredFoods] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.querySelector(".food-display")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (category === "All") {
      setFilteredFoods(food_list)
    } else {
      setFilteredFoods(food_list.filter((item) => item.category === category))
    }
  }, [category, food_list])

  if (loading) {
    return (
      <section className="food-display">
        <div className="food-display-container">
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="food-item-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-price"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="food-display">
      <div className="food-display-container">
        <div className={`food-display-header ${isVisible ? "animate" : ""}`}>
          <h2 className="display-title">
            {category === "All" ? "All Dishes" : category}
            <span className="item-count">({filteredFoods.length} items)</span>
          </h2>
          <p className="display-subtitle">Handcrafted with love and the finest ingredients</p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6" />
              </svg>
            </div>
            <h3>No dishes found</h3>
            <p>Try selecting a different category to explore our menu</p>
          </div>
        ) : (
          <div className={`food-grid ${isVisible ? "animate" : ""}`}>
            {filteredFoods.map((item, index) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FoodDisplay
