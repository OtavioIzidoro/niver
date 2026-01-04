import { motion } from 'framer-motion'
import heroImage from '../assets/WhatsApp Image 2026-01-04 at 17.34.34 (1).png'

const Hero = () => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Efeito de explosão inicial */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-50" />
      </motion.div>

      {/* Container com imagem e texto juntos */}
      <motion.div
        className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto w-full relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 0.3,
          type: "spring",
          stiffness: 80,
          damping: 15
        }}
      >
        {/* Imagem com efeitos */}
        <motion.div
          className="w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl px-2 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Brilho pulsante ao redor da imagem */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            animate={{
                boxShadow: [
                '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)',
                '0 0 50px rgba(6, 182, 212, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)',
                '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.img
            src={heroImage}
            alt="Tardezinha do Tavão"
            className="w-full h-auto mx-auto relative z-20"
            style={{
              backgroundColor: 'transparent',
              mixBlendMode: 'normal',
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Efeito de partículas/brilhos ao redor */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => {
            const angle = i * 30 * Math.PI / 180
            const radius = 150 + (i % 3) * 20
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full"
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  opacity: 0,
                  scale: 0 
                }}
                animate={{
                  x: `calc(50% + ${Math.cos(angle) * radius}px)`,
                  y: `calc(50% + ${Math.sin(angle) * radius}px)`,
                  opacity: [0, 0.6, 0.4, 0],
                  scale: [0, 1.5, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: 1 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  filter: 'blur(2px)',
                  boxShadow: '0 0 20px rgba(147, 197, 253, 0.8)',
                }}
              />
            )
          })}
        </div>

        {/* Texto com efeito pulsante */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-center px-2 leading-tight relative z-10"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.7,
            type: "spring",
            stiffness: 100
          }}
          style={{
            color: '#06b6d4',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.4)',
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.4)',
                '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(6, 182, 212, 0.7), 0 0 40px rgba(59, 130, 246, 0.4)',
                '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.4)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="block"
          >
            Tardezinha do Tavão
          </motion.span>
        </motion.h1>
      </motion.div>
    </motion.section>
  )
}

export default Hero

