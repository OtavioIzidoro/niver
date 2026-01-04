import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import audioFile from '../assets/omiyamassages.fr - Raça Negra - Cheia De Manias (DVD Raça Negra Amigos) Video Oficial (320 KBps).mp3'

// Variável global para garantir que só há uma instância tocando
let globalAudioInstance = null
let globalIsPlaying = false
// Função global para iniciar música programaticamente
let globalStartMusic = null

const BackgroundMusic = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Se já existe uma instância tocando, não fazer nada
    if (globalAudioInstance && globalAudioInstance !== audio && !globalAudioInstance.paused) {
      return
    }

    // Registrar esta instância como a instância global
    globalAudioInstance = audio
    
    // Função para iniciar música programaticamente (exportada globalmente)
    globalStartMusic = async () => {
      try {
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          return
        }
        if (audio.muted) audio.muted = false
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
      } catch (error) {
        // Falhou, mas não é crítico
      }
    }
    
    // Expor no window para acesso fácil de outros componentes
    if (typeof window !== 'undefined') {
      window.startBackgroundMusic = globalStartMusic
    }

    // Configurar volume e atributos para autoplay
    audio.volume = 0.7
    audio.muted = false

    const handlePlay = () => {
      globalIsPlaying = true
      setIsPlaying(true)
    }
    const handlePause = () => {
      globalIsPlaying = false
      setIsPlaying(false)
    }
    const handleEnded = () => {
      // Reiniciar quando terminar (loop)
      audio.play().catch(() => {
        globalIsPlaying = false
        setIsPlaying(false)
      })
    }
    const handleError = () => {
      setHasError(true)
      globalIsPlaying = false
      setIsPlaying(false)
    }

    // Handler para quando o áudio estiver pronto
    const handleCanPlay = async () => {
      try {
        // Verificar se já está tocando
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          return
        }
        
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
      } catch (error) {
        // Se falhar, tentar outras estratégias
      }
    }

    // Handler para quando o áudio estiver completamente carregado (mais rápido)
    const handleLoadedData = async () => {
      try {
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          return
        }
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
      } catch (error) {
        // Se falhar, continuar com outras estratégias
      }
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay, { once: true })
    audio.addEventListener('loadeddata', handleLoadedData, { once: true })

    // Tentar autoplay múltiplas vezes com diferentes estratégias
    const tryAutoplay = async () => {
      try {
        // Verificar se já está tocando antes de tentar play
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          return true
        }
        
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
        return true
      } catch (error) {
        return false
      }
    }

    // Função para tocar após interação do usuário (otimizada para mobile)
    const playOnInteraction = async (event) => {
      try {
        // Verificar se já está tocando
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          removeAllInteractionListeners()
          return
        }
        
        // Em mobile, garantir que o áudio não está muted
        if (audio.muted) {
          audio.muted = false
        }
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
        // Remover todos os listeners após sucesso
        removeAllInteractionListeners()
      } catch (err) {
        // Ainda falhou, manter botão visível
      }
    }

    // Função para remover todos os listeners de interação
    const removeAllInteractionListeners = () => {
      document.removeEventListener('click', playOnInteraction)
      document.removeEventListener('touchstart', playOnInteraction)
      document.removeEventListener('touchend', playOnInteraction)
      document.removeEventListener('touchmove', playOnInteraction)
      document.removeEventListener('scroll', playOnInteraction)
      document.removeEventListener('mousemove', playOnInteraction)
      document.removeEventListener('keydown', playOnInteraction)
      document.removeEventListener('pointerdown', playOnInteraction)
      window.removeEventListener('focus', playOnInteraction)
      window.removeEventListener('pageshow', playOnInteraction)
    }

    // Adicionar listeners para interação (especialmente mobile)
    const addInteractionListeners = () => {
      // Eventos de toque (mobile)
      document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true })
      document.addEventListener('touchend', playOnInteraction, { once: true, passive: true })
      document.addEventListener('touchmove', playOnInteraction, { once: true, passive: true })
      // Eventos de mouse/pointer
      document.addEventListener('click', playOnInteraction, { once: true })
      document.addEventListener('pointerdown', playOnInteraction, { once: true })
      document.addEventListener('mousemove', playOnInteraction, { once: true })
      // Eventos de scroll
      document.addEventListener('scroll', playOnInteraction, { once: true, passive: true })
      // Eventos de teclado
      document.addEventListener('keydown', playOnInteraction, { once: true })
      // Eventos de foco
      window.addEventListener('focus', playOnInteraction, { once: true })
      window.addEventListener('pageshow', playOnInteraction, { once: true })
    }

    // Tentar autoplay IMEDIATAMENTE (sem delay)
    let autoplaySuccess = false
    
    // Função para tentar iniciar após qualquer interação
    const tryPlayAfterInteraction = async () => {
      if (autoplaySuccess || globalIsPlaying) {
        removeAllInteractionListeners()
        return
      }
      try {
        if (audio.muted) audio.muted = false
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
        autoplaySuccess = true
        removeAllInteractionListeners()
      } catch (err) {
        // Falhou, continuar tentando
      }
    }
    
    // Estratégia mais agressiva: tentar múltiplas vezes E adicionar listeners IMEDIATAMENTE
    const attemptAutoplay = async () => {
      // Tentativa 1: imediata
      autoplaySuccess = await tryAutoplay()
      if (autoplaySuccess) return
      
      // Tentativa 2: após 10ms
      await new Promise(resolve => setTimeout(resolve, 10))
      autoplaySuccess = await tryAutoplay()
      if (autoplaySuccess) return
      
      // Tentativa 3: após 50ms
      await new Promise(resolve => setTimeout(resolve, 40))
      autoplaySuccess = await tryAutoplay()
      if (autoplaySuccess) return
      
      // Tentativa 4: após 100ms
      await new Promise(resolve => setTimeout(resolve, 50))
      autoplaySuccess = await tryAutoplay()
      if (autoplaySuccess) return
      
      // Tentativa 5: após 200ms
      await new Promise(resolve => setTimeout(resolve, 100))
      autoplaySuccess = await tryAutoplay()
      if (autoplaySuccess) return
    }
    
    attemptAutoplay()
    
    // IMPORTANTE: Adicionar listeners IMEDIATAMENTE (não só quando falhar)
    // Isso garante que assim que o usuário interagir, a música tentará iniciar
    addInteractionListeners()
    
    // Também adicionar listeners simples para primeira interação
    const handleFirstInteraction = () => {
      tryPlayAfterInteraction()
    }
    
    document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true })
    document.addEventListener('touchend', handleFirstInteraction, { once: true, passive: true })
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('pointerdown', handleFirstInteraction, { once: true })
    
    // Backup: tentar novamente quando a página estiver totalmente carregada
    const timeout1 = setTimeout(async () => {
      if (!autoplaySuccess && !globalIsPlaying) {
        autoplaySuccess = await tryAutoplay()
      }
    }, 500)

    return () => {
      clearTimeout(timeout1)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadeddata', handleLoadedData)
      removeAllInteractionListeners()
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('touchend', handleFirstInteraction)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('pointerdown', handleFirstInteraction)
      globalStartMusic = null
      if (typeof window !== 'undefined') {
        window.startBackgroundMusic = null
      }
    }
  }, [])

  const handlePlay = async () => {
    const audio = audioRef.current
    if (audio) {
      try {
        // Verificar se já está tocando
        if (globalIsPlaying || (!audio.paused && audio.currentTime > 0)) {
          return
        }
        
        await audio.play()
        globalIsPlaying = true
        setIsPlaying(true)
        setHasError(false)
      } catch (error) {
        setHasError(true)
      }
    }
  }

  const handlePause = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      globalIsPlaying = false
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        style={{ display: 'none' }}
      >
        <source src={audioFile} type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>

      {hasError && !isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          aria-label="Tocar música"
          title="Tocar música"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      )}

      {!hasError && !isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          aria-label="Tocar música"
          title="Tocar música"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      )}

      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-slate-800/90 backdrop-blur-md border border-slate-700 text-white p-2.5 sm:p-3 rounded-full shadow-xl hover:bg-slate-700/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePause}
          aria-label="Pausar música"
          title="Pausar música"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      )}
    </>
  )
}

export default BackgroundMusic
