'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Cursor() {
  const trailsRef = useRef([])
  const positions = useRef([])
  const lastPos = useRef({ x: 0, y: 0 })
  const timeoutRef = useRef(null)

  const TRAIL_LENGTH = 40

  useEffect(() => {
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      positions.current.push({ x: 0, y: 0 })
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      // 🔥 velocidad
      const dx = clientX - lastPos.current.x
      const dy = clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      const intensity = Math.min(speed / 40, 1)

      lastPos.current = { x: clientX, y: clientY }

      // 🔥 cancelar fade out si vuelve a moverse
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      // 🔥 asegurar que vuelvan a aparecer
      gsap.set(trailsRef.current, { opacity: 1 })

      positions.current.unshift({ x: clientX, y: clientY })
      positions.current.pop()

      trailsRef.current.forEach((trail, i) => {
        const pos = positions.current[i]
        if (!pos) return

        const baseOpacity = 0.6 - i * 0.015

        gsap.set(trail, {
          x: pos.x,
          y: pos.y,
          opacity: baseOpacity + intensity * 0.6,
          scale: 1 + intensity * 0.8,
          filter: `blur(${18 - i * 0.3 + intensity * 10}px)`,
        })
      })

      // 🔥 desaparecer SUAVE (0.5s)
      timeoutRef.current = setTimeout(() => {
        gsap.to(trailsRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })
      }, 100) // pequeño delay para no cortar rápido
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      {[...Array(TRAIL_LENGTH)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="absolute top-0 left-0 pointer-events-none z-[9999]"
          style={{
            width: `${70 - i * 1.2}px`,
            height: `${70 - i * 1.2}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(25,172,230,0.7) 0%, transparent 70%)'
          }}
        />
      ))}
    </>
  )
}

export default Cursor