"use client";

import { useState, useEffect } from "react";

const images = [{
  src: "/svg/bin-saeed-exclusive-collection-vol-1.svg",
  href:"/brands/bin-saeed-collections"
}];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center">
      {/* Carousel wrapper */}
      <div className="relative h-56 md:h-96 w-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <a
          href={image?.href}
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image?.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 px-3 py-1 rounded-full bg-gray-800 text-white"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 px-3 py-1 rounded-full bg-gray-800 text-white"
      >
        ❯
      </button>
    </div>
  );
}
