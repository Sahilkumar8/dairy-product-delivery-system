import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

// cartItems, onRemove, onCheckout come from App.jsx
function Cart({ cartItems, onRemove, onCheckout }) {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = subtotal > 299 || subtotal === 0 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    await onCheckout();
    navigate("/orders");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>🛒</p>
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-filled">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* ---------- ITEMS LIST ---------- */}
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemove(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ---------- SUMMARY ---------- */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;