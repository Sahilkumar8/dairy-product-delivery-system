const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const connectDB = require("./database/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ================= AUTH =================

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= PRODUCTS =================

// Get Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= SEED PRODUCTS =================

app.get("/api/seed", async (req, res) => {
  try {
    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "Amul Milk",
        price: 60,
        originalPrice: 70,
        description: "Fresh Cow Milk",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150"
      },
      {
        name: "Mother Dairy Milk",
        price: 58,
        originalPrice: 65,
        description: "Fresh Toned Milk",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150"
      },
      {
        name: "Fresh Paneer",
        price: 240,
        originalPrice: 260,
        description: "500gm Fresh Paneer",
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a7b"
      },
      {
        name: "Butter",
        price: 120,
        originalPrice: 135,
        description: "Salted Butter",
        image: "https://images.unsplash.com/photo-1589985270958-b6dd0d7f1c18"
      },
      {
        name: "Curd",
        price: 45,
        originalPrice: 55,
        description: "Fresh Curd",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777"
      },
      {
        name: "Cheese",
        price: 180,
        originalPrice: 220,
        description: "Cheddar Cheese",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d"
      },
      {
        name: "Ghee",
        price: 650,
        originalPrice: 720,
        description: "Pure Desi Ghee",
        image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b94907"
      },
      {
        name: "Lassi",
        price: 30,
        originalPrice: 35,
        description: "Sweet Lassi",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
      },
      {
        name: "Buttermilk",
        price: 25,
        originalPrice: 30,
        description: "Fresh Buttermilk",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b"
      },
      {
        name: "Cream",
        price: 80,
        originalPrice: 95,
        description: "Fresh Dairy Cream",
        image: "https://images.unsplash.com/photo-1514996937319-344454492b37"
      }
    ]);

    res.json({
      success: true,
      message: "Products inserted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ================= ORDERS =================

// Get Orders
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Create Order
app.post("/api/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// ================= START =================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});