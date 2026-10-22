import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { mapsLink, site } from './src/config/site.ts'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Inserta en index.html el SEO que depende de src/config/site.ts
 * (título, metadescripción, Open Graph y datos estructurados) y genera
 * robots.txt y sitemap.xml al compilar. Así los datos viven en un solo lugar.
 */
function seo(): Plugin {
  const title = `${site.name} | Piscinas y eventos en Siguatepeque`
  // SITE_URL permite fijar el dominio al compilar (lo usa la vista previa de GitHub Pages).
  const url = (process.env.SITE_URL || site.siteUrl).replace(/\/$/, '')
  // PREVIEW=1 marca la compilación como demo: no se indexa en buscadores.
  const preview = process.env.PREVIEW === '1'
  const ogImage = `${url}/og-image.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristAttraction'],
    name: site.name,
    description: site.description,
    telephone: `+${site.contact.phoneE164}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    hasMap: mapsLink,
    sameAs: [site.social.facebook, site.social.instagram],
    ...(site.hours.verificado ? { openingHours: site.hours.schema } : {}),
    ...(url ? { url, image: ogImage } : {}),
  }

  const tags = [
    `<title>${escape(title)}</title>`,
    ...(preview ? [`<meta name="robots" content="noindex, nofollow" />`] : []),
    `<meta name="description" content="${escape(site.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_HN" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(site.description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(url
      ? [`<link rel="canonical" href="${url}/" />`, `<meta property="og:url" content="${url}/" />`]
      : []),
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ]

  return {
    name: 'lekes-seo',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', tags.join('\n    ')),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: preview
          ? 'User-agent: *\nDisallow: /\n'
          : `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`,
      })
      if (url && !preview) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig({
  // Rutas relativas: el sitio funciona en la raíz de un dominio o en una subcarpeta (GitHub Pages).
  base: './',
  plugins: [react(), tailwindcss(), seo()],
})
