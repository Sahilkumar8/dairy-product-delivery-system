const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  {
    name: "Full Cream Milk 1L",
    brand: "Amul",
    category: "Milk",
    price: 66,
    originalPrice: 70,
    description: "Rich and creamy full cream milk, pasteurized fresh daily.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",
    rating: 4.5,
    stock: 100,
  },
  {
    name: "Salted Butter 500g",
    brand: "Amul",
    category: "Butter",
    price: 245,
    originalPrice: 270,
    description: "Creamy salted butter made from fresh cream.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500",
    rating: 4.6,
    stock: 60,
  },
  {
    name: "Fresh Paneer 200g",
    brand: "Mother Dairy",
    category: "Paneer",
    price: 90,
    originalPrice: 100,
    description: "Soft and fresh paneer, high in protein.",
    image: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=500",
    rating: 4.3,
    stock: 40,
  },
  {
    name: "Processed Cheese Slices",
    brand: "Britannia",
    category: "Cheese",
    price: 120,
    originalPrice: 140,
    description: "Perfectly melting cheese slices for sandwiches and burgers.",
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500",
    rating: 4.4,
    stock: 55,
  },
  {
    name: "Thick Curd 400g",
    brand: "Mother Dairy",
    category: "Curd",
    price: 45,
    originalPrice: 50,
    description: "Thick, creamy curd set the traditional way.",
    image: "https://images.unsplash.com/photo-1571212515416-fca988083b70?w=500",
    rating: 4.2,
    stock: 80,
  },
  {
    name: "Pure Cow Ghee 500ml",
    brand: "Patanjali",
    category: "Ghee",
    price: 320,
    originalPrice: 350,
    description: "Traditionally prepared pure cow ghee, rich aroma.",
    image: "https://images.unsplash.com/photo-1631206723958-b0b39d5f0e3e?w=500",
    rating: 4.7,
    stock: 45,
  },
  {
    name: "Vanilla Ice Cream 1L",
    brand: "Amul",
    category: "Ice Cream",
    price: 180,
    originalPrice: 200,
    description: "Classic creamy vanilla ice cream tub.",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500",
    rating: 4.6,
    stock: 35,
  },
  {
    name: "Greek Yogurt 200g",
    brand: "Epigamia",
    category: "Yogurt",
    price: 65,
    originalPrice: 75,
    description: "High-protein Greek yogurt, thick and creamy.",
    image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=500",
    rating: 4.5,
    stock: 50,
  },
  {
    name: "Sweet Lassi 500ml",
    brand: "Amul",
    category: "Lassi",
    price: 40,
    originalPrice: 45,
    description: "Refreshing sweet lassi made from fresh curd.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500",
    rating: 4.3,
    stock: 60,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Sample dairy products inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDB();