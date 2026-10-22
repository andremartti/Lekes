import { Camera } from 'lucide-react'
import { photos, photoSrc, type PhotoId, type PhotoTone } from '../config/photos'

const toneBg: Record<PhotoTone, string> = {
  water: 'radial-gradient(120% 90% at 20% 10%, #5cc8c4 0%, #1f9aa0 38%, #0f5866 100%)',
  lagoon: 'radial-gradient(120% 90% at 80% 0%, #2a8f99 0%, #0f5866 45%, #0b3a44 100%)',
  leaf: 'radial-gradient(120% 90% at 15% 15%, #8dbb83 0%, #4c875c 45%, #2c5a3e 100%)',
  sun: 'radial-gradient(120% 90% at 85% 10%, #fbd98a 0%, #eea94a 45%, #c9763a 100%)',
}

interface PhotoProps {
  id: PhotoId
  className?: string
  /** Prioriza la carga (solo para la imagen principal visible al entrar). */
  priority?: boolean
  sizes?: string
  /** Oculta la etiqueta del espacio vacío (útil en miniaturas). */
  compact?: boolean
}

/**
 * Muestra la foto real si existe en src/assets/fotos/; si no, un espacio
 * de diseño claramente identificado como "foto pendiente".
 */
export function Photo({ id, className = '', priority, sizes, compact }: PhotoProps) {
  const info = photos[id]
  const src = photoSrc(id)

  if (src) {
    return (
      <img
        src={src}
        alt={info.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${info.alt} (fotografía pendiente)`}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: toneBg[info.tone] }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-30 mix-blend-soft-light"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
      >
        <defs>
          <pattern id={`ripple-${id}`} width="80" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M0 14 Q 20 2 40 14 T 80 14"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#ripple-${id})`} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute -right-16 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
      />
      {!compact && (
        <div className="absolute inset-x-0 bottom-0 flex items-end p-4 sm:p-5">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur-md">
            <Camera className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Foto pendiente · {info.brief}</span>
          </span>
        </div>
      )}
    </div>
  )
}
