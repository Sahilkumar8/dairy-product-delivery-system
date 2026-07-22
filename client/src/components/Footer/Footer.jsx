import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
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
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">📘</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>

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