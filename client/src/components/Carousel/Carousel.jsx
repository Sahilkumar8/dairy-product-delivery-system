import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200",
    badge: "🥛 100% Fresh & Pure",
    title: "Farm Fresh Milk, Delivered Daily",
    subtitle: "Straight from trusted farms to your doorstep every morning",
    cta: "Shop Milk",
  },
  {
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200",
    badge: "🧀 Handcrafted Quality",
    title: "Pure Paneer & Cheese",
    subtitle: "Made fresh daily with no preservatives added",
    cta: "Explore Now",
  },
  {
    image: "https://images.unsplash.com/photo-1631206723958-b0b39d5f0e3e?w=1200",
    badge: "🫙 Traditional Recipe",
    title: "Golden Pure Cow Ghee",
    subtitle: "Rich aroma, traditionally prepared for authentic taste",
    cta: "Shop Ghee",
  },
  {
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1200",
    badge: "🍦 Limited Time Offer",
    title: "Flat 20% Off Ice Creams",
    subtitle: "Cool down this season with our creamy delights",
    cta: "Grab The Deal",
  },
  {
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200",
    badge: "🌱 100% Organic",
    title: "Organic Dairy Collection",
    subtitle: "Certified organic products for a healthier lifestyle",
    cta: "Go Organic",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrent(index);
  const goToPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="hero-carousel">
      <div className="hero-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === current ? "hero-slide active" : "hero-slide"}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="hero-slide-overlay">
              <div className="hero-slide-content">
                <span className="hero-slide-badge">{slide.badge}</span>
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="hero-slide-btn">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow hero-arrow-left" onClick={goToPrev} aria-label="Previous">
        ‹
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={goToNext} aria-label="Next">
        ›
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "hero-dot active" : "hero-dot"}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Carousel;