import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page from refreshing
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);

      if (data.message === "Login successful") {
        navigate("/");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* ---------- LEFT: FORM ---------- */}
        <div className="auth-form-side">
          <div className="auth-logo">
            <span className="logo-badge">D</span>
            <span className="logo-text">
              Dairy<span className="logo-highlight">Delivery</span>
            </span>
          </div>

          <h2>Welcome Back</h2>
          <p className="auth-subtext">Login to continue your fresh dairy journey</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && <p className="auth-message">{message}</p>}

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

        {/* ---------- RIGHT: BANNER ---------- */}
        <div className="auth-banner-side">
          <div className="auth-banner-content">
            <h3>Fresh Dairy, Delivered Daily</h3>
            <p>Join thousands of happy customers enjoying farm-fresh products.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;