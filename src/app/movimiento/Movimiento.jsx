"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF(
    "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/logofonbiepol.glb"
  );

  return <primitive object={scene} scale={2} />;
}

function Movimiento() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: true,
        },
        x: () => window.innerHeight * -0.3,
        y: () => window.innerHeight * 1.4,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black overflow-hidden">
      
      {/* 🔥 CANVAS (FONDO) */}
      <div className="box absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] z-0">
        <Canvas
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "black",
          }}
        >
          {/* Luces */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 3, 3]} intensity={2} />

          {/* Modelo */}
          <Model />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={true}
            autoRotateSpeed={1.5}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* ESPACIO SCROLL */}
      <div className="h-[50vh]" />

      {/* 🔥 CONTENIDO ENCIMA */}
      <div className="h-screen flex items-end relative z-50 px-10 md:px-20 text-white">
        <div className="grid md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">

          {/* Espacio visual */}
          <div></div>

          {/* Contenido */}
          <div className="space-y-8 bg-black/30 backdrop-blur-md p-6 rounded-2xl">

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Potencia tu <span className="text-gray-400">marca digital</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Creamos experiencias web modernas, rápidas y visualmente impactantes
              que elevan tu negocio al siguiente nivel.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-700">
              <div>
                <p className="text-3xl font-bold">17+</p>
                <p className="text-sm text-gray-400">Países</p>
              </div>

              <div>
                <p className="text-3xl font-bold">120+</p>
                <p className="text-sm text-gray-400">Proyectos</p>
              </div>

              <div>
                <p className="text-3xl font-bold">5★</p>
                <p className="text-sm text-gray-400">Valoración</p>
              </div>
            </div>

            <button className="mt-6 bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Empezar proyecto
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Movimiento;