import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, whatsappLink } from '../config/site'

const hours = site.hours.rows.map((r) => `${r.days.toLowerCase()}, de ${r.open} a ${r.close}`).join('; ')
const confirm = ' Te recomendamos confirmarlo por WhatsApp antes de tu visita.'

function Wa({ children }: { children: ReactNode }) {
  return (
    <a
      href={whatsappLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lagoon-700 font-bold underline underline-offset-4"
    >
      {children}
    </a>
  )
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: '¿Cuál es el horario de atención?',
    a: (
      <>
        El horario publicado es {hours}.{!site.hours.verificado && confirm}
      </>
    ),
  },
  {
    q: '¿Cuánto cuesta la entrada?',
    a:
      site.prices.length > 0 ? (
        site.prices.map((p) => `${p.label}: ${p.price}`).join(' · ')
      ) : (
        <>
          Las tarifas pueden cambiar según la temporada. <Wa>Escríbenos por WhatsApp</Wa> y te compartimos los
          precios vigentes.
        </>
      ),
  },
  {
    q: '¿Qué instalaciones hay?',
    a: 'Piscinas para adultos y para niños, toboganes, figuras de delfines, pequeñas cascadas y puentes, áreas verdes, juegos infantiles, área de descanso, restaurante y salón para eventos.',
  },
  {
    q: '¿Tienen clases de natación?',
    a: (
      <>
        Sí, Leke's tiene una academia de natación. Para edades, horarios e inscripciones,{' '}
        <a
          href={whatsappLink('natacion')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lagoon-700 font-bold underline underline-offset-4"
        >
          escríbenos por WhatsApp
        </a>
        .
      </>
    ),
  },
  {
    q: '¿Se pueden organizar eventos?',
    a: (
      <>
        Sí. Hay salón para eventos como bodas, bautizos, quinceañeras, cumpleaños, baby showers y
        conferencias. La disponibilidad, capacidad y precios se cotizan{' '}
        <a
          href={whatsappLink('eventos')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lagoon-700 font-bold underline underline-offset-4"
        >
          directamente por WhatsApp
        </a>
        .
      </>
    ),
  },
  {
    q: '¿Cómo llego?',
    a: (
      <>
        Estamos en {site.address.street}, {site.address.neighborhood}, {site.address.city}.{' '}
        <a href="#ubicacion" className="text-lagoon-700 font-bold underline underline-offset-4">
          Ver el mapa y abrir indicaciones
        </a>
        .
      </>
    ),
  },
  {
    q: '¿Puedo llevar comida o bebidas?',
    a: (
      <>
        Según la información publicada, no se permite ingresar comida ni bebidas; dentro del centro hay
        restaurante.{!site.rules.verificado && confirm}
      </>
    ),
  },
  {
    q: '¿Se permiten mascotas?',
    a: (
      <>
        Según la información publicada, sí se admiten mascotas, bajo la responsabilidad de su dueño.
        {!site.rules.verificado && confirm}
      </>
    ),
  },
  {
    q: '¿Cómo puedo consultar o reservar?',
    a: (
      <>
        La forma más rápida es por <Wa>WhatsApp al {site.contact.phoneDisplay}</Wa>. También puedes
        escribirnos en Facebook o Instagram.
      </>
    ),
  },
]

export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow text-lagoon-500">Preguntas frecuentes</p>
          <h2 id="faq-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Lo que más nos preguntan.
          </h2>
          <p className="text-ink/65 mt-5">¿No encuentras tu respuesta?</p>
          <a
            href={whatsappLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-4"
          >
            Pregúntanos por WhatsApp
          </a>
        </div>
        <div className="lg:col-span-8" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
          {faqs.map((f) => (
            <details key={f.q} className="group border-ink/12 border-b first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="border-ink/15 group-open:bg-ink group-open:text-sand inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <div className="text-ink/70 max-w-2xl pb-7 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
