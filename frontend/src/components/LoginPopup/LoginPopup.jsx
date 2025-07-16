"use client";

import { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

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
                Google
              </button>
              <button type="button" className="social-btn facebook">
                Facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
