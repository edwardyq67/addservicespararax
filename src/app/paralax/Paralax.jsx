"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Paralax() {
  const sectionRef = useRef(null);
  const fixedRef = useRef(null);

  const [displayText, setDisplayText] = useState("SmartFrost ❄️");
  const [isAnimating, setIsAnimating] = useState(false);

  const textos = [
    "SmartFrost ❄️",
    "Control de temperatura en tiempo real",
    "Monitoreo inteligente 24/7",
    "Eficiencia energética garantizada",
  ];

  // 🔥 SCRAMBLE OPTIMIZADO (más ligero en móvil)
  const animateTextChange = (newText) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const isMobile = window.innerWidth < 768;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let step = 0;

    const totalSteps = isMobile ? 10 : 16; // 🔥 menos carga en móvil

    const interval = setInterval(() => {
      step++;

      const progress = step / totalSteps;

      let randomText = newText
        .split("")
        .map((c, i) => {
          if (progress > i / newText.length) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(randomText);

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplayText(newText);
        setIsAnimating(false);
      }
    }, isMobile ? 20 : 30);

    return () => clearInterval(interval);
  };

  // 🔥 PARALLAX FIXED
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",

        onEnter: () => {
          gsap.set(fixedRef.current, { position: "fixed", top: 0 });
        },
        onLeave: () => {
          gsap.set(fixedRef.current, {
            position: "absolute",
            bottom: 0,
            top: "auto",
          });
        },
        onEnterBack: () => {
          gsap.set(fixedRef.current, { position: "fixed", top: 0 });
        },
        onLeaveBack: () => {
          gsap.set(fixedRef.current, {
            position: "absolute",
            top: 0,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔥 CAMBIO AUTOMÁTICO
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % textos.length;
      animateTextChange(textos[index]);
    }, 7000); // más dinámico

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200dvh] bg-black"
    >
      {/* 🎥 VIDEO */}
      <div
        ref={fixedRef}
        className="fixed top-0 left-0 w-full h-[100dvh] overflow-hidden"
      >
        <video
          src="https://pub-fb8ce31dbc6943a7b29fbbda76c4806f.r2.dev/Inicio/NuevoVideoWebSmartFrost.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🧠 TEXTO */}
      <div className="relative z-10 flex flex-col items-center justify-end pb-16 sm:pb-20 h-[100dvh] text-white text-center px-4 sm:px-6">
        <div className="relative inline-block max-w-[90vw]">
          
          <h1 className="
            text-2xl 
            sm:text-4xl 
            md:text-6xl 
            lg:text-7xl 
            font-bold 
            py-4 sm:py-6 
            px-4 sm:px-8 
            text-white 
            tracking-wide
          ">
            {displayText}
          </h1>

          {/* esquinas */}
          <span className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-t border-l border-primary rounded-tl-md"></span>
          <span className="absolute top-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-primary rounded-tr-md"></span>
          <span className="absolute bottom-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-primary rounded-bl-md"></span>
          <span className="absolute bottom-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-b border-r border-primary rounded-br-md"></span>
        </div>

        {/* scroll */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs sm:text-sm text-white/60 tracking-widest">
            SCROLL
          </span>

          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 🔥 SEGUNDA SECCIÓN */}
      <div className="z-50 relative max-w-[92vw] sm:max-w-[90vw] mx-auto z-10 flex flex-col items-center md:items-end justify-center h-[100dvh] text-white text-center md:text-end px-4 sm:px-6 md:px-12">
        <div className="text-center md:text-start">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary-500 mb-3 sm:mb-4">
            Bienvenido a SmartFrost
          </p>

          <h2 className="
            text-2xl 
            sm:text-3xl 
            md:text-5xl 
            font-bold 
            text-white 
            mb-4 sm:mb-6 
            leading-tight
          ">
            Tecnología IoT para cadena de frío
            <span className="block text-primary-500">
              control preciso en tiempo real
            </span>
          </h2>

          <button className="bg-primary-500 hover:bg-primary-600 px-6 sm:px-8 py-2 sm:py-3 mt-4 rounded-full transition-all duration-300">
            <span className="text-white text-sm sm:text-base font-medium">
              About Us
            </span>
          </button>
        </div>
      </div>

      {/* fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-[25vh] sm:h-[100vh] pointer-events-none z-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, black 100%)",
        }}
      />
    </section>
  );
}

export default Paralax;