"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip);

function Galeria() {
    const galleryRef = useRef(null);
    const contentRef = useRef(null);
    const ctxRef = useRef(null);

    const [data, setData] = useState([]);

    // 🔥 FETCH DATA
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("/api/galeria");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error cargando galeria:", error);
            }
        };

        getData();
    }, []);

    // 🔥 GSAP
    useEffect(() => {
        const galleryElement = galleryRef.current;
        if (!galleryElement) return;

        const createTween = () => {
            const galleryItems = galleryElement.querySelectorAll(".gallery__item");

            if (ctxRef.current) ctxRef.current.revert();

            galleryElement.classList.remove("gallery--final");

            ctxRef.current = gsap.context(() => {
                galleryElement.classList.add("gallery--final");
                const state = Flip.getState(galleryItems);
                galleryElement.classList.remove("gallery--final");

                const flip = Flip.to(state, {
                    simple: true,
                    ease: "expoScale(1, 5)"
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: galleryElement,
                        start: "center center",
                        end: "+=150%",
                        scrub: true,
                        pin: galleryElement.parentNode
                    }
                });

                tl.add(flip);

                tl.fromTo(
                    contentRef.current,
                    { y: "100%" },
                    { y: "0%", ease: "none" },
                    ">0.2"
                );

                return () => gsap.set(galleryItems, { clearProps: "all" });
            }, galleryElement);
        };

        createTween();
        window.addEventListener("resize", createTween);

        return () => {
            if (ctxRef.current) ctxRef.current.revert();
            window.removeEventListener("resize", createTween);
        };
    }, []);

    return (
        <>
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* GRID */}
                <div
                    ref={galleryRef}
                    id="gallery-8"
                    className="
            gallery gallery--bento gallery--switch
            grid gap-[1vh]
            justify-center content-center
            [grid-template-columns:repeat(3,32.5vw)]
            [grid-template-rows:repeat(4,23vh)]
          "
                >
                    {[
                        "portrait-pattern-1.jpg",
                        "portrait-image-12.jpg",
                        "portrait-image-8.jpg",
                        "portrait-pattern-2.jpg",
                        "portrait-image-4.jpg",
                        "portrait-image-3.jpg",
                        "portrait-pattern-3.jpg",
                        "portrait-image-1.jpg"
                    ].map((img, i) => (
                        <div
                            key={i}
                            className="gallery__item relative w-full h-full overflow-hidden"
                            style={{
                                gridArea: [
                                    "1 / 1 / 3 / 2",
                                    "1 / 2 / 2 / 3",
                                    "2 / 2 / 4 / 3",
                                    "1 / 3 / 3 / 3",
                                    "3 / 1 / 3 / 2",
                                    "3 / 3 / 5 / 4",
                                    "4 / 1 / 5 / 2",
                                    "4 / 2 / 5 / 3"
                                ][i]
                            }}
                        >
                            <img
                                src={`https://assets.codepen.io/16327/${img}`}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* 🔥 CONTENIDO DINÁMICO - CORREGIDO */}
                <div
                    ref={contentRef}
                    className="
                        absolute bottom-0 left-0 w-full
                        z-20 h-[150vh] 
                        px-4 md:px-10 py-10 md:py-20
                        translate-y-full
                        overflow-y-auto
                    "
                >
                    {/* 🔥 TÍTULO */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                        Contenido dinámico
                    </h2>

                    {/* 🔥 GRID DE 2 COLUMNAS EN ZIGZAG */}
                    <div className="max-w-6xl mx-auto">
                        <div className="justify-center text-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-[100vh]">
                            <div>{data[0]}</div>
                            <div></div>
                            <div></div>
                            <div>{data[1]}</div>
                            <div>{data[2]}</div>
                            <div></div>
                            <div></div>
                            <div>{data[3]}</div>
                            <div>{data[4]}</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Galeria;