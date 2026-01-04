import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SpaceIntro = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Criar partículas binárias
    const particles = []
    const numParticles = 400
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random() * 2,
        value: Math.random() > 0.5 ? '0' : '1', // Valor binário (0 ou 1)
        size: Math.random() * 8 + 10, // Tamanho da fonte
      })
    }
    
    let time = 0
    const baseSpeed = 0.03

    const draw = () => {
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Velocidade aumenta com o tempo (efeito de aceleração)
      const currentSpeed = baseSpeed * (1 + time * 0.5)

      // Desenhar partículas binárias
      particles.forEach((particle, i) => {
        // Movimentar partícula em direção à câmera (efeito warp)
        particle.z -= currentSpeed

        // Se a partícula passou da câmera, resetar atrás com novo valor binário
        if (particle.z <= 0) {
          particle.z = 2
          particle.x = (Math.random() - 0.5) * 2
          particle.y = (Math.random() - 0.5) * 2
          particle.value = Math.random() > 0.5 ? '0' : '1' // Novo valor binário
        }

        // Calcular posição 2D (perspectiva)
        const k = 128 / Math.max(particle.z, 0.1)
        const x = centerX + particle.x * k * 100
        const y = centerY + particle.y * k * 100

        // Calcular tamanho da fonte baseado na distância
        const fontSize = Math.max(8, particle.size * k * 0.3)

        // Opacidade aumenta quando partícula se aproxima
        const opacity = Math.min(1, (2 - particle.z) / 2)

        // Configurar fonte com tamanho dinâmico
        ctx.font = `bold ${Math.floor(fontSize)}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Cor baseada no valor binário (0 = ciano, 1 = azul)
        const color = particle.value === '0' 
          ? `rgba(6, 182, 212, ${opacity})`  // Ciano para 0
          : `rgba(59, 130, 246, ${opacity})`  // Azul para 1

        ctx.fillStyle = color

        // Desenhar caractere binário
        ctx.fillText(particle.value, x, y)

        // Rastro/linha para partículas muito próximas (efeito warp)
        if (particle.z < 0.3) {
          const prevZ = particle.z + currentSpeed * 2
          const prevK = 128 / Math.max(prevZ, 0.1)
          const prevX = centerX + particle.x * prevK * 100
          const prevY = centerY + particle.y * prevK * 100
          
          ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.3})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }

        // Brilho extra para partículas muito próximas
        if (particle.z < 0.5) {
          ctx.shadowBlur = 15
          ctx.shadowColor = color.replace(')', ', 0.8)').replace('rgba(', 'rgba(')
          ctx.fillText(particle.value, x, y)
          ctx.shadowBlur = 0
        }
      })

      time += 0.016
      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Contador de 0 a 26
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1
        if (next > 26) {
          clearInterval(interval)
          return 26
        }
        if (next === 26) {
          // Mostrar o 26 e depois chamar onComplete após um pequeno delay para mostrar o número
          setTimeout(() => {
            clearInterval(interval)
            onComplete()
          }, 150) // Pequeno delay para mostrar o 26 antes de completar
          return 26
        }
        return next
      })
    }, 120) // Incrementa a cada 120ms para chegar em 26 em ~3.1 segundos (velocidade reduzida)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Canvas com estrelas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ background: '#0a0a0a' }}
        />

        {/* Contador */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #3b82f6, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(59, 130, 246, 0.3)',
            }}
          >
            {count}
          </motion.div>
          
          {/* Barra de progresso */}
          <motion.div
            className="mt-8 w-64 sm:w-80 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(count / 26) * 100}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SpaceIntro

