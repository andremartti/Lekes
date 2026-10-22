/**
 * Fotografías del sitio.
 *
 * Para usar una foto real basta con copiarla a `src/assets/fotos/` con el
 * nombre indicado en `file` (se aceptan .jpg, .jpeg, .png, .webp o .avif).
 * Vite la optimiza y la publica con un nombre único; mientras falte, el
 * sitio muestra un espacio de diseño con la descripción de la foto esperada.
 *
 * Usa solo fotos propias del establecimiento o con permiso de su autor.
 * Recomendado: lado mayor de 1600–2400 px, comprimidas a menos de 400 KB.
 */

export type PhotoId =
  | 'hero'
  | 'piscina-adultos'
  | 'piscina-ninos'
  | 'toboganes'
  | 'areas-verdes'
  | 'juegos'
  | 'restaurante'
  | 'salon'
  | 'academia'
  | 'familia'
  | 'amigos'
  | 'celebracion'
  | 'galeria-1'
  | 'galeria-2'
  | 'galeria-3'
  | 'galeria-4'
  | 'galeria-5'
  | 'galeria-6'

export type PhotoTone = 'lagoon' | 'water' | 'leaf' | 'sun'

export interface PhotoInfo {
  /** Nombre del archivo sin extensión dentro de src/assets/fotos/. */
  file: string
  /** Texto alternativo descriptivo para lectores de pantalla y buscadores. */
  alt: string
  /** Qué debe mostrar la foto (se ve en el espacio vacío). */
  brief: string
  tone: PhotoTone
}

export const photos: Record<PhotoId, PhotoInfo> = {
  hero: {
    file: 'hero',
    alt: "Vista de las piscinas del Centro Recreativo Leke's en Siguatepeque",
    brief: 'Vista amplia de la piscina principal en un día soleado',
    tone: 'water',
  },
  'piscina-adultos': {
    file: 'piscina-adultos',
    alt: "Piscina para adultos en Leke's",
    brief: 'Piscina para adultos',
    tone: 'water',
  },
  'piscina-ninos': {
    file: 'piscina-ninos',
    alt: "Piscina para niños con figuras decorativas en Leke's",
    brief: 'Piscina infantil y sus figuras',
    tone: 'lagoon',
  },
  toboganes: {
    file: 'toboganes',
    alt: "Toboganes, cascadas y puentes sobre las piscinas de Leke's",
    brief: 'Toboganes, delfines, cascadas o puentes',
    tone: 'water',
  },
  'areas-verdes': {
    file: 'areas-verdes',
    alt: "Áreas verdes con árboles y flores en Leke's",
    brief: 'Jardines, árboles y flores del lugar',
    tone: 'leaf',
  },
  juegos: {
    file: 'juegos',
    alt: "Área de juegos infantiles en Leke's",
    brief: 'Juegos infantiles y área de descanso',
    tone: 'sun',
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
  academia: {
    file: 'academia',
    alt: "Clase de natación en la academia de Leke's",
    brief: 'Clase de la academia de natación (con permiso de las familias)',
    tone: 'water',
  },
  familia: {
    file: 'familia',
    alt: "Familia disfrutando de la piscina en Leke's",
    brief: 'Familia en la piscina (con permiso de las personas)',
    tone: 'water',
  },
  amigos: {
    file: 'amigos',
    alt: "Grupo de amigos pasando el día en Leke's",
    brief: 'Grupo de amigos junto a la piscina',
    tone: 'sun',
  },
  celebracion: {
    file: 'celebracion',
    alt: "Celebración familiar en Leke's",
    brief: 'Cumpleaños o reunión familiar',
    tone: 'leaf',
  },
  'galeria-1': {
    file: 'galeria-1',
    alt: "Instalaciones de Leke's",
    brief: 'Foto de galería 1',
    tone: 'water',
  },
  'galeria-2': {
    file: 'galeria-2',
    alt: "Instalaciones de Leke's",
    brief: 'Foto de galería 2',
    tone: 'leaf',
  },
  'galeria-3': {
    file: 'galeria-3',
    alt: "Instalaciones de Leke's",
    brief: 'Foto de galería 3',
    tone: 'lagoon',
  },
  'galeria-4': { file: 'galeria-4', alt: "Instalaciones de Leke's", brief: 'Foto de galería 4', tone: 'sun' },
  'galeria-5': {
    file: 'galeria-5',
    alt: "Instalaciones de Leke's",
    brief: 'Foto de galería 5',
    tone: 'water',
  },
  'galeria-6': {
    file: 'galeria-6',
    alt: "Instalaciones de Leke's",
    brief: 'Foto de galería 6',
    tone: 'leaf',
  },
}

/** Orden de la galería: las fotos de secciones también aparecen aquí. */
export const galleryOrder: PhotoId[] = [
  'hero',
  'piscina-ninos',
  'toboganes',
  'areas-verdes',
  'salon',
  'academia',
  'restaurante',
  'juegos',
  'galeria-1',
  'galeria-2',
  'galeria-3',
  'galeria-4',
  'galeria-5',
  'galeria-6',
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
