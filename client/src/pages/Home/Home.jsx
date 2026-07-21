import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Carousel from "../../components/Carousel/Carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

// Sample "Why Choose Us" data
const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    text: "Fresh products delivered to your door every morning before 7 AM.",
  },
  {
    icon: "🌿",
    title: "100% Pure",
    text: "No preservatives, no additives — just farm-fresh dairy goodness.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    text: "Affordable pricing with regular discounts and combo offers.",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    text: "Not satisfied? Hassle-free replacement within 24 hours.",
  },
];

// Sample customer reviews
const reviews = [
  {
    name: "Priya Sharma",
    text: "The milk is always fresh and delivered right on time every single day. Highly recommend!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    text: "Best quality paneer and curd I've found online. My family loves it.",
    rating: 5,
  },
  {
    name: "Anjali Gupta",
    text: "Great service and the app is super easy to use. Delivery is always on schedule.",
    rating: 4,
  },
];

// featuredProducts and onAddToCart are passed from App.jsx
function Home({ featuredProducts, onAddToCart }) {
  return (
    <div className="home">
      <Hero />
      <Carousel />

      {/* ---------- FEATURED PRODUCTS ---------- */}
      <section className="home-section featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Hand-picked favorites, fresh from the farm</p>
        </div>
        <div className="featured-grid">
          {featuredProducts && featuredProducts.length > 0 ? (
            featuredProducts
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))
          ) : (
            <p className="no-products">No products available right now.</p>
          )}
        </div>
        <div className="section-cta">
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="home-section why-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>What makes our dairy delivery different</p>
        </div>
        <div className="why-grid">
          {features.map((feature, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CUSTOMER REVIEWS ---------- */}
      <section className="home-section reviews-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Trusted by thousands of happy families</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <h4 className="review-name">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;