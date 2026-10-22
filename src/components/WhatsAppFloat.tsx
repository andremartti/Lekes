import { useEffect, useState } from 'react'
import { whatsappLink } from '../config/site'
import { WhatsappIcon } from './icons'

/** Botón flotante de WhatsApp; aparece al dejar atrás la portada. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group bg-whatsapp text-ink fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-full pr-5 pl-4 font-bold shadow-[0_16px_40px_-12px_rgba(12,40,48,0.55)] transition-all duration-500 hover:-translate-y-0.5 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <WhatsappIcon className="h-7 w-7" />
      <span className="text-sm">WhatsApp</span>
    </a>
  )
}
