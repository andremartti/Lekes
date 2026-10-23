import { photoSrc } from '../config/photos'
import { whatsappLink } from '../config/site'
import { WhatsappIcon } from './icons'
import { Photo } from './Photo'

/** Tipos de evento mencionados en las fuentes públicas (RadioHouse 2021, HondurasTips 2022). */
const occasions = ['Bodas', 'Bautizos', 'Quinceañeras', 'Cumpleaños', 'Baby showers', 'Conferencias']

const steps = [
  { n: '1', title: 'Escríbenos', text: 'Cuéntanos la fecha, el tipo de evento y cuántos invitados esperas.' },
  {
    n: '2',
    title: 'Recibe opciones',
    text: 'Te compartimos disponibilidad, condiciones y precios vigentes.',
  },
  { n: '3', title: 'Celebra', text: "Coordina los detalles directamente con el equipo de Leke's." },
]

export function Events() {
  // Mientras no haya foto del salón, se muestra una vista general del centro, rotulada como tal.
  const hasSalonPhoto = Boolean(photoSrc('salon'))
  return (
    <section
      id="eventos"
      aria-labelledby="ev-title"
      className="bg-lagoon-900 relative overflow-hidden py-24 text-white sm:py-32"
    >
      <svg
        aria-hidden="true"
        className="text-sand-100 absolute -top-px left-0 w-full"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 0h1440v14c-120 18-240 18-360 0S840-4 720 14 480 32 360 14 120-4 0 14Z" />
      </svg>

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow text-sun">Eventos y celebraciones</p>
          <h2 id="ev-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Un salón amplio para las fechas que <em className="text-sun-300">no se olvidan.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Leke's cuenta con salón para eventos con espacios amplios. Organiza tu celebración en un lugar
            rodeado de árboles y flores.
          </p>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3" aria-label="Tipos de evento">
            {occasions.map((o) => (
              <li
                key={o}
                className="font-display flex items-center gap-3 text-xl text-white/95 italic sm:text-[1.75rem]"
              >
                <span className="bg-sun h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink('eventos')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            <WhatsappIcon className="h-5 w-5" />
            Cotizar mi evento
          </a>
          <p className="mt-4 text-sm text-white/60">
            Capacidad, paquetes y precios se confirman directamente con Leke's.
          </p>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
          <div className="group relative aspect-[16/11] overflow-hidden rounded-[2rem]">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Photo
                id={hasSalonPhoto ? 'salon' : 'panoramica-kioscos'}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
            {!hasSalonPhoto && (
              <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                Vista general de Leke's
              </p>
            )}
          </div>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="border-t border-white/20 pt-5">
                <span className="font-display text-sun-300 text-3xl italic">{s.n}</span>
                <h3 className="mt-2 font-sans text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
