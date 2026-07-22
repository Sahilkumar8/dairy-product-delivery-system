import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

// allProducts and onAddToCart are passed from App.jsx
function Products({ allProducts, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const products = allProducts || [];
  const loading = false;

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h2>Our Products</h2>
          <p>Fresh dairy essentials, delivered to your door</p>
        </div>

        <div className="products-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="products-search"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="products-sort"
          >
            <option value="default">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="products-status">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="products-status">No products found.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;