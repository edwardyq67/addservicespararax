"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";

function Carrusel() {
  const slides = [
    {
      img: "/PrimerProducto.webp",
      text: "Visualiza tu SmartFrost",
      subtitle:
        "Controla y monitorea la temperatura actual de tus dispositivos desde cualquier lugar",
    },
    {
      img: "/SegundoProducto.webp",
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
  const progressInterval = useRef(null);

  const [displayText, setDisplayText] = useState(slides[0].text);
  const [displaySubtitle, setDisplaySubtitle] = useState(slides[0].subtitle);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressBar, setProgressBar] = useState(0);

  const slideDelay = 4000; // mismo que autoplay.delay

  // 🔹 Animación texto suave
  const animateTextChange = (newText, setText) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  // 🔹 Actualiza texto al cambiar de slide
  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;
    setActiveIndex(index);
    animateTextChange(slides[index].text, setDisplayText);
    animateTextChange(slides[index].subtitle, setDisplaySubtitle);
    setProgressBar(0);
  };

  // 🔹 Barra de progreso automática
  useEffect(() => {
    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgressBar((prev) => {
        if (prev >= 1) return 0;
        return prev + 0.02; // incrementa suavemente
      });
    }, slideDelay / 50); // divide el delay en pasos
    return () => clearInterval(progressInterval.current);
  }, [activeIndex]);

  // 🔹 Navegación por botones
  const goToSlide = (index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(index); // loop infinito
    }
  };

  const prevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const nextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <div className="w-full min-h-[100dvh] bg-white flex flex-col items-center justify-center overflow-hidden">

      {/* NAV */}
      <div className="w-[92vw] sm:w-[90vw] flex justify-between items-center mb-6 sm:mb-8 flex-wrap gap-4">
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full
                ${activeIndex === index
                  ? "text-white bg-primary-600"
                  : "text-black hover:bg-white/10"
                }`}
            >
              {index === 0 && "Explorar"}
              {index === 1 && "Descubrir"}
              {index === 2 && "Innovar"}
            </button>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="flex gap-2 items-center justify-center w-full sm:w-auto">
          <span className="text-gray-50/40 text-xs sm:text-sm">Progreso</span>
          <div className="w-28 sm:w-40 h-[5px] sm:h-[6px] bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-100"
              style={{ width: `${progressBar * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* SWIPER */}
      <div className="relative w-[92vw] sm:w-[90vw] h-[55vh] sm:h-[65vh] md:h-[70vh]">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectCreative]}
          effect={"creative"}
          creativeEffect={{
            prev: { translate: ["-30%", 0, -1], scale: 0.8 },
            next: { translate: ["100%", 0, 0], scale: 0.9 },
          }}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: slideDelay,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          allowTouchMove={true}
          speed={800}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">

                {/* Imagen con efecto de escala al hover */}
                <img
                  src={slide.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
                />

                {/* Gradiente mejorado - más sutil y dinámico */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                {/* Overlay con efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white/0 transition-all duration-500 z-10"></div>

                {/* Esquinas decorativas mejoradas */}
                <span className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/60 rounded-tl-lg z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></span>
                <span className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/60 rounded-tr-lg z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></span>
                <span className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/60 rounded-bl-lg z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></span>
                <span className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/60 rounded-br-lg z-20 transition-all duration-300 group-hover:w-12 group-hover:h-12"></span>

                {/* CARD TEXTO - Diseño moderno */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 md:p-10">


                  {/* Título con animación */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight transform transition-all duration-500 group-hover:translate-x-2">
                    {activeIndex === i ? displayText : slide.text}
                      <div className="w-16 h-1 bg-primary-500 rounded-full mb-2 transition-all duration-500 group-hover:w-24"></div>

                  </h2>

                  {/* Subtítulo con diseño mejorado */}
                  <p className="text-sm sm:text-base text-white/80 max-w-lg mb-6 transform transition-all duration-500 delay-75 group-hover:translate-x-2">
                    {activeIndex === i ? displaySubtitle : slide.subtitle}
                  </p>

                  {/* Botón de acción (opcional) */}
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <span>Ver proyecto</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                </div>


              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones personalizados */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-auto z-30">
          <button
            onClick={prevSlide}
            className="bg-white/80 cursor-pointer hover:bg-white/100 text-black p-3 rounded-full shadow-lg transition"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/80 cursor-pointer hover:bg-white/100 text-black p-3 rounded-full shadow-lg transition"
          >
            ▶
          </button>
        </div>


      </div>
    </div>
  );
}

export default Carrusel;