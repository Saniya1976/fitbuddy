"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  particleSpeed?: number
  hoverEffect?: boolean
}

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  particleColor = "#FFF",
  particleSpeed = 1,
  hoverEffect = false,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [particles, setParticles] = useState<any[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight

        // Set canvas dimensions
        canvas.width = width
        canvas.height = height

        // Update state
        setDimensions({ width, height })
      }
    }

    // Initial setup
    handleResize()

    // Create particles
    const particlesArray = Array.from({ length: particleDensity }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * particleSpeed,
      speedY: (Math.random() - 0.5) * particleSpeed,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    setParticles(particlesArray)

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [minSize, maxSize, particleDensity, particleSpeed])

  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > dimensions.width) particle.x = 0
        else if (particle.x < 0) particle.x = dimensions.width
        if (particle.y > dimensions.height) particle.y = 0
        else if (particle.y < 0) particle.y = dimensions.height

        // Apply hover effect if enabled
        let finalSize = particle.size
        let finalOpacity = particle.opacity

        if (hoverEffect && mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            const scale = 1 - distance / maxDistance
            finalSize = particle.size * (1 + scale)
            finalOpacity = Math.min(1, particle.opacity + scale * 0.5)
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2)
        ctx.fillStyle = `${particleColor}${Math.floor(finalOpacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, dimensions, background, particleColor, hoverEffect, mousePosition])

  return <canvas ref={canvasRef} id={id} className={cn("absolute inset-0", className)} />
}

