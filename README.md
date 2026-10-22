# Sitio web · Centro Recreativo Leke's

Página de una sola sección para Centro Recreativo Leke's (Siguatepeque, Comayagua, Honduras): piscinas,
academia de natación, salón para eventos, ubicación y contacto por WhatsApp.

Hecha con React, TypeScript, Vite, Tailwind CSS y Lucide. No necesita backend.

## Ejecutar

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # compila a la carpeta dist/
npm run preview   # revisa la versión compilada
```

## Dónde se edita cada cosa

| Qué                                                                             | Archivo                    |
| ------------------------------------------------------------------------------- | -------------------------- |
| Nombre, teléfono, WhatsApp, dirección, redes, horario y precios                 | `src/config/site.ts`       |
| Mensajes predefinidos de WhatsApp                                               | `src/config/site.ts`       |
| Fotografías (archivos)                                                          | `src/assets/fotos/`        |
| Textos alternativos de las fotos y orden de la galería                          | `src/config/photos.ts`     |
| Colores y tipografías                                                           | `src/index.css` (`@theme`) |
| Título, descripción, Open Graph y datos estructurados (se generan de `site.ts`) | `vite.config.ts`           |

### Fotografías

Copia las fotos a `src/assets/fotos/` con los nombres de `src/assets/fotos/LEEME.md` (por ejemplo `hero.jpg`,
`salon.jpg`, `academia.jpg`). El sitio las detecta solo; mientras falten, muestra un espacio marcado como
"Foto pendiente". La galería ampliable se activa al haber al menos una foto.

### Datos pendientes de confirmar con el negocio

Los siguientes datos vienen de guías turísticas de 2021–2023 y están marcados con `verificado: false`. La
página los muestra con la etiqueta "Confirmar antes de visitar":

- [ ] Horario actual (publicado: lunes a domingo, 9:00 a. m. – 5:00 p. m.).
- [ ] Que el WhatsApp +504 9748-1038 siga activo.
- [ ] Normas vigentes (comida y bebidas, mascotas).
- [ ] Precios de entrada vigentes (no se publican hasta confirmarlos; ver `prices` en `site.ts`).
- [ ] Datos de la academia de natación: edades, horarios y costos (`academy.details`).
- [ ] Logotipo oficial (el actual es una marca tipográfica provisional en `src/components/icons.tsx`).
- [ ] Dominio definitivo (`siteUrl`), para generar `sitemap.xml`, canonical y `og:url`.

## Publicar

El resultado de `npm run build` (carpeta `dist/`) es un sitio estático. Se puede publicar gratis en Netlify,
Vercel, Cloudflare Pages o GitHub Pages:

- **Netlify / Vercel / Cloudflare Pages:** conecta el repositorio, comando de compilación `npm run build`,
  carpeta de salida `dist`.
- Después de publicar, coloca el dominio en `siteUrl` dentro de `src/config/site.ts` y vuelve a compilar.

## Fuentes de la información

- [HondurasTips (abril 2022)](https://www.hondurastips.hn/2022/04/22/centro-recreativo-lekes-un-sitio-para-disfrutar-y-relajarse-en-siguatepeque/)
- [Honduras.com (actualizado abril 2023)](https://www.honduras.com/guias/familiares/centro-recreativo-lekes-en-siguatepeque/)
- [RadioHouse (agosto 2021)](https://www.radiohouse.hn/2021/08/19/el-centro-recreativo-lekes-reabre-sus-puertas-para-disfrutar-de-momentos-inolvidables/)
- [Waze, ficha del lugar](https://www.waze.com/live-map/directions/hn/departamento-de-comayagua/siguatepeque/centro-recreativo-lekes?to=place.ChIJexHSinOVZY8RFKY-HHNVPWQ)
