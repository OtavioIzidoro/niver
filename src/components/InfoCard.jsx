import { motion } from 'framer-motion'

const InfoCard = ({ icon, label, value, delay = 0 }) => {
  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
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
        className="text-3xl sm:text-4xl mb-3 relative z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay + 1,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>
      <div className="text-sm sm:text-base text-slate-400 mb-2 font-medium relative z-10">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold text-slate-100 relative z-10">{value}</div>
    </motion.div>
  )
}

export default InfoCard

