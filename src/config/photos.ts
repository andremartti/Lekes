/**
 * Fotografías del sitio.
 *
 * Cada foto vive en `src/assets/fotos/` con el nombre indicado en `file`
 * (se aceptan .jpg, .jpeg, .png, .webp o .avif). Vite la optimiza y la
 * publica con un nombre único. Para cambiar una foto basta con reemplazar
 * el archivo manteniendo el nombre.
 *
 * `restaurante` y `salon` aún no tienen foto: al agregar `restaurante.jpg`
 * o `salon.jpg`, las secciones de restaurante y eventos las muestran solas.
 *
 * Usa solo fotos propias del establecimiento o con permiso de su autor.
 * Recomendado: lado mayor de 1600–2400 px, comprimidas a menos de 400 KB.
 */

export type PhotoId =
  | 'hero'
  | 'kioscos-flores'
  | 'piscina-puente'
  | 'piscina-delfin'
  | 'jardin-arcos'
  | 'piscina-carriles'
  | 'vista-aerea'
  | 'torre-roca'
  | 'rancho-piscina'
  | 'panoramica-kioscos'
  | 'ninos-piscina'
  | 'restaurante'
  | 'salon'

export type PhotoTone = 'lagoon' | 'water' | 'leaf' | 'sun'

export interface PhotoInfo {
  /** Nombre del archivo sin extensión dentro de src/assets/fotos/. */
  file: string
  /** Texto alternativo descriptivo para lectores de pantalla y buscadores. */
  alt: string
  /** Qué debe mostrar la foto (se ve en el espacio vacío si falta). */
  brief: string
  tone: PhotoTone
  /** Punto de la foto que se mantiene visible al recortarla (CSS object-position). */
  position?: string
}

export const photos: Record<PhotoId, PhotoInfo> = {
  hero: {
    file: 'hero',
    alt: "Piscinas y kioscos de Leke's rodeados de palmeras, con las montañas de Siguatepeque de fondo",
    brief: 'Vista amplia de las piscinas',
    tone: 'water',
    position: '55% 60%',
  },
  'kioscos-flores': {
    file: 'kioscos-flores',
    alt: 'Kioscos con mesas de piedra y banderines de colores junto a la piscina, entre palmeras y flores',
    brief: 'Kioscos junto a la piscina',
    tone: 'sun',
  },
  'piscina-puente': {
    file: 'piscina-puente',
    alt: 'Piscina con puente de madera, figura decorativa y juegos infantiles al fondo',
    brief: 'Piscina con puente de madera',
    tone: 'water',
  },
  'piscina-delfin': {
    file: 'piscina-delfin',
    alt: 'Piscina redonda con puente de madera, kioscos y un tobogán al fondo',
    brief: 'Piscina con puente y tobogán',
    tone: 'water',
  },
  'jardin-arcos': {
    file: 'jardin-arcos',
    alt: 'Sendero con arcos cubiertos de flores y mesas de piedra en los jardines',
    brief: 'Jardines con arcos de flores',
    tone: 'leaf',
  },
  'piscina-carriles': {
    file: 'piscina-carriles',
    alt: 'Piscina con carriles para nadar, decorada con banderines de colores',
    brief: 'Piscina con carriles',
    tone: 'lagoon',
  },
  'vista-aerea': {
    file: 'vista-aerea',
    alt: "Vista aérea de las piscinas y los toboganes de Leke's",
    brief: 'Vista aérea',
    tone: 'leaf',
  },
  'torre-roca': {
    file: 'torre-roca',
    alt: 'Piscina junto a la torre de roca, con sillas para tomar el sol',
    brief: 'Piscina y torre de roca',
    tone: 'water',
  },
  'rancho-piscina': {
    file: 'rancho-piscina',
    alt: 'Rancho techado junto a la piscina en un día soleado',
    brief: 'Rancho junto a la piscina',
    tone: 'sun',
  },
  'panoramica-kioscos': {
    file: 'panoramica-kioscos',
    alt: 'Kioscos con mesas, piscinas y juegos infantiles, con las montañas de fondo',
    brief: 'Vista general de las piscinas',
    tone: 'leaf',
  },
  'ninos-piscina': {
    file: 'ninos-piscina',
    alt: 'Bañistas en una piscina redonda, con el puente de madera y los kioscos al fondo',
    brief: 'Bañistas en la piscina',
    tone: 'water',
  },
  restaurante: {
    file: 'restaurante',
    alt: "Platillo del restaurante de Leke's",
    brief: 'Parrillada, carnitas o pollo con tajadas',
    tone: 'sun',
  },
  salon: {
    file: 'salon',
    alt: "Salón de eventos de Leke's decorado para una celebración",
    brief: 'Salón de eventos montado para una celebración',
    tone: 'lagoon',
  },
}

/**
 * Orden de la galería. Está pensado para el mosaico de 4 columnas de
 * Gallery.tsx (`spans`): la primera foto es horizontal y ocupa 2×2, la 5.ª
 * y la 7.ª son horizontales y ocupan 2 columnas, y las demás son verticales.
 */
export const galleryOrder: PhotoId[] = [
  'hero',
  'piscina-delfin',
  'jardin-arcos',
  'piscina-puente',
  'panoramica-kioscos',
  'piscina-carriles',
  'ninos-piscina',
  'kioscos-flores',
  'vista-aerea',
  'rancho-piscina',
  'torre-roca',
]

const files = import.meta.glob<string>('../assets/fotos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

const byName = new Map<string, string>()
for (const [path, url] of Object.entries(files)) {
  const name = path
    .split('/')
    .pop()!
    .replace(/\.[^.]+$/, '')
  byName.set(name, url)
}

/** URL de la foto si el archivo existe, o undefined si aún falta. */
export function photoSrc(id: PhotoId): string | undefined {
  return byName.get(photos[id].file)
}
