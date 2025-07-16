"use client"

import { useState, useEffect } from "react"
import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"

const ExploreMenu = ({ category, setCategory }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("explore-menu")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu-container">
        <div className={`explore-menu-header ${isVisible ? "animate" : ""}`}>
          <div className="section-badge">
            <span>Our Menu</span>
          </div>
          <h2 className="section-title">Explore Our Culinary Journey</h2>
          <p className="section-description">
            Choose from our diverse menu featuring a delectable array of dishes crafted with the finest ingredients and
            culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one
            delicious meal at a time.
          </p>
        </div>

        <div className={`menu-categories ${isVisible ? "animate" : ""}`}>
          {menu_list.map((item, index) => (
            <div
              key={index}
              className={`category-card ${category === item.menu_name ? "active" : ""}`}
              onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-image-wrapper">
                <img src={item.menu_image || "/placeholder.svg"} alt={item.menu_name} className="category-image" />
                <div className="category-overlay">
                  <div className="category-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="category-content">
                <h3 className="category-name">{item.menu_name}</h3>
                <div className="category-indicator">
                  <div className="indicator-dot"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreMenu
