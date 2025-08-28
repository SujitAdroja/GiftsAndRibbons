"use client";

import { useEffect, useState } from "react";

export default function HeroStackedCarousel() {
  const images = [
    "https://res.cloudinary.com/dhj8vvasn/image/upload/v1754766381/rakhi_gift_hamper_wibdyj.webp",
    "https://res.cloudinary.com/dhj8vvasn/image/upload/v1754766380/rakhi_giftbox_od7qws.webp",
    "https://res.cloudinary.com/dhj8vvasn/image/upload/v1754766377/contact_lcdqis.webp",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // change image every 3s

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="flex-1   mt-8 md:mt-0 md:ml-8 relative overflow-hidden h-[350px]">
      {images.map((img, index) => {
        let position = "translate-x-34 opacity-10 scale-90"; // hidden
        if (index === currentIndex) {
          position = "translate-x-0 opacity-100 scale-100 z-20";
        } else if (index === (currentIndex + 1) % images.length) {
          position = "translate-x-16 opacity-700 scale-95 z-10";
        }

        return (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-1/2 mx-auto h-full object-fill rounded-lg shadow-lg transition-all duration-700 ease-in-out ${position}`}
          />
        );
      })}
      {/* Prev Button */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-700 z-30"
      >
        ❮
      </button> */}

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute hidden sm:block top-1/2 right-2 sm:-translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-700 z-30"
      >
        ❯
      </button>
    </div>
  );
}
