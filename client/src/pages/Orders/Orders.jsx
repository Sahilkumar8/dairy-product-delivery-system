import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Returns a CSS class based on order status, used to color the status badge
  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Cancelled") return "status-cancelled";
    return "status-pending";
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {loading ? (
        <p className="orders-status-msg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <p>📦</p>
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-filled">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.products.map((product, index) => (
                  <span key={index} className="order-item-tag">
                    {product.name}
                  </span>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total</span>
                <span className="order-total">₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;