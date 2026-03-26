"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import "swiper/css";

function Carrusel() {
  const slides = [
    { img: "https://assets.codepen.io/16327/portrait-image-1.jpg", text: "Confidence is the best outfit.", subtitle: "Embrace your unique style" },
    { img: "https://assets.codepen.io/16327/portrait-image-3.jpg", text: "Glow differently.", subtitle: "Radiate from within" },
    { img: "https://assets.codepen.io/16327/portrait-image-4.jpg", text: "Elegance is an attitude.", subtitle: "Timeless sophistication" },
    { img: "https://assets.codepen.io/16327/portrait-image-8.jpg", text: "Fearless. Limitless.", subtitle: "Break your own boundaries" },
    { img: "https://assets.codepen.io/16327/portrait-image-12.jpg", text: "Your vibe attracts your tribe.", subtitle: "Authentic connections" },
  ];

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      swiper.on("slideChange", () => {
        updateParallax(swiper);
      });

      // ejecutar una vez al inicio
      updateParallax(swiper);
    }
  }, []);

  const updateParallax = (swiper) => {
    swiper.slides.forEach((slide, index) => {
      const isActive = index === swiper.activeIndex;

      const image = slide.querySelector(".parallax-image");
      const title = slide.querySelector(".parallax-title");
      const subtitle = slide.querySelector(".parallax-subtitle");
      const button = slide.querySelector(".parallax-button");
      const overlay = slide.querySelector(".parallax-overlay");

      if (!image || !title || !subtitle) return;

      if (isActive) {
        image.style.transform = `translate3d(0, 0, 0) scale(1.1)`;
        image.style.opacity = 1;

        title.style.transform = `translate3d(0, 0, 0)`;
        title.style.opacity = 1;

        subtitle.style.transform = `translate3d(0, 0, 0)`;
        subtitle.style.opacity = 1;

        if (button) {
          button.style.transform = `translate3d(0, 0, 0)`;
          button.style.opacity = 1;
        }

        overlay.style.opacity = 0.3;
      } else {
        image.style.transform = `scale(0.85)`;
        image.style.opacity = 0.6;

        title.style.transform = `translate3d(0, 40px, 0)`;
        title.style.opacity = 0.5;

        subtitle.style.transform = `translate3d(0, 60px, 0)`;
        subtitle.style.opacity = 0.3;

        if (button) {
          button.style.transform = `translate3d(0, 70px, 0)`;
          button.style.opacity = 0;
        }

        overlay.style.opacity = 0.7;
      }
    });
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <Swiper
        ref={swiperRef}
        effect={"creative"}
        creativeEffect={{
          prev: {
            translate: ["-30%", 0, -1],
            scale: 0.8,
          },
          next: {
            translate: ["100%", 0, 0],
            scale: 0.9,
          },
        }}
        modules={[EffectCreative]}
        slidesPerView={1}
        centeredSlides={true}
        grabCursor={true}
        speed={700}
        className="w-[80vw] h-[70vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Overlay */}
              <div className="parallax-overlay absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 transition-all duration-500"></div>

              {/* Imagen centrada PERFECTA */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt=""
                  className="parallax-image w-full h-full object-cover object-center will-change-transform transition-all duration-700"
                />
              </div>

              {/* Contenido */}
              <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16 px-4 text-center">
                <h2 className="parallax-title text-4xl md:text-6xl font-bold text-white mb-4 will-change-transform">
                  {slide.text}
                </h2>

                <p className="parallax-subtitle text-lg md:text-2xl text-white/90 mb-6 will-change-transform">
                  {slide.subtitle}
                </p>

                <button className="parallax-button px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition will-change-transform">
                  Discover More
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carrusel;