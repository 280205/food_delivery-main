"use client"
import "./Navbar.css"
import { assets } from "../../assets/assets" // Adjust path as needed

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <img className="admin-logo" src={assets.logo || "/placeholder.svg"} alt="FeastFlow Admin Logo" />
        <img className="admin-profile" src={assets.profile_image || "/placeholder.svg"} alt="Admin Profile" />
      </div>
    </nav>
  )
}

export default Navbar
