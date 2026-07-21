import React from "react";
import "./ProductCard.css";

// product and onAddToCart are passed in as props from the parent page
function ProductCard({ product, onAddToCart }) {
  // Calculate discount percentage if an original price is provided
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      {/* ---------- IMAGE + BADGE ---------- */}
      <div className="product-image-wrapper">
        {hasDiscount && <span className="discount-badge">{discountPercent}% OFF</span>}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      {/* ---------- DETAILS ---------- */}
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-value">{product.rating || "4.2"}</span>
        </div>

        {/* Price */}
        <div className="product-price-row">
          <span className="current-price">₹{product.price}</span>
          {hasDiscount && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;