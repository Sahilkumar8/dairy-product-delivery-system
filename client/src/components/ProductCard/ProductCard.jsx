import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {hasDiscount && <span className="discount-badge">{discountPercent}% OFF</span>}
        <button
          className={wishlisted ? "wishlist-btn active" : "wishlist-btn"}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Wishlist"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
        <img src={product.image} alt={product.name} className="product-image" />
        <button className="quick-view-btn" onClick={() => setShowQuickView(true)}>
          Quick View
        </button>
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-value">{product.rating || "4.2"}</span>
        </div>

        <div className="product-price-row">
          <span className="current-price">₹{product.price}</span>
          {hasDiscount && <span className="original-price">₹{product.originalPrice}</span>}
        </div>

        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>

      {showQuickView && (
        <div className="quick-view-overlay" onClick={() => setShowQuickView(false)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qv-close" onClick={() => setShowQuickView(false)}>✕</button>
            <img src={product.image} alt={product.name} />
            <div className="qv-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price-row">
                <span className="current-price">₹{product.price}</span>
                {hasDiscount && <span className="original-price">₹{product.originalPrice}</span>}
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  onAddToCart(product);
                  setShowQuickView(false);
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;