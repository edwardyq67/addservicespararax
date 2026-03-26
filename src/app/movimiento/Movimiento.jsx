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

    const totalScroll = () =>
      containerRef.current.offsetHeight - window.innerHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      }
    });

    // 🔥 FASE 1 (0 → 70%)
    tl.to(".box", {
      x: () => window.innerHeight * -0.4,
      y: () => totalScroll() * 0.7, // 👈 proporcional real
      ease: "none",
      duration: 0.6,
    });

    // 🔥 FASE 2 (70% → 100%)
    tl.to(".box", {
      y: () => totalScroll() + 200,
      ease: "none",
      duration: 0.4,
    });

  }, containerRef);

  return () => ctx.revert();
}, []);
return (
  <div ref={containerRef} className="relative h-[250vh] bg-gradient-to-b from-black via-[#050505] to-black overflow-hidden">

    {/* 🔥 MODELO */}
    <div className="box absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] z-0 opacity-90">
      <Canvas
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={2} />

        <Model />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>

    {/* 🔥 SECCIÓN 1: CARD CENTRADO */}
    <div className="h-screen flex items-center justify-center relative z-50 px-6">
      
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">

        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Diseño + Tecnología
        </h3>

        <p className="text-gray-400 text-lg leading-relaxed">
          Creamos experiencias que convierten visitantes en clientes
          y marcas en referentes digitales.
        </p>

      </div>

    </div>

    {/* 🔥 SECCIÓN 2: CONTENIDO LATERAL */}
    <div className="h-screen flex items-end relative z-50 px-6 md:px-20 text-white">
      <div className="grid md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">

        {/* espacio para el modelo */}
        <div></div>

        {/* contenido derecha */}
        <div className="space-y-8">

          <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Potencia tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              marca digital
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
            Creamos experiencias web modernas, rápidas y visualmente impactantes
            que elevan tu negocio al siguiente nivel.
          </p>

          {/* stats */}
          <div className="grid grid-cols-3 gap-8 pt-6">
            <div>
              <p className="text-3xl font-bold">17+</p>
              <p className="text-sm text-gray-500">Países</p>
            </div>

            <div>
              <p className="text-3xl font-bold">120+</p>
              <p className="text-sm text-gray-500">Proyectos</p>
            </div>

            <div>
              <p className="text-3xl font-bold">5★</p>
              <p className="text-sm text-gray-500">Valoración</p>
            </div>
          </div>

          <button className="mt-6 bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-lg">
            Empezar proyecto
          </button>

        </div>
      </div>
    </div>

  </div>
);
}

export default Movimiento;