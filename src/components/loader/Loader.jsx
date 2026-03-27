"use client";

import { useEffect, useState } from "react";

export default function Loader({ isLoading, setPermiso }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    const updateProgress = () => {
      setProgress((prev) => {
        // 🔥 FASE 1: subir hasta 80% (más rápido)
        if (prev < 80) {
          return Math.min(prev + 3, 80);
        }

        // 🔥 FASE 2: quedarse en 80 mientras isLoading es true
        if (isLoading) {
          return 80;
        }

        // 🔥 FASE 3: cuando isLoading es false, completar hasta 100% (más rápido)
        if (prev < 100) {
          return Math.min(prev + 5, 100);
        }

        return 100;
      });
    };

    interval = setInterval(updateProgress, 20);
    return () => clearInterval(interval);
  }, [isLoading]);

  // 🔥 CUANDO TERMINA → MOSTRAR WEB
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setPermiso(true);
      }, 300);
    }
  }, [progress, setPermiso]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-4">
      {/* TEXTO */}
      <div className="relative mb-6 sm:mb-8">
        <h1
          data-text="SMARTFROST"
          className="loader-text text-white/20 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest relative whitespace-nowrap"
        >
          SMARTFROST
        </h1>
      </div>

      {/* BARRA */}
      <div className="w-48 sm:w-56 md:w-64 lg:w-80 h-[2px] bg-white/20 rounded-full overflow-hidden mt-6 sm:mt-8">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* PORCENTAJE OPCIONAL */}
      <p className="text-white/40 text-xs sm:text-sm mt-3 sm:mt-4 font-mono">
        {Math.round(progress)}%
      </p>

      {/* EFECTO TEXTO */}
      <style jsx>{`
        .loader-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          overflow: hidden;
          white-space: nowrap;
          width: ${progress}%;
          transition: width 0.15s linear;
        }
        
        /* Ajuste para móviles muy pequeños */
        @media (max-width: 480px) {
          .loader-text {
            font-size: 1.25rem;
            letter-spacing: 0.2em;
          }
        }
      `}</style>
    </div>
  );
}