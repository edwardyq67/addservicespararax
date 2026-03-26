"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Paralax() {
    const sectionRef = useRef(null);
    const fixedRef = useRef(null);
    const videoRef = useRef(null);

    const [displayText, setDisplayText] = useState("SmartFros ❄️");
    const [isAnimating, setIsAnimating] = useState(false);

    const textos = [
        "SmartFrost ❄️",
        "Control de temperatura en tiempo real",
        "Monitoreo inteligente 24/7",
        "Eficiencia energética garantizada"
    ];

    // 🔥 EFECTO SCRAMBLE
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
        }, 40);
    };

    // 🔥 SCROLL + FIXED CONTROL (SOLO PARA EL EFECTO PARALLAX)
    useEffect(() => {
        const ctx = gsap.context(() => {

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",

                onEnter: () => {
                    gsap.set(fixedRef.current, {
                        position: "fixed",
                        top: 0,
                        bottom: "auto"
                    });
                },

                onLeave: () => {
                    gsap.set(fixedRef.current, {
                        position: "absolute",
                        top: "auto",
                        bottom: 0
                    });
                },

                onEnterBack: () => {
                    gsap.set(fixedRef.current, {
                        position: "fixed",
                        top: 0,
                        bottom: "auto"
                    });
                },

                onLeaveBack: () => {
                    gsap.set(fixedRef.current, {
                        position: "absolute",
                        top: 0,
                        bottom: "auto"
                    });
                }
            });

            // ❌ ELIMINADO: Los ScrollTrigger que cambiaban el texto
            // Ahora solo el setInterval controla los cambios

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ✅ SOLO EL INTERVALO AUTOMÁTICO CAMBIA EL TEXTO
    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % textos.length;
            animateTextChange(textos[index]);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[200vh] bg-black">

            {/* 🎥 VIDEO */}
            <div ref={fixedRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="https://pub-fb8ce31dbc6943a7b29fbbda76c4806f.r2.dev/Inicio/VideoWeb.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[120%] object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 🧠 CONTENIDO ENCIMA */}
            <div className="relative z-10 flex flex-col items-center justify-end pb-10 h-screen text-white text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold">
                    {displayText}
                </h1>

                <p className="mt-6 text-lg opacity-80 max-w-xl">
                    Monitoreo inteligente de temperatura con tecnología de vanguardia
                </p>
            </div>

            <div className="max-w-[80vw] relative z-10 flex flex-col items-end justify-center h-screen text-white text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Tecnología IoT para cadena de frío
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                        control preciso en tiempo real
                    </span>
                </h2>
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