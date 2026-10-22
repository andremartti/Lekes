/**
 * Información comercial editable de Centro Recreativo Leke's.
 *
 * Todo lo que el negocio necesite cambiar (teléfono, horarios, precios,
 * redes, fotos, textos de WhatsApp) vive aquí. El resto del sitio lee
 * estos valores, así que no hace falta buscar por todo el código.
 *
 * Fuentes públicas consultadas (oct. 2026):
 *  - hondurastips.hn (abr. 2022)
 *  - honduras.com (actualizado abr. 2023)
 *  - radiohouse.hn (ago. 2021)
 *  - Waze / ficha de Google Maps (dirección)
 * Los campos marcados con `verificado: false` provienen de esas fuentes
 * pero no se han podido confirmar como vigentes: pídelo al propietario y
 * cambia la marca a `true` cuando estén confirmados.
 */

export const site = {
  /** Nombre comercial tal como aparece en las fuentes públicas. */
  name: "Centro Recreativo Leke's",
  shortName: "Leke's",
  tagline: 'Piscinas, áreas verdes y celebraciones en Siguatepeque',

  /**
   * Dominio definitivo del sitio, sin barra final (ej. "https://www.lekes.hn").
   * Mientras esté vacío no se generan sitemap.xml, canonical ni og:url.
   */
  siteUrl: '',

  description:
    "Centro Recreativo Leke's en Siguatepeque, Comayagua: piscinas para adultos y niños, toboganes, áreas verdes, restaurante y salón para bodas, bautizos, quinceañeras y cumpleaños. Consulta precios y horarios por WhatsApp.",

  contact: {
    /** Número en formato internacional, solo dígitos (para enlaces wa.me y tel:). */
    phoneE164: '50497481038',
    /** Número tal como se muestra en pantalla. */
    phoneDisplay: '+504 9748-1038',
    /** Publicado como WhatsApp en hondurastips.hn (2022) y como teléfono en 2021 y 2023. */
    verificado: false,
  },

  address: {
    street: '7.ª avenida NO y 6.ª calle',
    neighborhood: 'Barrio San Luis de Aguas Calientes',
    city: 'Siguatepeque',
    region: 'Comayagua',
    country: 'Honduras',
    countryCode: 'HN',
  },

  maps: {
    /** Ficha de Google Maps (place_id obtenido de Waze). */
    placeId: 'ChIJexHSinOVZY8RFKY-HHNVPWQ',
    query: "Centro Recreativo Leke's, Siguatepeque, Honduras",
  },

  social: {
    facebook: 'https://www.facebook.com/Lekessiguatepeque/',
    instagram: 'https://www.instagram.com/lekes_36/',
    instagramHandle: '@lekes_36',
  },

  /** Horario publicado en 2022 y 2023. Confírmalo antes de marcarlo como verificado. */
  hours: {
    verificado: false,
    rows: [{ days: 'Lunes a domingo', open: '9:00 a. m.', close: '5:00 p. m.' }],
    /** Formato schema.org para los datos estructurados. */
    schema: ['Mo-Su 09:00-17:00'],
  },

  /**
   * Precios de entrada. Déjalo vacío hasta que el negocio confirme tarifas
   * vigentes; mientras tanto el sitio invita a consultarlas por WhatsApp.
   * Ejemplo: [{ label: 'Adultos', price: 'L 120' }, { label: 'Niños', price: 'L 100', note: 'Menores de 5 años no pagan' }]
   */
  prices: [] as { label: string; price: string; note?: string }[],
  pricesNote: '',

  /** Normas publicadas por hondurastips.hn (2022). */
  /**
   * Academia de natación: mencionada en el Facebook del negocio. Horarios,
   * edades y costos se dejan vacíos hasta que el propietario los confirme.
   */
  academy: {
    verificado: false,
    details: [] as { label: string; value: string }[],
  },

  rules: {
    verificado: false,
    items: [
      'No se permite ingresar comida ni bebidas.',
      'Se admiten mascotas; cada dueño es responsable de la suya.',
    ],
  },
} as const

/** Mensajes predefinidos para cada botón de WhatsApp. */
export const whatsappMessages = {
  general: `Hola, quisiera conocer los precios y horarios de ${site.name}.`,
  instalaciones: "Hola, quisiera información sobre las instalaciones de Leke's.",
  natacion:
    "Hola, quisiera información sobre la academia de natación de Leke's: edades, horarios y cómo inscribir.",
  eventos: "Hola, quisiera consultar sobre la organización de un evento en Leke's.",
  familia: "Hola, estamos planeando un día en familia en Leke's. ¿Me pueden dar precios y horarios?",
  grupos: "Hola, queremos visitar Leke's con un grupo de amigos. ¿Qué debemos saber?",
  restaurante: "Hola, quisiera información sobre el restaurante de Leke's.",
} as const

export type WhatsappTopic = keyof typeof whatsappMessages

export function whatsappLink(topic: WhatsappTopic = 'general') {
  return `https://wa.me/${site.contact.phoneE164}?text=${encodeURIComponent(whatsappMessages[topic])}`
}

export const phoneLink = `tel:+${site.contact.phoneE164}`

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.maps.query,
)}&query_place_id=${site.maps.placeId}`

export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.maps.query,
)}&destination_place_id=${site.maps.placeId}`

export const wazeLink = `https://www.waze.com/live-map/directions/hn/departamento-de-comayagua/siguatepeque/centro-recreativo-lekes?to=place.${site.maps.placeId}`

/** Mapa embebido sin clave de API. */
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.maps.query)}&output=embed`

export const fullAddress = `${site.address.street}, ${site.address.neighborhood}, ${site.address.city}, ${site.address.region}`
