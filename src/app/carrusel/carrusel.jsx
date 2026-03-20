"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://assets.codepen.io/16327/portrait-image-1.jpg",
  "https://assets.codepen.io/16327/portrait-image-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-5.jpg",
  "https://assets.codepen.io/16327/portrait-image-6.jpg",
  "https://assets.codepen.io/16327/portrait-image-7.jpg",
  "https://assets.codepen.io/16327/portrait-image-8.jpg",
];

function Carrusel() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = stripRef.current;

      let pinWrapWidth = pinWrap.scrollWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;

      const refresh = () => {
        pinWrapWidth = pinWrap.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      };

      gsap.to(pinWrap, {
        x: () => -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          scrub: true,
          pin: sectionRef.current,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100vh] bg-black overflow-hidden">
      
      <div className="w-full h-full flex items-center">
        
        <div
          ref={stripRef}
          className="flex gap-10 px-10"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[400px] h-[500px] overflow-hidden rounded-2xl"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Carrusel;