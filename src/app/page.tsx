"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleParallax from "simple-parallax-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Servicios from '@/app/servicios/Servicios';

// Registrar plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollFractionPorcentual,setScrollFraction]=useState(0)

useEffect(() => {
    const handleScroll = () => {
      // ✅ maxScroll se calcula CADA VEZ que hay scroll o resize
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const scrollFraction = scrollPosition / maxScroll

      setScrollFraction(+(scrollFraction * 100).toFixed(2))
    }

    // ✅ Misma función para ambos eventos
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    handleScroll() // Mostrar posición inicial

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
console.log(scrollFractionPorcentual)
  const videos = [
    { video: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/espacio.mp4", titulo: "edward" },
    { video: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/espacio.mp4", titulo: "INNOVATION" },
    { video: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/espacio.mp4", titulo: "FUTURE" }
  ];

  const animateTextChange = (newText) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let currentStep = 0;
    const totalSteps = 20;

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
      setDisplayText(randomText);
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDisplayText(newText);
        setIsAnimating(false);
      }
    }, 50);
  };

  useEffect(() => {
    animateTextChange(videos[currentIndex].titulo);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, videos.length]);

  return (
    <div className="relative font-sans overflow-x-hidden">
      {/* Video parallax */}
      <SimpleParallax scale={1.5} orientation="down" delay={0.5} transition="cubic-bezier(0,0,0,1)" overflow={true}>
        <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
          <div className="w-full h-full">
            <AnimatePresence mode="wait">
              {videos.map((video, index) => (
                index === currentIndex && (
                  <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src={video.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SimpleParallax>

      {/* Primera sección */}
      <section className="relative h-screen">
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <motion.h1 key={displayText} className="text-6xl md:text-8xl font-bold text-white text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)", fontFamily: "monospace" }}>
            {displayText || videos[currentIndex].titulo}
          </motion.h1>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {videos.map((_, index) => (
            <motion.div key={index} className={`h-1 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/30"}`} animate={{ width: index === currentIndex ? 40 : 10 }} transition={{ duration: 0.3 }} />
          ))}
        </div>
      </section>

      {/* Segunda sección */}
      <section className="relative h-screen z-10 flex items-center justify-center md:justify-end">
        <SimpleParallax scale={1.3} orientation="down" delay={0.4} transition="cubic-bezier(0,0,0,1)" overflow={true}>
          <div className="max-w-4xl mx-auto text-center md:text-right px-4 md:pr-16 lg:pr-32">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Physical AI platforms that move
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">industries forward</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto md:mx-0 md:ml-auto">
              Transformando industrias con inteligencia artificial física
            </p>
            <SimpleParallax scale={1.1} orientation="up" delay={0.2} transition="cubic-bezier(0,0,0,1)" overflow={true}>
              <div className="inline-block md:block">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "#contacto"}>
                  Descubre el futuro <span className="ml-2">→</span>
                </motion.button>
              </div>
            </SimpleParallax>
          </div>
        </SimpleParallax>
        <div className="absolute inset-0 pointer-events-none z-25" style={{ background: 'linear-gradient(180deg, transparent 70%, black 85%, black 100%)' }} />
      </section>
      <Servicios scrollFractionPorcentual={scrollFractionPorcentual}/>
       {/* Segunda sección */}
      <section className="relative h-screen z-10 flex items-center justify-center md:justify-end">
        <SimpleParallax scale={1.3} orientation="down" delay={0.4} transition="cubic-bezier(0,0,0,1)" overflow={true}>
          <div className="max-w-4xl mx-auto text-center md:text-right px-4 md:pr-16 lg:pr-32">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Physical AI platforms that move
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">industries forward</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto md:mx-0 md:ml-auto">
              Transformando industrias con inteligencia artificial física
            </p>
            <SimpleParallax scale={1.1} orientation="up" delay={0.2} transition="cubic-bezier(0,0,0,1)" overflow={true}>
              <div className="inline-block md:block">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "#contacto"}>
                  Descubre el futuro <span className="ml-2">→</span>
                </motion.button>
              </div>
            </SimpleParallax>
          </div>
        </SimpleParallax>
      
      </section>
    </div>
  );
}