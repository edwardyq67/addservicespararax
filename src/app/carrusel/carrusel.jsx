"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import "swiper/css";

function Carrusel() {
  const slides = [
    {
      img: "https://pub-fb8ce31dbc6943a7b29fbbda76c4806f.r2.dev/imagenes%20carusel/Imagen1Web-v2.webp",
      text: "Visualiza tu SmartFrost",
      subtitle:
        "Controla y monitorea la temperatura actual de tus dispositivos desde cualquier lugar",
    },
    {
      img: "https://pub-fb8ce31dbc6943a7b29fbbda76c4806f.r2.dev/imagenes%20carusel/Imagen2Web-v2.webp",
      text: "Temperatura al instante",
      subtitle:
        "Recibe información en tiempo real sobre la temperatura de tus equipos",
    },
    {
      img: "https://pub-fb8ce31dbc6943a7b29fbbda76c4806f.r2.dev/imagenes%20carusel/Imagen3Web-v3.webp",
      text: "SmartFrost es tu aliado",
      subtitle:
        "Gestiona y asegura tus equipos con precisión y eficiencia",
    },
  ];

  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const ticking = useRef(false);

  const [displayText, setDisplayText] = useState(slides[0].text);
  const [displaySubtitle, setDisplaySubtitle] = useState(
    slides[0].subtitle
  );
  const [progressBar, setProgressBar] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 Animación texto suave
  const animateTextChange = (newText, setText) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let currentStep = 0;
    const totalSteps = 40;

    const interval = setInterval(() => {
      currentStep++;
      let randomText = "";

      for (let i = 0; i < newText.length; i++) {
        if (currentStep > totalSteps * (i / newText.length)) {
          randomText += newText[i];
        } else {
          randomText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setText(randomText);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setText(newText);
        setIsAnimating(false);
      }
    }, 20);
  };

  // 🔹 Scroll a slide
  const goToSlide = (index) => {
    let targetVH = index + 2;
    window.scrollTo({
      top: window.innerHeight * targetVH,
      behavior: "smooth",
    });
  };

  // 🔹 Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    const updateScroll = () => {
      if (!containerRef.current || !swiperRef.current?.swiper) {
        ticking.current = false;
        return;
      }

      const scrollTop = window.scrollY;
      const offsetTop = containerRef.current.offsetTop;
      const vh = window.innerHeight;
      const progress = scrollTop - offsetTop - 2 * vh;
      const swiper = swiperRef.current.swiper;

      if (progress < 0) {
        setProgressBar(0);
        setActiveIndex(0);

        if (currentIndexRef.current !== 0) {
          currentIndexRef.current = 0;
          swiper.slideTo(0, 800);
          animateTextChange(slides[0].text, setDisplayText);
          animateTextChange(slides[0].subtitle, setDisplaySubtitle);
        }

        ticking.current = false;
        return;
      }

      const total = vh * 2;
      const percent = Math.min(progress / total, 1);
      setProgressBar(percent);

      const section1 = vh * 0.6;
      const section2 = vh * 1.2;

      let section = 0;
      if (progress < section1) section = 0;
      else if (progress < section2) section = 1;
      else section = 2;

      if (section !== currentIndexRef.current) {
        currentIndexRef.current = section;
        setActiveIndex(section);
        swiper.slideTo(section, 800);
        animateTextChange(slides[section].text, setDisplayText);
        animateTextChange(slides[section].subtitle, setDisplaySubtitle);
      }

      ticking.current = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* NAV */}
      <div className="w-[92vw] sm:w-[90vw] flex justify-between items-center sm:items-end mb-6 sm:mb-8 flex-wrap gap-4">
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group cursor-pointer relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full
              ${
                activeIndex === index
                  ? "text-white bg-primary-600"
                  : "text-white/50 hover:bg-white/10"
              }`}
            >
              <span className="relative z-10">
                {index === 0 && "Explorar"}
                {index === 1 && "Descubrir"}
                {index === 2 && "Innovar"}
              </span>
              {activeIndex === index && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/5 blur-sm"></span>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-center w-full sm:w-auto">
          <span className="text-white/20 text-xs sm:text-sm">
            Teknisolution
          </span>

          <div className="w-28 sm:w-40 flex gap-2 h-[5px] sm:h-[6px] bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${progressBar * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* SWIPER */}
      <div className="relative w-[92vw] sm:w-[90vw] h-[55vh] sm:h-[65vh] md:h-[70vh]">
        <Swiper
          ref={swiperRef}
          effect={"creative"}
          creativeEffect={{
            prev: { translate: ["-30%", 0, -1], scale: 0.8 },
            next: { translate: ["100%", 0, 0], scale: 0.9 },
          }}
          modules={[EffectCreative]}
          slidesPerView={1}
          centeredSlides={true}
          allowTouchMove={false}
          speed={800}
          className="w-full h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={slide.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Esquinas */}
                <span className="m-2 absolute top-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-t border-l border-white/40 rounded-tl-md z-20"></span>
                <span className="m-2 absolute top-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-t border-r border-white/40 rounded-tr-md z-20"></span>
                <span className="m-2 absolute bottom-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-b border-l border-white/40 rounded-bl-md z-20"></span>
                <span className="m-2 absolute bottom-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-b border-r border-white/40 rounded-br-md z-20"></span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* TEXTO */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 w-[90%] sm:w-full z-30 flex flex-col items-start justify-end pb-6 sm:pb-16 pointer-events-none">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {displayText}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-6">
            {displaySubtitle}
          </p>
          <button className="pointer-events-auto px-6 sm:px-8 py-2 sm:py-3 bg-primary-500 text-sm sm:text-base cursor-pointer text-white rounded-full font-semibold hover:scale-105 transition-all duration-300">
            Discover More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrusel;