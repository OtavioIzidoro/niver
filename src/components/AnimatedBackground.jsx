import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      if (!canvas) return
      const width = window.innerWidth || 1920
      const height = window.innerHeight || 1080
      canvas.width = width
      canvas.height = height
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawAurora = () => {
      if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) {
        animationFrameId = requestAnimationFrame(drawAurora)
        return
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        // Versão estática para reduced motion
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(6, 78, 59, 0.1)')
        gradient.addColorStop(0.5, 'rgba(14, 116, 144, 0.1)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return
      }

      time += 0.003

      const width = canvas.width
      const height = canvas.height

      // Criar nebulosas espaciais com cores azuis/roxas/cianos
      for (let i = 0; i < 3; i++) {
        const x0 = Math.max(0, Math.min(width, width * (0.2 + Math.sin(time * 0.5 + i * 0.8) * 0.3)))
        const y0 = Math.max(0, Math.min(height, height * (0.3 + Math.cos(time * 0.6 + i * 1.2) * 0.4)))
        const x1 = Math.max(0, Math.min(width, width * (0.5 + Math.sin(time * 0.5 + i * 0.8) * 0.5)))
        const y1 = Math.max(0, Math.min(height, height * (0.7 + Math.cos(time * 0.6 + i * 1.2) * 0.6)))
        const radius = Math.max(10, Math.min(width * 1.5, height * 1.5))
        
        const gradient = ctx.createRadialGradient(
          x0,
          y0,
          0,
          x1,
          y1,
          radius
        )

        const opacity = 0.15 + Math.sin(time * 0.8 + i) * 0.08
        // Cores espaciais: azul escuro, ciano, azul claro, roxo
        const colors = [
          [`rgba(6, 78, 59, ${opacity})`, 0], // Azul muito escuro/teal
          [`rgba(14, 116, 144, ${opacity * 0.9})`, 0.3], // Ciano escuro
          [`rgba(59, 130, 246, ${opacity * 0.7})`, 0.6], // Azul
          [`rgba(147, 51, 234, ${opacity * 0.5})`, 1], // Roxo
        ]

        colors.forEach(([color, stop]) => {
          gradient.addColorStop(stop, color)
        })

        ctx.fillStyle = gradient
        ctx.filter = 'blur(120px)'
        ctx.fillRect(0, 0, width, height)
        ctx.filter = 'none'
      }

      // Adicionar estrelas brilhantes (pontos de luz)
      for (let i = 0; i < 200; i++) {
        const seedX = (i * 0.137) % 1
        const seedY = (i * 0.211) % 1
        const twinkleSpeed = 0.8 + (i % 3) * 0.3
        const opacity = Math.max(0.1, Math.min(1, 0.3 + Math.sin(time * twinkleSpeed * 3 + i * 0.5) * 0.4))
        
        // Estrelas brancas/azuis cintilantes
        const starColors = [
          [255, 255, 255], // Branco
          [200, 220, 255], // Azul claro
          [180, 200, 255], // Azul muito claro
          [220, 240, 255], // Azul prata
        ]
        const colorIndex = i % starColors.length
        const [r, g, b] = starColors[colorIndex]
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        const x = Math.max(0, Math.min(width, width * seedX))
        const y = Math.max(0, Math.min(height, height * seedY))
        const size = Math.max(0.5, Math.min(2, 0.8 + Math.sin(time * twinkleSpeed * 4 + i) * 0.5))
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Brilho extra para estrelas maiores
        if (size > 1.2) {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }
      
      // Adicionar estrelas cadentes ocasionais (partículas brilhantes se movendo)
      for (let i = 0; i < 8; i++) {
        const seed = (i * 0.47) % 1
        const speed = 0.3 + (i % 2) * 0.2
        const opacity = Math.max(0, Math.min(1, 0.4 + Math.sin(time * speed * 5 + i * 2) * 0.3))
        
        if (opacity > 0.3) {
          const x = Math.max(0, Math.min(width, width * (0.2 + (time * speed * 0.1 + seed) % 0.6)))
          const y = Math.max(0, Math.min(height, height * (0.1 + (time * speed * 0.15 + seed * 0.7) % 0.8)))
          const size = Math.max(1, Math.min(4, 1.5 + Math.sin(time * speed * 8 + i) * 1))
          
          ctx.fillStyle = `rgba(147, 197, 253, ${opacity})` // Azul claro
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          
          // Rastro
          ctx.shadowBlur = 12
          ctx.shadowColor = `rgba(147, 197, 253, ${opacity * 0.4})`
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      animationFrameId = requestAnimationFrame(drawAurora)
    }

    drawAurora()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  )
}

export default AnimatedBackground

