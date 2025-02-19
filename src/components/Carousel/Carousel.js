"use client";

import { useState, useEffect } from "react";

const images = [
  {
    src: "/svg/bin-saeed-exclusive-collection-vol-1.svg",
    href: "/brands/bin-saeed-collections",
  },
  {
    src: "/svg/mehroon-catalogue.svg",
    href: "/brands/mehroon-lawn-by-tawakkal",
  },
  {
    src: "/svg/sejal-unstitched-collection.svg",
    href: "/brands/sejal-unstitched-collection",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
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
            href={index === currentIndex ? image.href : "#"}
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
    </div>
  );
}
