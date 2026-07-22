import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">🥛 Our Story</span>
          <h1>Bringing Farm Freshness To Your Family</h1>
          <p>
            For over a decade, DairyDelivery has been committed to delivering
            pure, fresh dairy products straight from trusted farms to your
            doorstep every single day.
          </p>
        </div>
      </section>

      <section className="about-section about-intro">
        <div className="about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600"
              alt="Dairy farm"
            />
          </div>
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              DairyDelivery was founded with one simple goal — to make fresh,
              pure dairy accessible to every household without compromise.
              We work directly with local farmers, ensuring every liter of
              milk and every block of paneer reaches you within hours of
              production.
            </p>
            <p>
              Today, we proudly serve over 50,000 families, delivering not
              just products but trust, quality, and consistency, every
              morning.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section mission-vision">
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To deliver 100% pure, unadulterated dairy products to every
              doorstep while supporting local farmers with fair, sustainable
              partnerships.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">🌱</div>
            <h3>Our Vision</h3>
            <p>
              To become India's most trusted dairy delivery brand, known for
              freshness, transparency, and unmatched customer care.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section fresh-section">
        <div className="fresh-grid">
          <div className="fresh-text">
            <h2>Farm To Doorstep, Every Day</h2>
            <p>
              Every product we deliver is sourced within 24 hours of
              processing. No long storage, no unnecessary preservatives —
              just fresh dairy the way nature intended.
            </p>
            <ul className="fresh-list">
              <li>✔ Sourced from certified local farms</li>
              <li>✔ Cold-chain delivery maintained end to end</li>
              <li>✔ No artificial preservatives</li>
              <li>✔ Quality checked before every dispatch</li>
            </ul>
            <Link to="/products" className="btn btn-filled">
              Explore Our Products
            </Link>
          </div>
          <div className="fresh-image">
            <img
              src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600"
              alt="Fresh dairy products"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;