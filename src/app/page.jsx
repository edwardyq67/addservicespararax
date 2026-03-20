"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "../components/Cursor";
import Movimiento from "./movimiento/Movimiento";
import Carrusel from "./carrusel/carrusel";
import Paralax from "./paralax/Paralax";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {


  return (
    <div className=" text-white">
      <section >
        <Paralax/>
      </section>
      <section >
        <Carrusel/>
      </section>

      <section>
        <Movimiento />
      </section>

      <section className="h-[100vh]">
        hola
      </section>
    </div>
  );
}