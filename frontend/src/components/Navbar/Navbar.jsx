"use client"

import { useContext, useState, useEffect } from "react"
import "./Navbar.css"
import { assets } from "../../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from "../context/StoreContext"

const Navbar = ({ setShowLogin, className }) => {
  const [menu, setMenu] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${className}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={assets.logo || "/placeholder.svg"} alt="FeastFlow Logo" />
          <span className="logo-text">FeastFlo</span>
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={`navbar-link ${menu === "home" ? "active" : ""}`}
          >
            <span>Home</span>
          </Link>
          <a
            href="#explore-menu"
            onClick={() => handleMenuClick("menu")}
            className={`navbar-link ${menu === "menu" ? "active" : ""}`}
          >
            <span>Menu</span>
          </a>
          <a
            href="#app-download"
            onClick={() => handleMenuClick("mobile-app")}
            className={`navbar-link ${menu === "mobile-app" ? "active" : ""}`}
          >
            <span>Mobile App</span>
          </a>
          <a
            href="#footer"
            onClick={() => handleMenuClick("contact-us")}
            className={`navbar-link ${menu === "contact-us" ? "active" : ""}`}
          >
            <span>Contact</span>
          </a>
        </div>

        <div className="navbar-actions">
          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <Link to="/cart" className="cart-btn" aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6" />
            </svg>
            {getTotalCartAmount() > 0 && (
              <span className="cart-badge">{Object.values(getTotalCartAmount()).length}</span>
            )}
          </Link>

          {!token ? (
            <button onClick={() => setShowLogin(true)} className="auth-btn">
              Sign In
            </button>
          ) : (
            <div className="profile-dropdown">
              <button className="profile-btn">
                <img src={assets.profile_icon || "/placeholder.svg"} alt="Profile" />
              </button>
              <div className="dropdown-menu">
                <button onClick={() => navigate("/myorders")} className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  My Orders
                </button>
                <button onClick={logout} className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
