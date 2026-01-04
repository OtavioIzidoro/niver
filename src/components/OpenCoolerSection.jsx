import { motion } from 'framer-motion'

const OpenCoolerSection = () => {
  const items = [
    {
      icon: '🍻',
      title: 'Cada um traz a sua',
      description: 'Traga sua bebida preferida. Seja cerveja, refrigerante, água ou qualquer coisa que você curta!'
    },
    {
      icon: '👥',
      title: 'Vibe compartilhada',
      description: 'A diversão fica por conta de todos. É sobre estar junto e celebrar!'
    },
    {
      icon: '✨',
      title: 'Simples assim',
      description: 'Sem complicação. Só trazer sua bebida, chegar e aproveitar a tardezinha.'
    }
  ]

  return (
    <motion.section
      className="px-4 py-12 sm:py-16 md:py-20 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Como funciona o Open Cooler
      </motion.h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 text-center relative overflow-hidden group"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              borderColor: 'rgba(6, 182, 212, 0.5)',
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.2)'
            }}
          >
            {/* Efeito de brilho no hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
            />
            
            <motion.div 
              className="text-4xl sm:text-5xl mb-4 relative z-10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                },
              }}
            >
              {item.icon}
            </motion.div>
            <motion.h3 
              className="text-xl sm:text-2xl font-semibold mb-3 text-slate-100 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.p 
              className="text-slate-400 text-sm sm:text-base leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default OpenCoolerSection

