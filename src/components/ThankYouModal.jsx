import { motion, AnimatePresence } from 'framer-motion'

// Função para gerar e baixar arquivo .ics (iCalendar)
const addToCalendar = () => {
  const event = {
    title: 'Tardezinha do Tavão 🎉',
    description: 'Open Cooler - Cada um leva sua bebida preferida!',
    location: 'Padre João Batista, 278',
    startDate: '20260131T180000', // 31/01/2026 às 18:00
    endDate: '20260131T230000',   // 31/01/2026 às 23:00 (assumindo 5 horas de duração)
    timezone: 'America/Sao_Paulo'
  }

  // Formatar data no formato iCalendar (YYYYMMDDTHHMMSS)
  const formatDate = (dateStr) => {
    // dateStr formato: YYYYMMDDTHHMMSS
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    const hour = dateStr.substring(9, 11)
    const minute = dateStr.substring(11, 13)
    const second = dateStr.substring(13, 15)
    return `${year}${month}${day}T${hour}${minute}${second}`
  }

  const start = formatDate(event.startDate)
  const end = formatDate(event.endDate)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  // Criar conteúdo do arquivo .ics
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tardezinha do Tavão//Event//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@tardezinha-do-tavao`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete: Tardezinha do Tavão amanhã!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  // Criar blob e fazer download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', 'Tardezinha-do-Tavao.ics')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}

const ThankYouModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto text-center relative"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded z-10"
              aria-label="Fechar modal"
            >
              ×
            </button>
            
            {/* Ícone de sucesso */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-4xl sm:text-5xl">✅</span>
              </div>
            </motion.div>

            {/* Título */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Obrigado pela confirmação! 🎉
            </motion.h2>

            {/* Informações do evento */}
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">📅</span>
                  <p className="text-lg sm:text-xl font-semibold text-slate-100">
                    31 de Janeiro de 2026
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🕐</span>
                  <p className="text-lg sm:text-xl font-semibold text-slate-100">
                    18:00
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">📍</span>
                  <p className="text-lg sm:text-xl font-semibold text-slate-100">
                    Padre João Batista, 278
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 backdrop-blur-sm border-2 border-cyan-500/50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🍻</span>
                  <p className="text-lg sm:text-xl font-semibold text-cyan-300">
                    Open Cooler
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-300 mt-2">
                  Cada um leva sua bebida preferida!
                </p>
              </div>
            </motion.div>

            {/* Mensagem final */}
            <motion.p
              className="text-base sm:text-lg text-slate-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Te esperamos lá! 🎊
            </motion.p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Botão adicionar à agenda */}
              <motion.button
                onClick={addToCalendar}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800/60 border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-700/60 hover:border-slate-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📅</span>
                <span>Adicionar à Agenda</span>
              </motion.button>

              {/* Botão de fechar */}
              <motion.button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fechar
              </motion.button>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ThankYouModal

