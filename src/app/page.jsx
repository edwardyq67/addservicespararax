"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "../components/Cursor";
import Movimiento from "./movimiento/Movimiento";
import Carrusel from "./carrusel/carrusel";
import Paralax from "./paralax/Paralax";
import Galeria from "./galeria/Galeria";
import Salida from "./salida/Salida";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div>
      <section>
        <Paralax/>
      </section>
       {/* Contenedor sticky para el carrusel */}
      <div className="relative" style={{ height: "300vh" }}> {/* Altura total para el scroll */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <Carrusel/>
        </div>
      </div>

      <section>
        <Movimiento />
      </section>

      <section>
        <Galeria/>
      </section>
      
      <section>
        <Salida/>
      </section>
    </div>
  );
}