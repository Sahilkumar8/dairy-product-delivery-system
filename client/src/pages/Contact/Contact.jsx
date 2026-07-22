import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Reach out with any questions.</p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          {/* ---------- LEFT: INFO ---------- */}
          <div className="contact-info">
            <div className="info-card">
              <span className="info-icon">📍</span>
              <div>
                <h4>Our Address</h4>
                <p>123 Green Street, Noida, Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">📞</span>
              <div>
                <h4>Phone Number</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email Address</h4>
                <p>support@dairydelivery.com</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🕒</span>
              <div>
                <h4>Working Hours</h4>
                <p>Mon - Sun: 6:00 AM - 10:00 PM</p>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">📘</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">📷</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">▶️</a>
            </div>
          </div>

          {/* ---------- RIGHT: FORM ---------- */}
          <div className="contact-form-wrapper">
            <h2>Send Us A Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-filled contact-submit-btn">
                Send Message
              </button>
              {submitted && (
                <p className="contact-success">
                  🎉 Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ---------- MAP PLACEHOLDER ---------- */}
        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;