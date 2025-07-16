"use client"

import { useState, useEffect } from "react"
import "./Home.css"
import Header from "../../components/Header/Header"
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu"
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay"

const Home = () => {
  const [category, setCategory] = useState("All")
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Header />

      {/* Services Section */}
      <section className="services-section" id="services" data-animate>
        <div className="services-container">
          <div className={`services-header ${isVisible.services ? "animate" : ""}`}>
            <div className="section-badge">
              <span>Our Services</span>
            </div>
            <h2 className="section-title">Premium Catering Services</h2>
            <p className="section-description">
              From intimate gatherings to grand celebrations, we bring culinary excellence to every occasion with our
              personalized catering solutions.
            </p>
          </div>

          <div className={`services-grid ${isVisible.services ? "animate" : ""}`}>
            <div className="service-card" style={{ animationDelay: "0.1s" }}>
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="service-title">Weddings</h3>
              <p className="service-description">Luxurious menus crafted to make your special day unforgettable.</p>
              <div className="service-features">
                <span>Custom Menus</span>
                <span>Professional Service</span>
                <span>Elegant Presentation</span>
              </div>
            </div>

            <div className="service-card" style={{ animationDelay: "0.2s" }}>
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h3 className="service-title">Corporate Events</h3>
              <p className="service-description">Elevate your business gatherings with gourmet dining experiences.</p>
              <div className="service-features">
                <span>Business Lunch</span>
                <span>Conference Catering</span>
                <span>Team Building</span>
              </div>
            </div>

            <div className="service-card" style={{ animationDelay: "0.3s" }}>
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
              </div>
              <h3 className="service-title">Private Parties</h3>
              <p className="service-description">Customized catering solutions for intimate celebrations.</p>
              <div className="service-features">
                <span>Birthday Parties</span>
                <span>Anniversary</span>
                <span>Family Gatherings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section className="menu-showcase-section">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section" id="testimonials" data-animate>
        <div className="testimonial-container">
          <div className={`testimonial-header ${isVisible.testimonials ? "animate" : ""}`}>
            <div className="section-badge">
              <span>Testimonials</span>
            </div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-description">
              Don't just take our word for it - hear from our satisfied customers about their amazing experiences.
            </p>
          </div>

          <div className={`testimonial-grid ${isVisible.testimonials ? "animate" : ""}`}>
            <div className="testimonial-card" style={{ animationDelay: "0.1s" }}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "The food was absolutely divine! Our wedding guests couldn't stop raving about the incredible flavors
                and beautiful presentation. FeastFlow made our special day truly unforgettable."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/placeholder.svg?height=50&width=50" alt="Sarah & James" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Sarah & James</h4>
                  <p className="author-title">Wedding Couple</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card" style={{ animationDelay: "0.2s" }}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "Professional, delicious, and perfectly executed! They transformed our corporate event into a culinary
                experience that impressed all our clients and colleagues."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/placeholder.svg?height=50&width=50" alt="Emily Johnson" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Emily Johnson</h4>
                  <p className="author-title">TechCorp CEO</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card" style={{ animationDelay: "0.3s" }}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "From the initial consultation to the final bite, everything was perfect. The attention to detail and
                quality of ingredients made our anniversary celebration extraordinary."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/placeholder.svg?height=50&width=50" alt="Michael Chen" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Michael Chen</h4>
                  <p className="author-title">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta" data-animate>
        <div className="cta-container">
          <div className={`cta-content ${isVisible.cta ? "animate" : ""}`}>
            <h2 className="cta-title">Ready to Create Your Perfect Event?</h2>
            <p className="cta-description">
              Let's work together to design a culinary experience that will leave your guests talking for years to come.
              Contact us today for a personalized consultation.
            </p>
            <div className="cta-actions">
              <button className="cta-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Get in Touch
              </button>
              <button className="cta-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                View Menu
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
