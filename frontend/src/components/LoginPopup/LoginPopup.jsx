"use client"

import { useContext, useState } from "react"
import "./LoginPopup.css"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const onLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      let newUrl = url
      if (currState === "Login") {
        newUrl += "/api/user/login"
      } else {
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl, data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      } else {
        setError(response.data.message || "Something went wrong")
      }
    } catch (error) {
      setError(error.response?.data?.message || "Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-popup-overlay" onClick={() => setShowLogin(false)}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-header">
            <div className="auth-tabs">
              <button
                type="button"
                className={`tab-btn ${currState === "Login" ? "active" : ""}`}
                onClick={() => setCurrState("Login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`tab-btn ${currState === "Sign Up" ? "active" : ""}`}
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </button>
            </div>
            <button type="button" className="close-btn" onClick={() => setShowLogin(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="login-popup-content">
            <div className="welcome-section">
              <h2>{currState === "Login" ? "Welcome Back!" : "Join FeastFlow"}</h2>
              <p>
                {currState === "Login"
                  ? "Sign in to access your account and continue your culinary journey"
                  : "Create an account to start your amazing culinary experience with us"}
              </p>
            </div>

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

            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Processing...
                </div>
              ) : currState === "Sign Up" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>

            <div className="login-popup-condition">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                </span>
              </label>
            </div>

            <div className="auth-switch">
              {currState === "Login" ? (
                <p>
                  Don't have an account?{" "}
                  <button type="button" className="switch-btn" onClick={() => setCurrState("Sign Up")}>
                    Create one here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button type="button" className="switch-btn" onClick={() => setCurrState("Login")}>
                    Sign in here
                  </button>
                </p>
              )}
            </div>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button type="button" className="social-btn facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPopup
