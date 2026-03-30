"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";
import CanvasWrapper from "../Canvas";

gsap.registerPlugin(ScrollTrigger);

// 🔹 Modelo 3D
function Model() {
  const { scene } = useGLTF(
    "/Mundo6.gltf"
  );

  return (
    <Center>
      <primitive object={scene} scale={1.2} />
    </Center>
  );
}

function Movimiento() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !boxRef.current) return;

      const totalScroll =
        containerRef.current.offsetHeight - window.innerHeight;
      const isMobile = window.innerWidth < 768;

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
        .to(boxRef.current, {
          x: isMobile ? 0 : window.innerWidth * -0.25,
          y: totalScroll * 0.7,
          ease: "none",
        })
        .to(boxRef.current, {
          y: totalScroll,
          ease: "none",
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[250dvh] bg-gradient-to-b from-black via-[#050505] to-black overflow-hidden"
    >
<CanvasWrapper/>
      {/* 🔥 OVALO DE FONDO */}
      <div
        className="
          sticky 
          left-1/2 -translate-x-1/2 
          top-1/2 -translate-y-1/2
          w-[80vw] 
          h-[50vh]
          rounded-full
          blur-[10px]
          opacity-50
          z-0
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.25) 40%, transparent 70%)",
        }}
      />

      {/* 🔹 MODELO 3D */}
      <div
        ref={boxRef}
        className="
          absolute top-10 
          left-1/2 -translate-x-1/2 
          w-[280px] h-[280px] 
          sm:w-[360px] sm:h-[360px] 
          md:w-[500px] md:h-[500px]
          lg:w-[600px] lg:h-[600px]
          z-10
          opacity-90
          pointer-events-none
          will-change-transform
        "
      >
        <Canvas
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
          }}
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 3, 3]} intensity={2} />

          <Model />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* 🔹 SECCIÓN 1 */}
      <div className="h-[100dvh] flex items-center justify-center relative z-50 px-4 sm:px-6">
        <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Diseño + Tecnología
          </h3>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Creamos experiencias que convierten visitantes en clientes
            y marcas en referentes digitales.
          </p>
        </div>
      </div>

      {/* 🔹 SECCIÓN 2 */}
      <div className="h-[100dvh] flex items-center md:items-end relative z-50 px-4 sm:px-6 md:px-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-7xl mx-auto">
          
          <div className="hidden md:block"></div>

          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight tracking-tight">
              Potencia tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                marca digital
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Creamos experiencias web modernas, rápidas y visualmente impactantes
              que elevan tu negocio al siguiente nivel.
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 sm:pt-6">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">17+</p>
                <p className="text-xs sm:text-sm text-gray-500">Países</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">120+</p>
                <p className="text-xs sm:text-sm text-gray-500">Proyectos</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">5★</p>
                <p className="text-xs sm:text-sm text-gray-500">Valoración</p>
              </div>
            </div>

            <button className="mt-4 sm:mt-6 bg-white text-black px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-xl font-semibold hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-lg">
              Empezar proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movimiento;