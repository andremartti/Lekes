import { CircleHelp } from 'lucide-react'
import { site, whatsappLink } from '../config/site'
import { WhatsappIcon } from './icons'
import { Photo } from './Photo'

/** Preguntas que los padres suelen hacer; se responden por WhatsApp hasta tener datos confirmados. */
const questions = [
  '¿Desde qué edad pueden inscribirse?',
  '¿Qué días y horarios tienen las clases?',
  '¿Cuánto cuesta la inscripción y la mensualidad?',
  '¿Qué deben llevar a la primera clase?',
]

export function Academy() {
  const details = site.academy.details
  return (
    <section
      id="natacion"
      aria-labelledby="nat-title"
      className="bg-sand-100 relative overflow-hidden py-24 sm:py-32"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative order-2 lg:order-1 lg:col-span-6" data-reveal>
          <div className="aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] sm:aspect-[5/5]">
            <Photo id="piscina-carriles" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 200 40"
            className="text-water absolute -right-4 -bottom-10 w-1/2 sm:-right-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M4 20c16-14 32-14 48 0s32 14 48 0 32-14 48 0 32 14 48 0" />
          </svg>
        </div>

        <div
          className="order-1 lg:order-2 lg:col-span-6"
          data-reveal
          style={{ ['--reveal-delay' as string]: '100ms' }}
        >
          <p className="eyebrow text-lagoon-500">Academia de natación</p>
          <h2 id="nat-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Que aprendan a nadar <em className="text-lagoon-700">donde más se divierten.</em>
          </h2>
          <p className="text-ink/70 mt-6 max-w-lg text-lg leading-relaxed">
            Leke's también tiene una academia de natación: una forma de que los niños ganen confianza en el
            agua, en un lugar que ya conocen y disfrutan.
          </p>

          {details.length > 0 ? (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl bg-white p-5">
                  <dt className="text-ink/55 text-xs font-bold tracking-[0.14em] uppercase">{d.label}</dt>
                  <dd className="font-display mt-1 text-xl">{d.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="mt-8 rounded-[1.5rem] bg-white p-6 sm:p-7">
              <p className="flex items-center gap-2 text-sm font-bold">
                <CircleHelp className="text-lagoon-500 h-5 w-5" aria-hidden="true" />
                Escríbenos y te respondemos:
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {questions.map((q) => (
                  <li
                    key={q}
                    className="bg-foam text-lagoon-900 rounded-xl px-4 py-3 text-sm leading-snug font-semibold"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={whatsappLink('natacion')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <WhatsappIcon className="h-5 w-5" />
            Información e inscripciones
          </a>
        </div>
      </div>
    </section>
  )
}
