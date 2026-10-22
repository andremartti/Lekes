import { CircleAlert, Clock, MapPin, Navigation, Phone, Ticket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { directionsLink, mapsEmbed, mapsLink, phoneLink, site, wazeLink, whatsappLink } from '../config/site'
import { WhatsappIcon } from './icons'

function PendingBadge() {
  return (
    <span className="bg-sun/25 text-ink inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold">
      <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
      Confirmar antes de visitar
    </span>
  )
}

/** El mapa se carga solo cuando está cerca de la pantalla para no frenar la página. */
function LazyMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative h-full min-h-80 overflow-hidden rounded-[2rem] bg-white">
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lagoon-700 absolute inset-0 flex flex-col items-center justify-center gap-3 text-center font-bold"
      >
        <MapPin className="h-8 w-8" aria-hidden="true" />
        Ver ubicación en Google Maps
      </a>
      {show && (
        <iframe
          title={`Mapa de ubicación de ${site.name}`}
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  )
}

export function Visit() {
  const hasPrices = site.prices.length > 0
  return (
    <section id="visita" aria-labelledby="visita-title" className="bg-foam py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-lagoon-500">Planifica tu visita</p>
          <h2 id="visita-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Todo lo que necesitas saber antes de venir.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Horario */}
          <article data-reveal className="rounded-[2rem] bg-white p-7 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <Clock className="text-lagoon-500 h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              {!site.hours.verificado && <PendingBadge />}
            </div>
            <h3 className="mt-6 text-2xl font-medium">Horario</h3>
            <dl className="mt-4 space-y-3">
              {site.hours.rows.map((r) => (
                <div
                  key={r.days}
                  className="border-ink/10 flex flex-wrap items-baseline justify-between gap-2 border-b pb-3"
                >
                  <dt className="font-semibold">{r.days}</dt>
                  <dd className="font-display text-xl">
                    {r.open} – {r.close}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-ink/60 mt-4 text-sm leading-relaxed">
              En feriados y temporadas especiales el horario puede variar.
            </p>
          </article>

          {/* Precios */}
          <article
            data-reveal
            style={{ ['--reveal-delay' as string]: '80ms' }}
            className="bg-ink text-sand flex flex-col rounded-[2rem] p-7 sm:p-8"
          >
            <Ticket className="text-sun h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-medium">Precios de entrada</h3>
            {hasPrices ? (
              <>
                <dl className="mt-4 space-y-3">
                  {site.prices.map((p) => (
                    <div key={p.label} className="border-b border-white/15 pb-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <dt className="font-semibold">{p.label}</dt>
                        <dd className="font-display text-sun-300 text-xl">{p.price}</dd>
                      </div>
                      {p.note && <p className="mt-1 text-sm text-white/60">{p.note}</p>}
                    </div>
                  ))}
                </dl>
                {site.pricesNote && <p className="mt-4 text-sm text-white/60">{site.pricesNote}</p>}
              </>
            ) : (
              <p className="mt-4 leading-relaxed text-white/75">
                Consulta nuestros precios y condiciones por WhatsApp. Te respondemos con las tarifas vigentes
                para adultos, niños y tercera edad.
              </p>
            )}
            <a
              href={whatsappLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 self-start"
            >
              <WhatsappIcon className="h-5 w-5" />
              Consultar precios
            </a>
          </article>

          {/* Normas */}
          <article
            data-reveal
            style={{ ['--reveal-delay' as string]: '160ms' }}
            className="rounded-[2rem] bg-white p-7 sm:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <CircleAlert className="text-lagoon-500 h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              {!site.rules.verificado && <PendingBadge />}
            </div>
            <h3 className="mt-6 text-2xl font-medium">Antes de entrar</h3>
            <ul className="mt-4 space-y-3">
              {site.rules.items.map((r) => (
                <li key={r} className="border-ink/10 flex gap-3 border-b pb-3 leading-snug">
                  <span className="bg-hibiscus mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-ink/60 mt-4 text-sm leading-relaxed">
              Dentro del centro hay restaurante para comer y beber.
            </p>
          </article>
        </div>

        {/* Ubicación */}
        <div id="ubicacion" className="mt-5 grid gap-5 lg:grid-cols-12">
          <div data-reveal className="flex flex-col rounded-[2rem] bg-white p-7 sm:p-10 lg:col-span-5">
            <MapPin className="text-lagoon-500 h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
            <h3 className="mt-6 text-3xl font-medium">Cómo llegar</h3>
            <address className="text-ink/75 mt-4 text-lg leading-relaxed not-italic">
              {site.address.street}
              <br />
              {site.address.neighborhood}
              <br />
              {site.address.city}, {site.address.region}, {site.address.country}
            </address>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={directionsLink} target="_blank" rel="noopener noreferrer" className="btn-dark">
                <Navigation className="h-4.5 w-4.5" aria-hidden="true" />
                Google Maps
              </a>
              <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Abrir en Waze
              </a>
            </div>

            <div className="border-ink/10 mt-8 space-y-3 border-t pt-6">
              <a href={phoneLink} className="hover:text-lagoon-700 flex items-center gap-3 font-semibold">
                <Phone className="text-lagoon-500 h-5 w-5" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={whatsappLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-lagoon-700 flex items-center gap-3 font-semibold"
              >
                <WhatsappIcon className="h-5 w-5 text-[#1a9e4b]" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
          <div data-reveal style={{ ['--reveal-delay' as string]: '100ms' }} className="lg:col-span-7">
            <LazyMap />
          </div>
        </div>
      </div>
    </section>
  )
}
