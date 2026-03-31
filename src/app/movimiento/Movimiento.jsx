"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasWrapper from "../Canvas";

gsap.registerPlugin(ScrollTrigger);

/* -------------------- PLANETA -------------------- */
function Planet() {
  const groupRef = useRef();
  const dragging = useRef(false);
  const previousMouse = useRef([0, 0]);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
    );
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: texture },
        color: { value: new THREE.Color(0x43c4f5) },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;

        void main(){
          vec4 texColor = texture2D(baseTexture,vUv);
          float scanline = sin(vUv.y * 50.0 - time * 5.0) * 0.15;
          vec3 finalColor = color * texColor.r * (2.0 + scanline);
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          gl_FragColor = vec4(finalColor * pulse, texColor.r);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, [texture]);

  useFrame(() => {
    shaderMaterial.uniforms.time.value += 0.01;

    // Rotación automática ligera si no se arrastra
    if (!dragging.current && groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Eventos de mouse para drag
  const onPointerDown = (e) => {
    dragging.current = true;
    previousMouse.current = [e.clientX, e.clientY];
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onPointerMove = (e) => {
    if (!dragging.current || !groupRef.current) return;

    const deltaX = e.clientX - previousMouse.current[0];
    const deltaY = e.clientY - previousMouse.current[1];

    // Ajusta la sensibilidad
    const rotationSpeed = 0.005;

    groupRef.current.rotation.y += deltaX * rotationSpeed;
    groupRef.current.rotation.x += deltaY * rotationSpeed;

    previousMouse.current = [e.clientX, e.clientY];
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerUp} // Soltar si el mouse sale
    >
      <mesh material={shaderMaterial}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      <mesh scale={0.9}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#021421"   // color sólido oscuro
          transparent
          opacity={1}       // totalmente opaco
        />
      </mesh>
    </group>
  );
}

/* -------------------- ESTRELLAS -------------------- */
function StarsBackground() {
  const starsRef = useRef();
  const starsCount = 5000; // Muchas estrellas
  const positions = useMemo(() => {
    const pos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 400;   // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 400; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400; // Z
    }
    return pos;
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starsCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.2} transparent opacity={0.7} />
    </points>
  );
}

/* -------------------- COMPONENTE PRINCIPAL -------------------- */
function Movimiento() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !boxRef.current) return;

      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(boxRef.current, {
        x: isMobile ? 0 : window.innerWidth * -0.25,
        y: totalScroll,
        force3D: true,
      });

      /* animación sección 1 */
      gsap.from(section1Ref.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 80%",
        },
      });

      /* animación sección 2 */
      gsap.from(section2Ref.current, {
        opacity: 0,
        y: 120,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[250dvh] bg-black overflow-hidden"
    >
      <CanvasWrapper />
      {/* ----------------- CANVAS DE FONDO ----------------- */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      >
        <StarsBackground />
      </Canvas>

      {/* ----------------- PLANETA ----------------- */}
      <div
        ref={boxRef}
        className="
          absolute top-50 
          left-1/2 -translate-x-1/2 
          w-[280px] h-[280px] 
          sm:w-[360px] sm:h-[360px] 
          md:w-[500px] md:h-[500px]
          lg:w-[600px] lg:h-[600px]
          z-50
          opacity-90
          pointer-events-auto
        "
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 3, 3]} intensity={2} />
          <Planet />
        </Canvas>
      </div>

      {/* ----------------- SECCIÓN 1 ----------------- */}
      <div
        ref={section1Ref}
        className="h-[100dvh] flex items-center justify-center relative z-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Diseño + Tecnología
          </h3>
          <p className="text-gray-400 md:text-lg">
            Creamos experiencias que convierten visitantes en clientes
            y marcas en referentes digitales.
          </p>
        </div>
      </div>

      {/* ----------------- SECCIÓN 2 ----------------- */}
      <div
        ref={section2Ref}
        className="h-[100dvh] flex items-end relative z-20 px-6 md:px-20 text-white"
      >
        <div className="grid md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">
          <div></div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-7xl font-bold leading-tight">
              Potencia tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                marca digital
              </span>
            </h2>

            <p className="text-gray-400 md:text-xl max-w-xl">
              Creamos experiencias web modernas, rápidas y visualmente impactantes
              que elevan tu negocio al siguiente nivel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movimiento;