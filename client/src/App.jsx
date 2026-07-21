import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Admin from "./pages/Admin/Admin";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products once, so Home can show a "Featured" slice of them
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch(() => setAllProducts([]));
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const handleCheckout = async () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cartItems, totalPrice }),
    });
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home featuredProducts={allProducts} onAddToCart={handleAddToCart} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={<Products onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onRemove={handleRemove}
              onCheckout={handleCheckout}
            />
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;