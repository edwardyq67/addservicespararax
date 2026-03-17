"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import SimpleParallax from "simple-parallax-js";

export default function Servicios({ scrollFractionPorcentual }) {
    const containerRef = useRef(null)
    const [itemWidth, setItemWidth] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    useEffect(() => {
        console.log("Scroll global:", scrollFractionPorcentual)
    }, [scrollFractionPorcentual])

    const imagenes = [
        {
            id: 1,
            imagen: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/Log%C3%ADsticayAlmac%C3%A9n.webp",
            titulo: "Logística y Almacén",
            descripcion: "Automatización inteligente para cadenas de suministro",
            color: "#ff0088"
        },
        {
            id: 2,
            imagen: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/SectorSalud.webp",
            titulo: "Sector Salud",
            descripcion: "IA aplicada a diagnósticos y gestión hospitalaria",
            color: "#00aaff"
        },
        {
            id: 3,
            imagen: "https://pub-7b894b68dd0d42b9ab25116919a8f951.r2.dev/ServiciosProfesionales.webp",
            titulo: "Servicios Profesionales",
            descripcion: "Soluciones personalizadas para tu negocio",
            color: "#aa44ff"
        }
    ]

    const GAP = 30

    // Obtener el ancho de la ventana solo en el cliente
    useEffect(() => {
        setItemWidth(window.innerWidth * 0.9)

        const handleResize = () => {
            setItemWidth(window.innerWidth * 0.9)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Calcular distancia total a recorrer
    const totalDistance = itemWidth ? (imagenes.length - 1) * (itemWidth + GAP) : 0
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    // Determinar la clase CSS basada en scrollFractionPorcentual
    const getPositionClass = () => {
        if (scrollFractionPorcentual <= 41) {
            return "relative flex justify-start"
        } else if (scrollFractionPorcentual > 41 && scrollFractionPorcentual <= 100) {
            return "fixed inset-0 flex justify-center items-center"
        } else {
            return "hidden"
        }
    }

    // Determinar si mostrar la segunda sección
    const showSecondSection = scrollFractionPorcentual > 84

    return (
        <div className="relative bg-black min-h-screen overflow-x-hidden">
            {/* Contenedor del carrusel */}
            <div ref={containerRef} className="relative h-[400vh]">
                <div className={`${getPositionClass()} top-0 w-full h-screen`}>
                    <motion.div
                        className="flex will-change-transform px-4"
                        style={{ x }}
                    >
                        {imagenes.map((item) => (
                            <div key={item.id} className="w-screen h-screen flex items-center justify-center">
                                <div
                                    className="flex-shrink-0 w-[90vw] h-[80vh] rounded-xl relative overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.imagen})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {/* Overlay sutil */}
                                    <div className="absolute inset-0 bg-black/20" />
                                    
                                    {/* Contenido */}
                                    <div className="absolute bottom-8 left-8 z-10">
                                        <span
                                            className="text-sm font-mono block mb-2"
                                            style={{ color: item.color }}
                                        >
                                            0{item.id}
                                        </span>
                                        <h2 className="text-4xl font-bold text-white mb-2">
                                            {item.titulo}
                                        </h2>
                                        <p className="text-white/80 text-lg max-w-[400px]">
                                            {item.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Segunda sección - AHORA FUERA del contenedor del carrusel */}
            {showSecondSection && (
                <section className="relative h-screen z-10 flex items-center justify-center md:justify-end bg-black">
                    <SimpleParallax scale={1.3} orientation="down" delay={0.4} transition="cubic-bezier(0,0,0,1)" overflow={true}>
                        <div className="max-w-4xl mx-auto text-center md:text-right px-4 md:pr-16 lg:pr-32">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Physical AI platforms that move
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">industries forward</span>
                            </h2>
                            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto md:mx-0 md:ml-auto">
                                Transformando industrias con inteligencia artificial física
                            </p>
                            <SimpleParallax scale={1.1} orientation="up" delay={0.2} transition="cubic-bezier(0,0,0,1)" overflow={true}>
                                <div className="inline-block md:block">
                                    <motion.button 
                                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300" 
                                        whileHover={{ scale: 1.1 }} 
                                        whileTap={{ scale: 0.95 }} 
                                        onClick={() => window.location.href = "#contacto"}
                                    >
                                        Descubre el futuro <span className="ml-2">→</span>
                                    </motion.button>
                                </div>
                            </SimpleParallax>
                        </div>
                    </SimpleParallax>
                </section>
            )}
        </div>
    )
}