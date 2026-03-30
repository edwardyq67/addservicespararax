"use client";

import { useEffect, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carrusel from "./carrusel/carrusel";
import Paralax from "./paralax/Paralax";
import Galeria from "./galeria/Galeria";
import Salida from "./salida/Salida";
import Loader from "../components/loader/Loader";

import { Canvas as R3fCanvas } from '@react-three/fiber';

import Canvas from "./Canvas";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [permiso, setPermiso] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {/* ✅ LOADER SE MUESTRA MIENTRAS NO HAY PERMISO */}
      {!permiso && (
        <Loader isLoading={isLoading} setPermiso={setPermiso} />
      )}

      {/* ✅ CONTENIDO SOLO CUANDO YA TERMINÓ */}
      {permiso && (
        <div>

          <section>
            <Paralax />
          </section>

          {/* Carrusel sticky */}
          <section className="relative" style={{ height: "300vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">
              <Carrusel />
            </div>
          </section>
          <section className="h-[250vh] ">
            <Canvas />
          </section>

          <section>
            <Galeria />
          </section>

          <section>
            <Salida />
          </section>
        </div>
      )}
    </>
  );
}