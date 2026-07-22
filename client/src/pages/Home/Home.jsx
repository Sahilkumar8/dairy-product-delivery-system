import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Newsletter from "../../components/Newsletter/Newsletter";
import "./Home.css";

const features = [
  { icon: "🚚", title: "Fast Delivery", text: "Fresh products delivered before 7 AM every morning." },
  { icon: "🌿", title: "100% Pure", text: "No preservatives, no additives — just farm-fresh dairy." },
  { icon: "💰", title: "Best Prices", text: "Affordable pricing with regular discounts and offers." },
  { icon: "🔄", title: "Easy Returns", text: "Not satisfied? Hassle-free replacement within 24 hours." },
];

const reviews = [
  { name: "Priya Sharma", text: "The milk is always fresh and delivered right on time every single day.", rating: 5 },
  { name: "Rahul Verma", text: "Best quality paneer and curd I've found online. My family loves it.", rating: 5 },
  { name: "Anjali Gupta", text: "Great service and the app is super easy to use. Delivery is always on schedule.", rating: 4 },
  { name: "Karan Mehta", text: "Switched to their organic range and the difference in taste is amazing.", rating: 5 },
  { name: "Sneha Kapoor", text: "Their ghee smells and tastes just like homemade. Highly recommend.", rating: 5 },
  { name: "Vikram Singh", text: "Reliable delivery and great customer support whenever I've needed it.", rating: 4 },
];

function Home({ featuredProducts, onAddToCart }) {
  const bestSelling = featuredProducts ? featuredProducts.slice(0, 4) : [];
  const newArrivals = featuredProducts ? featuredProducts.slice(4, 8) : [];

  return (
    <div className="home">
       <Carousel />

      {/* ---------- FEATURED PRODUCTS ---------- */}
      <section className="home-section featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Hand-picked favorites, fresh from the farm</p>
        </div>
        <div className="featured-grid">
          {bestSelling.length > 0 ? (
            bestSelling.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
            ))
          ) : (
            <p className="no-products">No products available right now.</p>
          )}
        </div>
        <div className="section-cta">
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </div>
      </section>

      {/* ---------- PROMO BANNERS ---------- */}
      <section className="promo-banners">
        <div className="promo-banner promo-milk">
          <div className="promo-content">
            <span className="promo-badge">Limited Offer</span>
            <h3>Fresh Milk, Everyday</h3>
            <p>Subscribe and save up to 15% on daily milk delivery</p>
            <Link to="/categories" className="promo-btn">Shop Milk</Link>
          </div>
        </div>
        <div className="promo-banner promo-organic">
          <div className="promo-content">
            <span className="promo-badge">New Arrival</span>
            <h3>Organic Dairy Range</h3>
            <p>100% certified organic products for a healthier you</p>
            <Link to="/categories" className="promo-btn">Explore Organic</Link>
          </div>
        </div>
      </section>

      {/* ---------- BEST SELLING ---------- */}
      {newArrivals.length > 0 && (
        <section className="home-section featured-section">
          <div className="section-header">
            <h2>Best Selling Products</h2>
            <p>Our customers' most loved picks</p>
          </div>
          <div className="featured-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

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

      <Newsletter />
    </div>
  );
}

export default Home;