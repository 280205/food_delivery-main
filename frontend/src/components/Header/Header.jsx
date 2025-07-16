"use client"

import { useEffect, useRef, useState } from "react"
import "./Header.css"
import backgroundVideo from "../../assets/2.mp4"

const TextPressure = ({
  text = "Discover Culinary Excellence",
  fontFamily = "Inter, system-ui, sans-serif",
  width = true,
  weight = true,
  textColor = "#FFFFFF",
  className = "",
  minFontSize = 32,
}) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const spansRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })
  const [fontSize, setFontSize] = useState(minFontSize)

  const chars = text.split("")

  const dist = (a, b) => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX
      cursorRef.current.y = e.clientY
    }

    const handleTouchMove = (e) => {
      const t = e.touches[0]
      cursorRef.current.x = t.clientX
      cursorRef.current.y = t.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = left + width / 2
      mouseRef.current.y = top + height / 2
      cursorRef.current.x = mouseRef.current.x
      cursorRef.current.y = mouseRef.current.y
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return
    const { width: containerW } = containerRef.current.getBoundingClientRect()
    let newFontSize = Math.min(containerW / (chars.length / 3), 72)
    newFontSize = Math.max(newFontSize, minFontSize)
    setFontSize(newFontSize)
  }

  useEffect(() => {
    setSize()
    window.addEventListener("resize", setSize)
    return () => window.removeEventListener("resize", setSize)
  }, [text])

  useEffect(() => {
    let rafId
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 12
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 12

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const maxDist = titleRect.width / 2

        spansRef.current.forEach((span) => {
          if (!span) return
          const rect = span.getBoundingClientRect()
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          }

          const d = dist(mouseRef.current, charCenter)
          const getAttr = (distance, minVal, maxVal) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist)
            return Math.max(minVal, val + minVal)
          }

          const wght = weight ? Math.floor(getAttr(d, 300, 900)) : 600
          const scaleVal = getAttr(d, 1, 1.1)

          span.style.fontWeight = wght
          span.style.transform = `scale(${scaleVal})`
          span.style.transition = "transform 0.1s ease-out"
        })
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafId)
  }, [weight, chars.length])

  return (
    <div ref={containerRef} className="text-pressure-container">
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className}`}
        style={{
          fontFamily,
          fontSize: fontSize,
          color: textColor,
          margin: 0,
          textAlign: "left",
          userSelect: "none",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            className="text-pressure-char"
            style={{ color: textColor }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}

const Header = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToMenu = () => {
    const menuSection = document.getElementById("explore-menu")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={`hero-section ${className}`}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-badge ${isVisible ? "animate" : ""}`}>
            <div className="badge-dot"></div>
            <span>Premium Culinary Experience</span>
          </div>

          <div className={`hero-title-wrapper ${isVisible ? "animate" : ""}`}>
            <TextPressure text="Discover Culinary 
            Excellence" className="hero-title" />
          </div>

          <p className={`hero-subtitle ${isVisible ? "animate" : ""}`}>
            Indulge in a <span className="gradient-text">diverse menu</span> crafted for your unforgettable moments.
            From intimate gatherings to grand celebrations.
          </p>

          <div className={`hero-actions ${isVisible ? "animate" : ""}`}>
            <button className="hero-btn primary" onClick={scrollToMenu}>
              <span>Explore Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="hero-btn secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              <span>Watch Story</span>
            </button>
          </div>

          <div className={`hero-stats ${isVisible ? "animate" : ""}`}>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Menu Items</div>
            </div>
          </div>
        </div>

        <div className={`hero-visual ${isVisible ? "animate" : ""}`}>
          <div className="visual-card">
            <div className="card-glow"></div>
            {/* Apply the new aspect ratio wrapper class */}
            <div className="rounded-2xl overflow-hidden shadow-2xl video-aspect-ratio-wrapper">
              <video
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                // Remove these classes as they are now handled by CSS in .video-aspect-ratio-wrapper video
                alt="Culinary video background"
              />
            </div>

            <div className="floating-element element-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>

            <div className="floating-element element-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Header
