import React, { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-box">
        <div>
          <h3>Subscribe to our Newsletter</h3>
          <p>Get updates on fresh offers, new products and discounts.</p>
        </div>
        <form onSubmit={handleSubmit}>
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
      {subscribed && <p className="newsletter-thanks">🎉 Thanks for subscribing!</p>}
    </section>
  );
}

export default Newsletter;