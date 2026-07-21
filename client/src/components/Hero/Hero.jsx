import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* ---------- LEFT: TEXT CONTENT ---------- */}
        <div className="hero-content">
          <span className="hero-badge">🥛 100% Fresh & Pure</span>

          <h1 className="hero-heading">
            Farm Fresh Dairy, <br />
            Delivered To <span className="hero-highlight">Your Door</span>
          </h1>

          <p className="hero-subtext">
            Milk, curd, paneer, ghee and more — sourced daily from trusted
            farms and delivered fresh every morning, right on time.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="btn btn-filled hero-btn">
              Shop Now
            </Link>
            <Link to="/products" className="btn btn-outline hero-btn">
              Explore Products
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>200+</h3>
              <p>Daily Deliveries</p>
            </div>
            <div className="stat-item">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: IMAGE ---------- */}
        <div className="hero-image-wrapper">
          <img
            src="/src/assets/images/hero-banner.jpg"
            alt="Fresh dairy products"
            className="hero-image"
          />
          <div className="hero-floating-card">
            <span className="floating-icon">🚚</span>
            <div>
              <h4>Free Delivery</h4>
              <p>On orders above ₹299</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;