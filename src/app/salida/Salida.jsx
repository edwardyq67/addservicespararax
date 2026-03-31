"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carrusel from "./carrusel";

gsap.registerPlugin(ScrollTrigger);

function Salida() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        scale: 0.7, // 🔥 se aleja
        y: "-10%",  // opcional: sensación de profundidad
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true, // 🔥 te mantiene dentro de la imagen
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-white">

      {/* IMAGEN */}
      <div className="w-full h-screen overflow-hidden">
        <img
          ref={imgRef}
          src="https://assets.codepen.io/16327/portrait-image-4.jpg"
          alt=""
          className="w-full rounded-lg h-full object-cover"
        />
      </div>

      {/* CONTENIDO DESPUÉS */}
      <div className="h-screen flex flex-col items-center justify-center relative">

        {/* TEXTO CON ESQUINAS */}
        <div className="relative inline-block p-10 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl">
          <h2 className="text-4xl font-bold text-gray-900 relative z-10">
            Ya saliste de la imagen 👀
          </h2>

          {/* Esquinas */}
          <span className="absolute top-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-t border-l border-gray-900 rounded-tl-md z-20"></span>
          <span className="absolute top-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-t border-r border-gray-900 rounded-tr-md z-20"></span>
          <span className="absolute bottom-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-b border-l border-gray-900 rounded-bl-md z-20"></span>
          <span className="absolute bottom-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-b border-r border-gray-900 rounded-br-md z-20"></span>
        </div>
<Carrusel/>
      </div>

    </section>
  );
}

export default Salida;