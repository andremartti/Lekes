import { useRef, useState, type KeyboardEvent } from 'react'
import { WhatsappIcon } from './icons'
import { Photo } from './Photo'
import { whatsappLink, type WhatsappTopic } from '../config/site'
import type { PhotoId } from '../config/photos'

interface Experience {
  id: string
  tab: string
  title: string
  text: string
  points: string[]
  photo: PhotoId
  /** Encuadre de la foto en este panel (CSS object-position). */
  position?: string
  topic: WhatsappTopic
  cta: string
}

const experiences: Experience[] = [
  {
    id: 'familia',
    tab: 'En familia',
    title: 'Un domingo de piscina con toda la familia',
    text: 'Abuelos, papás y niños en el mismo lugar: piscinas para cada edad, sombra bajo los árboles y almuerzo sin tener que salir.',
    points: [
      'Piscinas para adultos y para niños',
      'Restaurante dentro del centro',
      'Área de descanso y jardines',
    ],
    photo: 'ninos-piscina',
    topic: 'familia',
    cta: 'Planear nuestra visita',
  },
  {
    id: 'amigos',
    tab: 'Con amigos',
    title: 'El plan de fin de semana con tu grupo',
    text: 'Toboganes, sol y una parrillada para compartir. Un día sin prisa para ponerse al día con los amigos.',
    points: ['Toboganes y cascadas', 'Parrillada familiar para compartir', 'Espacio para tomar el sol'],
    photo: 'kioscos-flores',
    position: '50% 65%',
    topic: 'grupos',
    cta: 'Consultar para un grupo',
  },
  {
    id: 'peques',
    tab: 'Los más pequeños',
    title: 'Un día entero de juego para los niños',
    text: 'Piscinas a su medida, figuras de delfines, juegos infantiles y, si quieren aprender, la academia de natación.',
    points: ['Piscina infantil con figuras', 'Juegos infantiles', 'Academia de natación'],
    photo: 'piscina-puente',
    position: '50% 45%',
    topic: 'familia',
    cta: 'Preguntar por los niños',
  },
  {
    id: 'celebrar',
    tab: 'Para celebrar',
    title: 'Fechas especiales que se celebran en grande',
    text: 'Cumpleaños, bautizos o reuniones familiares en el salón de eventos, dentro del mismo centro recreativo.',
    points: ['Salón para eventos', 'Cumpleaños, bautizos y más', 'Atención directa por WhatsApp'],
    photo: 'rancho-piscina',
    position: '50% 75%',
    topic: 'eventos',
    cta: 'Consultar por un evento',
  },
]

export function Experiences() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const exp = experiences[active]

  const onKeyDown = (e: KeyboardEvent) => {
    const last = experiences.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabs.current[next]?.focus()
    }
  }

  return (
    <section id="experiencias" aria-labelledby="exp-title" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-lagoon-500">Experiencias</p>
          <h2 id="exp-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Cada quien vive Leke's a su manera.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Formas de visitar Leke's"
          onKeyDown={onKeyDown}
          className="-mx-5 mt-10 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
          data-reveal
        >
          {experiences.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${x.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition-colors duration-300 ${
                i === active
                  ? 'bg-ink text-sand'
                  : 'bg-sand-200 text-ink/70 hover:bg-sand-200/60 hover:text-ink'
              }`}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${exp.id}`}
          aria-labelledby={`tab-${exp.id}`}
          className="mt-8 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div
            key={exp.photo}
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] motion-safe:animate-[fade_0.6s_ease-out] lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]"
          >
            {/* Posición absoluta: la altura la marca el texto, no el tamaño de la foto. */}
            <div className="absolute inset-0">
              <Photo id={exp.photo} position={exp.position} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </div>
          <div
            key={exp.id}
            className="flex flex-col justify-center motion-safe:animate-[fade_0.6s_ease-out] lg:col-span-5"
          >
            <h3 className="text-3xl leading-tight font-medium sm:text-4xl">{exp.title}</h3>
            <p className="text-ink/70 mt-5 text-lg leading-relaxed">{exp.text}</p>
            <ul className="border-ink/10 mt-7 space-y-3 border-t pt-6">
              {exp.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-semibold">
                  <span className="bg-water h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(exp.topic)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark mt-9 self-start"
            >
              <WhatsappIcon className="h-5 w-5" />
              {exp.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
