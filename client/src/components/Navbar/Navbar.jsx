import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

// cartCount is passed from App.jsx
function Navbar({ cartCount }) {
  // Tracks scroll position to add a stronger shadow once user scrolls
  const [scrolled, setScrolled] = useState(false);

  // Tracks whether mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Tracks search input value
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <div className="navbar-container">
        {/* ---------- LOGO ---------- */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-badge">D</span>
          <span className="logo-text">
            Dairy<span className="logo-highlight">Delivery</span>
          </span>
        </Link>

        {/* ---------- SEARCH BAR (desktop) ---------- */}
        <div className="navbar-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for milk, curd, paneer..."
          />
          <button className="search-btn" aria-label="Search">
            🔍
          </button>
        </div>

        {/* ---------- NAV LINKS (desktop) ---------- */}
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* ---------- RIGHT ACTIONS (desktop) ---------- */}
        <div className="navbar-actions">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/register" className="btn btn-filled">
            Register
          </Link>

          <Link to="/profile" className="icon-circle" aria-label="Profile">
            👤
          </Link>

          <Link to="/cart" className="icon-circle cart-icon" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        {/* ---------- HAMBURGER (mobile/tablet) ---------- */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "bar bar1 open" : "bar bar1"}></span>
          <span className={menuOpen ? "bar bar2 open" : "bar bar2"}></span>
          <span className={menuOpen ? "bar bar3 open" : "bar bar3"}></span>
        </button>
      </div>

      {/* ---------- MOBILE SEARCH ---------- */}
      <div className="navbar-search mobile-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <button className="search-btn" aria-label="Search">
          🔍
        </button>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" onClick={closeMenu}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="mobile-divider"></div>

        <div className="mobile-icons">
          <Link to="/profile" onClick={closeMenu}>
            👤 Profile
          </Link>
          <Link to="/cart" onClick={closeMenu}>
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        <div className="mobile-buttons">
          <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
            Login
          </Link>
          <Link to="/register" className="btn btn-filled" onClick={closeMenu}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;