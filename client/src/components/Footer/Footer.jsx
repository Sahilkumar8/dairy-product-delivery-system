import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  // Holds the newsletter email input value
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Handles newsletter form submit
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      {/* ---------- NEWSLETTER STRIP ---------- */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div>
            <h3>Subscribe to our Newsletter</h3>
            <p>Get updates on fresh offers, new products and discounts.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        {subscribed && (
          <p className="newsletter-success">🎉 Thanks for subscribing!</p>
        )}
      </div>

      {/* ---------- MAIN FOOTER ---------- */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="logo-badge">D</span>
              <span className="logo-text">
                Dairy<span className="logo-highlight">Delivery</span>
              </span>
            </div>
            <p>
              Fresh, pure dairy products delivered to your doorstep every
              single day. Trusted by thousands of happy families.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                📘
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                📷
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                🐦
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                ▶️
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li>
                <Link to="/products">Milk</Link>
              </li>
              <li>
                <Link to="/products">Curd & Yogurt</Link>
              </li>
              <li>
                <Link to="/products">Paneer</Link>
              </li>
              <li>
                <Link to="/products">Ghee & Butter</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>📍 123 Green Street, Noida, UP, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@dairydelivery.com</li>
              <li>🕒 Mon - Sun: 6:00 AM - 10:00 PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM BAR ---------- */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DairyDelivery. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;