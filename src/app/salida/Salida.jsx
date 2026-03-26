"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section ref={sectionRef} className="relative h-[200vh] bg-black">

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
      <div className="h-screen flex items-center justify-center text-white">
        <h2 className="text-4xl">Ya saliste de la imagen 👀</h2>
      </div>

    </section>
  );
}

export default Salida;