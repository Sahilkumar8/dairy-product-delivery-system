import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage("Product added: " + data.name);
      setForm({ name: "", price: "", originalPrice: "", description: "", image: "" });
    } catch (error) {
      setMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Add New Product</h2>
        <p className="admin-subtext">Fill in the details to list a new dairy product</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="e.g. Full Cream Milk 1L"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Price (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="60"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Original Price (₹) — optional</label>
              <input
                name="originalPrice"
                type="number"
                placeholder="75"
                value={form.originalPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Description</label>
            <input
              name="description"
              placeholder="Short product description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {message && <p className="admin-message">{message}</p>}
      </div>
    </div>
  );
}

export default Admin;