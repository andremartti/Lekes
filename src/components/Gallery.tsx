import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { galleryOrder, photos, photoSrc } from '../config/photos'
import { site } from '../config/site'
import { FacebookIcon, InstagramIcon } from './icons'
import { Photo } from './Photo'

/** Patrón de mosaico: algunas fotos ocupan más espacio para romper la cuadrícula. */
const spans = [
  'sm:col-span-2 sm:row-span-2',
  '',
  'sm:row-span-2',
  '',
  'sm:col-span-2',
  '',
  '',
  'sm:row-span-2',
  '',
  'sm:col-span-2',
  '',
  '',
  '',
  '',
]

export function Gallery() {
  const available = galleryOrder.filter((id) => photoSrc(id))
  const hasPhotos = available.length > 0
  const items = hasPhotos ? available : galleryOrder.slice(0, 7)
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="galeria" aria-labelledby="gal-title" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow text-lagoon-500">Galería</p>
            <h2 id="gal-title" className="mt-4 max-w-xl text-4xl leading-[1.05] font-medium sm:text-5xl">
              Así se ve un día en Leke's.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="text-ink/60">Más fotos en</span>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink/15 hover:border-ink hover:bg-ink hover:text-sand inline-flex h-11 items-center gap-2 rounded-full border px-4 transition-colors"
            >
              <FacebookIcon className="h-4.5 w-4.5" /> Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink/15 hover:border-ink hover:bg-ink hover:text-sand inline-flex h-11 items-center gap-2 rounded-full border px-4 transition-colors"
            >
              <InstagramIcon className="h-4.5 w-4.5" /> Instagram
            </a>
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-4 sm:gap-4">
          {items.map((id, i) => (
            <li
              key={id}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}
              className={`overflow-hidden rounded-[1.5rem] ${i === 0 ? 'col-span-2 row-span-2' : ''} ${spans[i] ?? ''}`}
            >
              {hasPhotos ? (
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block h-full w-full cursor-zoom-in"
                  aria-label={`Ampliar foto: ${photos[id].alt}`}
                >
                  <span className="block h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <Photo id={id} sizes="(min-width: 640px) 25vw, 50vw" />
                  </span>
                  <span className="text-ink absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              ) : (
                <Photo id={id} compact={i !== 0} />
              )}
            </li>
          ))}
        </ul>
        {!hasPhotos && (
          <p className="text-ink/55 mt-5 text-sm">
            Galería lista para las fotos del establecimiento: al agregarlas se activa la vista ampliada.
          </p>
        )}
      </div>

      {index !== null && (
        <Lightbox ids={available} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </section>
  )
}

interface LightboxProps {
  ids: typeof galleryOrder
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

function Lightbox({ ids, index, onIndex, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const count = ids.length
  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex])
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') {
        // Mantiene el foco dentro del visor.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  const id = ids[index]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galería ampliada"
      className="bg-ink/95 fixed inset-0 z-[60] flex flex-col backdrop-blur-sm motion-safe:animate-[fade_0.3s_ease-out]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between p-4 text-white sm:p-6">
        <p className="text-sm font-semibold text-white/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Cerrar galería"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20 sm:pb-10"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img
          key={id}
          src={photoSrc(id)}
          alt={photos[id].alt}
          className="max-h-full max-w-full rounded-xl object-contain motion-safe:animate-[fade_0.35s_ease-out]"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 left-2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 right-2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      <p className="px-4 pb-6 text-center text-sm text-white/75">{photos[id].alt}</p>
    </div>
  )
}
