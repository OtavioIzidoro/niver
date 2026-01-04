import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Toast from './Toast'

const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw8oIijBiYI4D_jgjDlLR1U1i91tUnUt8gq9WeYR3ovy63tTJxELYQjetoUMSsrxUrE/exec'
const SECRET_TOKEN = 'TROQUE_ESSE_TOKEN_POR_UM_SEGREDO_GRANDE_123456'
// Número do WhatsApp (formato: código do país + DDD + número, sem espaços ou caracteres especiais)
// 55 = Brasil, 35 = DDD, 997056462 = número
const WHATSAPP_NUMBER = '5535997056462'

const openWhatsappRsvp = ({ phoneBR, nome, conjuge, presenca }) => {
  // phoneBR: só números com DDD e país. Ex: "5511999999999"
  const msg =
    `Tardezinha do Tavão 🎉\n` +
    `Nome: ${nome}\n` +
    `Cônjuge: ${conjuge || "-"}\n` +
    `Presença: ${presenca}\n` +
    `Data: 31/01/2026 às 18:00`

  const url = `https://wa.me/${phoneBR}?text=${encodeURIComponent(msg)}`
  
  // Criar um link temporário e clicar nele (funciona melhor em mobile e evita bloqueio de popup)
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const ConfirmationModal = ({ isOpen, onClose, onSuccess }) => {
  const [nome, setNome] = useState('')
  const [voceVai, setVoceVai] = useState('')
  const [temConjuge, setTemConjuge] = useState('')
  const [conjuge, setConjuge] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast({ ...toast, isVisible: false })
  }

  const handleSubmit = async () => {
    // Validação de campos obrigatórios
    if (!nome.trim()) {
      showToast('Por favor, preencha seu nome', 'error')
      return
    }

    if (!voceVai) {
      showToast('Por favor, informe se você vai', 'error')
      return
    }

    // Validar cônjuge apenas se "Você vai?" for "sim"
    if (voceVai === 'sim') {
      if (!temConjuge) {
        showToast('Por favor, informe se você tem cônjuge', 'error')
        return
      }

      if (temConjuge === 'sim' && !conjuge.trim()) {
        showToast('Por favor, preencha o nome do(a) cônjuge', 'error')
        return
      }
    }

    setIsSubmitting(true)

    try {
      // O endpoint espera presenca em minúsculas: "sim" ou "nao"
      const presenca = voceVai === 'sim' ? 'sim' : 'nao'
      
      // Preparar dados conforme o endpoint espera
      const data = {
        nome: nome.trim(),
        conjuge: temConjuge === 'sim' ? conjuge.trim() : '',
        presenca: presenca,
        token: SECRET_TOKEN
        // datetime não é necessário - o script cria automaticamente
      }

      // Salvar valores antes de limpar campos (para usar no WhatsApp)
      const nomeCompleto = nome.trim()
      const nomeConjuge = temConjuge === 'sim' ? conjuge.trim() : ''
      const vaiConfirmar = voceVai === 'sim'

      // Enviar dados usando no-cors (funciona mesmo com CORS bloqueado)
      // Nota: com no-cors não podemos ler a resposta, mas assumimos sucesso
      try {
        await fetch(RSVP_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors', // Permite enviar mesmo com CORS bloqueado
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        
        // Com no-cors, não podemos verificar a resposta, mas assumimos sucesso
        // O Google Apps Script processará a requisição normalmente
        showToast('Presença confirmada com sucesso!', 'success')
      } catch (error) {
        showToast('Erro ao salvar. Tente novamente.', 'error')
        setIsSubmitting(false)
        return
      }
      
      // Abrir WhatsApp automaticamente apenas se confirmar presença
      if (vaiConfirmar) {
        // Preparar mensagem de confirmação
        let msg = `Olá! Confirmo minha presença na Tardezinha do Tavão 🎉\n\n`
        msg += `Nome: ${nomeCompleto}\n`
        
        if (nomeConjuge) {
          msg += `Cônjuge: ${nomeConjuge}\n`
        }
        
        msg += `\nData: 31/01/2026 às 18:00\n`
        msg += `Local: Padre João Batista, 278\n\n`
        msg += `Aguardo ansiosamente! 😄`

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
        
        // Detectar se é mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        
        // Tentar abrir imediatamente (sem setTimeout para evitar bloqueios)
        try {
          if (isMobile) {
            // No mobile, usar window.location para abrir diretamente no app
            // ou criar link sem target _blank para funcionar melhor
            const link = document.createElement('a')
            link.href = url
            link.rel = 'noopener noreferrer'
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            
            // Remover link após um delay
            setTimeout(() => {
              if (document.body.contains(link)) {
                document.body.removeChild(link)
              }
            }, 100)
          } else {
            // No desktop, abrir em nova aba
            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            
            // Remover link após um delay
            setTimeout(() => {
              if (document.body.contains(link)) {
                document.body.removeChild(link)
              }
            }, 100)
          }
        } catch (error) {
          // Fallback: tentar window.open
          try {
            if (isMobile) {
              // No mobile, usar window.location
              window.location.href = url
            } else {
              window.open(url, '_blank', 'noopener,noreferrer')
            }
          } catch (error2) {
            // Último recurso: copiar URL para área de transferência
            if (navigator.clipboard) {
              navigator.clipboard.writeText(url).then(() => {
                alert('URL do WhatsApp copiada! Cole no navegador.')
              }).catch(() => {
                alert(`Erro ao abrir WhatsApp. Acesse: ${url}`)
              })
            } else {
              alert(`Erro ao abrir WhatsApp. Acesse: ${url}`)
            }
          }
        }
      }
      
      // Limpar formulário
      setNome('')
      setVoceVai('')
      setTemConjuge('')
      setConjuge('')
      
      // Resetar estado de submissão
      setIsSubmitting(false)
      
      // Fechar modal e abrir modal de agradecimento (apenas se confirmar presença)
      setTimeout(() => {
        onClose()
        if (vaiConfirmar && onSuccess) {
          onSuccess()
        }
      }, 1000)

    } catch (error) {
      showToast('Erro de conexão. Verifique sua internet e tente novamente.', 'error')
      setIsSubmitting(false)
      return
    }
  }


  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            >
              {/* Modal */}
              <motion.div
                className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              aria-label="Fechar modal"
            >
              ×
            </button>

            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Confirmar Presença
            </h2>
            <p className="text-sm sm:text-base text-cyan-400 font-semibold mb-6 text-center">
              ⏰ Prazo: até 20/01/2026
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-slate-300 mb-2">
                  Nome <span className="text-red-400">*</span>
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-100"
                  placeholder="Seu nome completo"
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Você vai? <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="voceVai"
                      value="sim"
                      checked={voceVai === 'sim'}
                      onChange={(e) => setVoceVai(e.target.value)}
                      className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                      disabled={isSubmitting}
                      required
                    />
                    <span className="text-slate-300">Sim</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="voceVai"
                      value="nao"
                      checked={voceVai === 'nao'}
                      onChange={(e) => {
                        setVoceVai(e.target.value)
                        // Limpar campos de cônjuge quando escolher "não"
                        setTemConjuge('')
                        setConjuge('')
                      }}
                      className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                      disabled={isSubmitting}
                      required
                    />
                    <span className="text-slate-300">Não</span>
                  </label>
                </div>
              </div>

              {voceVai === 'sim' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tem cônjuge? <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="temConjuge"
                          value="sim"
                          checked={temConjuge === 'sim'}
                          onChange={(e) => setTemConjuge(e.target.value)}
                          className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                          disabled={isSubmitting}
                          required
                        />
                        <span className="text-slate-300">Sim</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="temConjuge"
                          value="nao"
                          checked={temConjuge === 'nao'}
                          onChange={(e) => {
                            setTemConjuge(e.target.value)
                            setConjuge('')
                          }}
                          className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-700 focus:ring-cyan-500"
                          disabled={isSubmitting}
                          required
                        />
                        <span className="text-slate-300">Não</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {temConjuge === 'sim' && voceVai === 'sim' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="conjuge" className="block text-sm font-medium text-slate-300 mb-2">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="conjuge"
                    type="text"
                    value={conjuge}
                    onChange={(e) => setConjuge(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-100"
                    placeholder="Nome completo do(a) cônjuge"
                    required={temConjuge === 'sim'}
                    disabled={isSubmitting}
                  />
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Salvando...' : '✅ Confirmar'}
              </motion.button>
            </div>
              </motion.div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}

export default ConfirmationModal

