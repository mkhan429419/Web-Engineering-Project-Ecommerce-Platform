import React, { useState, useEffect } from "react";
import picture1 from "../assets/sc/17.png";
import picture2 from "../assets/sc/18.png";
import picture3 from "../assets/sc/19.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [picture1, picture2, picture3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="flex bg-[var(--Light)] flex-col sm:flex-row p-4">
      <div className="w-full relative">
        <div className="w-full h-[650px] overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            data-testid="indicators"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full snap-center"
              >
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[var(--LightBrown)] text-white p-2 rounded-full"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[var(--LightBrown)] text-white p-2 rounded-full"
        >
          &rarr;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentSlide === index
                  ? "bg-[var(--Yellow)]"
                  : "bg-[var(--LightBrown)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
