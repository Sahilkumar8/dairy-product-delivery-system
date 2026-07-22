const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

console.log("=================================");
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("PORT =", process.env.PORT);
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("=================================");

const connectDB = require("./database/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Cart = require("./models/Cart");
const { verifyToken, verifyAdmin } = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// ================= AUTH =================

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed: " + error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed: " + error.message });
  }
});

// Admin login (checks against .env credentials)
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({ message: "Admin login successful", token });
  }
  res.status(400).json({ message: "Invalid admin credentials" });
});

// ================= PRODUCTS =================

app.get("/api/products", async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/api/products", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

app.put("/api/products/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

app.delete("/api/products/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// ================= CART =================

app.get("/api/cart", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

app.post("/api/cart/add", verifyToken, async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, name, price, image, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

app.put("/api/cart/update", verifyToken, async (req, res) => {
  try {
    const { productId, action } = req.body; // action: "increase" or "decrease"
    const cart = await Cart.findOne({ userId: req.user.id });
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      if (action === "increase") item.quantity += 1;
      if (action === "decrease" && item.quantity > 1) item.quantity -= 1;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart" });
  }
});

app.delete("/api/cart/remove/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});

// ================= ORDERS =================

app.post("/api/orders", verifyToken, async (req, res) => {
  try {
    const orderData = { ...req.body, userId: req.user.id };
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear cart after order is placed
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

app.get("/api/orders/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Admin: view all orders
app.get("/api/admin/orders", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.put("/api/admin/orders/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

// Admin: view all users
app.get("/api/admin/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});