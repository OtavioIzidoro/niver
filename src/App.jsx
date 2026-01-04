import { useState } from 'react'
import { motion } from 'framer-motion'
import SpaceIntro from './components/SpaceIntro'
import AnimatedBackground from './components/AnimatedBackground'
import BackgroundMusic from './components/BackgroundMusic'
import Hero from './components/Hero'
import InfoCard from './components/InfoCard'
import ConfirmationModal from './components/ConfirmationModal'
import ThankYouModal from './components/ThankYouModal'
import MapSection from './components/MapSection'
import OpenCoolerSection from './components/OpenCoolerSection'
import Confetti from './components/Confetti'
import footerImage from './assets/l 2773 SEM FUNDO 1.png'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const MAP_LINK = 'https://maps.app.goo.gl/dEN6sGfzkz9miqL1N'

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const handleConfirmationSuccess = () => {
    setShowConfetti(true)
    setIsThankYouModalOpen(true)
    // Remover confete após 5 segundos
    setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen relative bg-[#0a0a0a] overflow-x-hidden">
      <BackgroundMusic />
      {showConfetti && <Confetti />}
      
      {showIntro ? (
        <SpaceIntro onComplete={handleIntroComplete} />
      ) : (
        <>
          <AnimatedBackground />
      
      <main className="relative z-20 container mx-auto px-4 py-8 sm:py-12 bg-transparent">
        <Hero />

        {/* Botão Confirmar Presença em Destaque */}
        <motion.section
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 text-center text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abrir no Maps
          </motion.a>
          
          {/* Botão Confirmar Presença em Destaque */}
          <motion.div
            className="relative w-full sm:w-auto flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Efeito de brilho pulsante ao redor */}
            <motion.div
              className="absolute inset-0 rounded-lg sm:rounded-xl"
              animate={{
                boxShadow: [
                  '0 0 15px rgba(6, 182, 212, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)',
                  '0 0 25px rgba(6, 182, 212, 0.7), 0 0 50px rgba(59, 130, 246, 0.4)',
                  '0 0 15px rgba(6, 182, 212, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="relative w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 transform"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 8px 25px rgba(6, 182, 212, 0.4), 0 0 15px rgba(59, 130, 246, 0.2)',
                  '0 12px 35px rgba(6, 182, 212, 0.6), 0 0 25px rgba(59, 130, 246, 0.4)',
                  '0 8px 25px rgba(6, 182, 212, 0.4), 0 0 15px rgba(59, 130, 246, 0.2)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              ✨ Confirmar presença ✨
            </motion.button>
            
          </motion.div>
        </motion.section>

        {/* Prazo de Confirmação */}
        <motion.div
          className="max-w-5xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-md border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Efeito de brilho pulsante */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-cyan-300 font-semibold mb-1 sm:mb-2 relative z-10"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨ Confirmar presença
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-cyan-400 font-bold relative z-10"
              animate={{
                textShadow: [
                  '0 0 10px rgba(6, 182, 212, 0.3)',
                  '0 0 20px rgba(6, 182, 212, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
                  '0 0 10px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ⏰ Até 20/01/2026
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Info Cards */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <InfoCard
            icon="📅"
            label="Data"
            value="31/01/2026"
            delay={0.8}
          />
          <InfoCard
            icon="🕐"
            label="Horário"
            value="18:00"
            delay={0.9}
          />
          <InfoCard
            icon="📍"
            label="Local"
            value="Padre João Batista, 278"
            delay={1.0}
          />
        </motion.section>

        <MapSection />

        <OpenCoolerSection />

      </main>

      {/* Footer */}
      <motion.footer
        className="w-full text-center px-4 py-3 sm:py-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-1.5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <motion.p 
            className="text-xs sm:text-sm text-slate-500"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Desenvolvido por:
          </motion.p>
          <motion.img
            src={footerImage}
            alt="Desenvolvido por"
            className="max-w-full h-auto max-h-14 sm:max-h-16 md:max-h-20 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.p 
            className="text-xs sm:text-sm text-slate-600"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            © 2026
          </motion.p>
        </motion.div>
      </motion.footer>

          <ConfirmationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleConfirmationSuccess}
          />
          <ThankYouModal 
            isOpen={isThankYouModalOpen} 
            onClose={() => setIsThankYouModalOpen(false)} 
          />
        </>
      )}
    </div>
  )
}

export default App

