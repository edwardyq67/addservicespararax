"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Paralax() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 🎥 PARALLAX DEL VIDEO
            gsap.to(videoRef.current, {
                y: "-20%", // mueve el video hacia arriba al hacer scroll
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[200vh] bg-black">

            {/* 🎥 VIDEO */}
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/espacio.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[120%] object-cover"
                />

                {/* 🌑 OVERLAY */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 🧠 CONTENIDO ENCIMA */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold">
                    Parallax con GSAP 🚀
                </h1>
                <p className="mt-6 text-lg opacity-80 max-w-xl">
                    Scroll para ver el efecto parallax suave y profesional.
                </p>
            </div>
            <div className="relative z-10 flex flex-col items-end justify-center h-screen text-white text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Physical AI platforms that move
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">industries forward</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto md:mx-0 md:ml-auto">
                    Transformando industrias con inteligencia artificial física
                </p>
                <div className="inline-block md:block">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "#contacto"}>
                        Descubre el futuro <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
            {/* 📦 MÁS CONTENIDO PARA SCROLL */}
            <div className="h-screen flex items-center justify-center text-white">
                <h2 className="text-4xl">Sigue bajando...</h2>
            </div>
<div
  className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none z-25"
  style={{
    background: "linear-gradient(180deg, transparent 0%, black 100%)",
  }}
/>
        </section>
    );
}

export default Paralax;