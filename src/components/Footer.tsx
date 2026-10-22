import { directionsLink, phoneLink, site, whatsappLink } from '../config/site'
import { Logo, navItems } from './Header'
import { FacebookIcon, InstagramIcon, WhatsappIcon } from './icons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-sand pt-20 pb-28 sm:pb-12">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <p className="font-display max-w-2xl text-4xl leading-[1.05] sm:text-5xl">
            ¿Listos para un día de agua y sol? <em className="text-sun-300">Te esperamos.</em>
          </p>
          <a
            href={whatsappLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary self-start lg:self-auto"
          >
            <WhatsappIcon className="h-5 w-5" />
            Escríbenos por WhatsApp
          </a>
        </div>

        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}.</p>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
              Visítanos
            </h2>
            <address className="mt-4 text-sm leading-relaxed text-white/80 not-italic">
              {site.address.street}
              <br />
              {site.address.neighborhood}
              <br />
              {site.address.city}, {site.address.region}
            </address>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sun-300 mt-3 inline-block text-sm font-bold"
            >
              Cómo llegar
            </a>
          </div>

          <div>
            <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href={phoneLink} className="link-underline">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Leke's"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de Leke's (${site.social.instagramHandle})`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Secundaria">
            <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-white/50 uppercase">Explora</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/80 lg:grid-cols-1">
              {[
                ...navItems,
                { id: 'galeria', label: 'Galería' },
                { id: 'preguntas', label: 'Preguntas frecuentes' },
              ].map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/45">
          © {year} {site.name}. Siguatepeque, Honduras.
        </p>
      </div>
    </footer>
  )
}
