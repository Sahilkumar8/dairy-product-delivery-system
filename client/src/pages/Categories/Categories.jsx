import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Categories.css";

const categoryList = [
  { name: "Milk", icon: "🥛", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400" },
  { name: "Paneer", icon: "🧀", image: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=400" },
  { name: "Curd", icon: "🥣", image: "https://images.unsplash.com/photo-1571212515416-fca988083b70?w=400" },
  { name: "Butter", icon: "🧈", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400" },
  { name: "Cheese", icon: "🧀", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400" },
  { name: "Ghee", icon: "🫙", image: "https://images.unsplash.com/photo-1631206723958-b0b39d5f0e3e?w=400" },
  { name: "Ice Cream", icon: "🍦", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
  { name: "Yogurt", icon: "🥄", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400" },
];

// allProducts and onAddToCart are passed from App.jsx
function Categories({ allProducts, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = activeCategory
    ? allProducts.filter(
        (product) => product.category && product.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : [];

  return (
    <div className="categories-page">
      <section className="categories-hero">
        <h1>Shop By Category</h1>
        <p>Explore our full range of fresh dairy essentials</p>
      </section>

      <section className="categories-grid-section">
        <div className="categories-grid">
          {categoryList.map((cat) => (
            <div
              key={cat.name}
              className={
                activeCategory === cat.name ? "category-card active" : "category-card"
              }
              onClick={() => setActiveCategory(cat.name)}
            >
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} />
                <span className="category-icon">{cat.icon}</span>
              </div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>

        {activeCategory && (
          <div className="category-clear">
            <p>
              Showing results for <strong>{activeCategory}</strong>
            </p>
            <button onClick={() => setActiveCategory(null)}>Clear Filter ✕</button>
          </div>
        )}
      </section>

      {activeCategory && (
        <section className="category-products-section">
          {filteredProducts.length === 0 ? (
            <p className="category-empty">No products found in this category yet.</p>
          ) : (
            <div className="category-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Categories;