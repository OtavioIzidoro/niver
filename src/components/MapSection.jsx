import { motion } from 'framer-motion'

const MapSection = () => {
  // Endereço completo
  const enderecoCompleto = 'R. Padre João Batista, 278 - Parque das Nações, Alfenas - MG, 37130-000'
  // Endereço para exibição (formato mais curto)
  const endereco = 'R. Padre João Batista, 278 - Parque das Nações, Alfenas - MG'
  // Link do Google Maps compartilhado pelo usuário
  const mapShareLink = 'https://maps.app.goo.gl/dEN6sGfzkz9miqL1N'
  // URL para embed usando endereço completo
  const encodedAddress = encodeURIComponent(enderecoCompleto)
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`

  return (
    <motion.section
      className="px-4 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto"
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
        Onde vai ser?
      </motion.h2>
      <motion.div
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl h-[300px] sm:h-[350px] md:h-[400px]"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da Tardezinha do Tavão"
          className="w-full h-full"
        />
      </motion.div>
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <motion.p 
          className="text-slate-400 text-sm sm:text-base mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {endereco}
        </motion.p>
        <motion.a
          href={mapShareLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-cyan-600/20 border border-cyan-600/50 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Abrir no Google Maps →
        </motion.a>
      </motion.div>
    </motion.section>
  )
}

export default MapSection
