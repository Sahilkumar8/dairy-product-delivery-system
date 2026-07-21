import React, { useState, useEffect } from "react";
import "./Carousel.css";

// Add your own images to src/assets/images and update this array
const slides = [
  {
    image: "/src/assets/images/slide1.jpg",
    title: "Fresh Milk Everyday",
    subtitle: "Delivered before 7 AM, straight from the farm",
  },
  {
    image: "/src/assets/images/slide2.jpg",
    title: "Pure Ghee & Paneer",
    subtitle: "Made the traditional way, no preservatives",
  },
  {
    image: "/src/assets/images/slide3.jpg",
    title: "Flat 20% Off",
    subtitle: "On your first order this week",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Move to a specific slide (used by dots)
  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Move to previous slide
  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Move to next slide
  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="carousel">
      <div className="carousel-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === current ? "carousel-slide active" : "carousel-slide"}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="carousel-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button className="carousel-arrow arrow-left" onClick={goToPrev} aria-label="Previous slide">
        ‹
      </button>
      <button className="carousel-arrow arrow-right" onClick={goToNext} aria-label="Next slide">
        ›
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Carousel;