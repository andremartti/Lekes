import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site, whatsappLink } from '../config/site'
import { observeActiveSection } from '../hooks/useReveal'
import { WaveMark, WhatsappIcon } from './icons'

export const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'instalaciones', label: 'Instalaciones' },
  { id: 'experiencias', label: 'Experiencias' },
  { id: 'natacion', label: 'Natación' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'visita', label: 'Información y contacto' },
]

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <WaveMark className={`h-8 w-8 ${light ? 'text-sun' : 'text-water'}`} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.6rem] font-semibold tracking-tight italic">
          {site.shortName}
        </span>
        <span
          className={`mt-0.5 text-[0.6rem] font-bold tracking-[0.22em] uppercase ${light ? 'text-white/75' : 'text-ink/60'}`}
        >
          Centro Recreativo
        </span>
      </span>
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(
    () =>
      observeActiveSection(
        navItems.map((n) => n.id),
        setActive,
      ),
    [],
  )

  // Menú móvil: bloquea el scroll, cierra con Escape y devuelve el foco.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      toggleRef.current?.focus()
    }
  }, [open])

  const solid = scrolled || open
  const light = !solid

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'bg-sand/90 shadow-[0_1px_0_rgba(12,40,48,0.08)] backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <a
          href="#contenido"
          className="focus:bg-sun focus:text-ink sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:px-4 focus:py-2 focus:font-bold"
        >
          Saltar al contenido
        </a>
        <div
          className={`container-x flex items-center justify-between transition-all duration-500 ${solid ? 'h-16' : 'h-20'}`}
        >
          <a
            href="#inicio"
            className={light ? 'text-white' : 'text-ink'}
            aria-label={`${site.name}, ir al inicio`}
            onClick={() => setOpen(false)}
          >
            <Logo light={light} />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink'
                    } ${active === item.id ? (light ? 'text-white' : 'text-ink') : ''}`}
                  >
                    {item.label === 'Información y contacto' ? 'Visítanos' : item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-sun absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ${
                        active === item.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex"
            >
              <WhatsappIcon className="h-4.5 w-4.5" />
              Consultar
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
                light ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5'
              }`}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="bg-sand fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-x flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.id} className="border-ink/10 border-b">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-ink flex items-baseline gap-4 py-4 text-3xl"
                >
                  <span className="text-lagoon-500 font-sans text-xs font-bold">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <a
              href={whatsappLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <WhatsappIcon className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
            <p className="text-ink/60 mt-4 text-center text-sm">{site.contact.phoneDisplay}</p>
          </div>
        </nav>
      </div>
    </>
  )
}
