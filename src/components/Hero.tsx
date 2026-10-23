import { ArrowDown, ArrowUpRight, Camera, Clock, MapPin } from 'lucide-react'
import { photoSrc } from '../config/photos'
import { site, whatsappLink } from '../config/site'
import { WhatsappIcon } from './icons'
import { Photo } from './Photo'

const routes = [
  { href: '#instalaciones', kicker: 'Para la familia', title: 'Un día de piscina' },
  { href: '#natacion', kicker: 'Para los peques', title: 'Academia de natación' },
  { href: '#eventos', kicker: 'Para celebrar', title: 'Salón para eventos' },
]

export function Hero() {
  const hours = site.hours.rows[0]
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="bg-lagoon-900 relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="hero-kenburns h-full w-full">
          <Photo id="hero" priority compact sizes="100vw" />
        </div>
        <div className="from-ink/60 via-ink/35 to-ink/90 absolute inset-0 bg-gradient-to-b" />
        <div className="from-ink/70 via-ink/20 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      {!photoSrc('hero') && (
        <p className="absolute top-24 right-5 z-10 hidden items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[0.7rem] font-semibold backdrop-blur-md sm:inline-flex lg:right-12">
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
          Foto pendiente · vista de la piscina principal
        </p>
      )}

      <div className="container-x flex flex-1 flex-col justify-center pt-32 pb-10 sm:pt-36">
        <p className="eyebrow text-sun" data-reveal>
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Barrio San Luis · Siguatepeque
        </p>
        <h1
          id="hero-title"
          data-reveal
          style={{ ['--reveal-delay' as string]: '80ms' }}
          className="mt-5 max-w-4xl text-[clamp(2.9rem,8.5vw,6.6rem)] leading-[0.95] font-medium tracking-[-0.02em]"
        >
          El día se mide <br className="hidden sm:block" />
          en <em className="text-sun-300 font-normal">chapuzones.</em>
        </h1>
        <p
          data-reveal
          style={{ ['--reveal-delay' as string]: '160ms' }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/95 [text-shadow:0_1px_14px_rgb(12_40_48/0.7)] sm:text-xl"
        >
          Piscinas para grandes y pequeños, toboganes, jardines llenos de flores y un salón para celebrar.
          Todo en {site.name}, con las montañas de Siguatepeque de fondo.
        </p>
        <div
          data-reveal
          style={{ ['--reveal-delay' as string]: '240ms' }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a href={whatsappLink('general')} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsappIcon className="h-5 w-5" />
            Consultar disponibilidad
          </a>
          <a href="#instalaciones" className="btn-ghost-light">
            Ver instalaciones
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p
          data-reveal
          style={{ ['--reveal-delay' as string]: '320ms' }}
          className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/90 [text-shadow:0_1px_10px_rgb(12_40_48/0.8)]"
        >
          <Clock className="text-sun h-4 w-4" aria-hidden="true" />
          {hours.days}, {hours.open} – {hours.close}
          {!site.hours.verificado && <span className="text-white/75">(horario por confirmar)</span>}
        </p>
      </div>

      <nav aria-label="Servicios" className="bg-ink/30 relative border-t border-white/15 backdrop-blur-md">
        <ul className="container-x grid sm:grid-cols-3">
          {routes.map((r, i) => (
            <li key={r.href} className={i > 0 ? 'border-t border-white/15 sm:border-t-0 sm:border-l' : ''}>
              <a
                href={r.href}
                className={`group hover:text-sun-300 flex items-center justify-between gap-4 py-4 transition-colors sm:px-6 sm:py-6 ${i === 0 ? 'sm:pl-0' : ''} ${i === routes.length - 1 ? 'sm:pr-0' : ''}`}
              >
                <span>
                  <span className="block text-[0.7rem] font-bold tracking-[0.18em] text-white/60 uppercase">
                    {r.kicker}
                  </span>
                  <span className="font-display mt-1 block text-xl sm:text-2xl">{r.title}</span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
