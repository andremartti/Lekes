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

Las fotos del lugar están en `src/assets/fotos/`; `src/assets/fotos/LEEME.md` indica dónde aparece cada una.
Para cambiar una foto, reemplaza el archivo con el mismo nombre. Aún faltan `salon.jpg` (salón de eventos) y
`restaurante.jpg` (un platillo): al agregarlas, aparecen solas en su sección. Mientras tanto, Eventos muestra
una vista general rotulada como tal y el restaurante, un panel con sus platillos.

### Datos pendientes de confirmar con el negocio

Los siguientes datos vienen de guías turísticas de 2021–2023 y están marcados con `verificado: false`. La
página los muestra con la etiqueta "Confirmar antes de visitar":

- [ ] Horario actual (publicado: lunes a domingo, 9:00 a. m. – 5:00 p. m.).
- [ ] Que el WhatsApp +504 9748-1038 siga activo.
- [ ] Normas vigentes (comida y bebidas, mascotas).
- [ ] Precios de entrada vigentes (no se publican hasta confirmarlos; ver `prices` en `site.ts`).
- [ ] Datos de la academia de natación: edades, horarios y costos (`academy.details`).
- [ ] Logotipo oficial (el actual es una marca tipográfica provisional en `src/components/icons.tsx`).
- [ ] Permiso para usar las fotos actuales en el sitio definitivo (propias del negocio o con permiso de su
      autor), y fotos del salón y del restaurante.
- [ ] Dominio definitivo (`siteUrl`), para generar `sitemap.xml`, canonical y `og:url`.

## Publicar

### Vista previa para el cliente (GitHub Pages)

La demo está en `https://andremartti.github.io/Lekes/`. El flujo `.github/workflows/deploy.yml` la compila
y publica cada vez que hay cambios en la rama `claude/project-thread-jh4kml`; en `main` solo compila para
comprobar que todo está bien.

Se publica desde esa rama porque el entorno `github-pages` del repositorio solo la acepta (fue la rama
principal cuando se activó Pages). Para publicar desde `main`, en **Settings → Environments → github-pages →
Deployment branches** agrega `main` y cambia la condición `if:` del trabajo `deploy` en el flujo.

La vista previa lleva `noindex` para que Google no la indexe antes de que el negocio la apruebe. Para la versión
definitiva, quita `PREVIEW: '1'` del flujo o publícala en el dominio del negocio.

### Sitio definitivo

El resultado de `npm run build` (carpeta `dist/`) es un sitio estático con rutas relativas. Funciona en Netlify,
Vercel, Cloudflare Pages o cualquier hosting: comando de compilación `npm run build` y carpeta de salida `dist`.
Después de publicar, coloca el dominio en `siteUrl` dentro de `src/config/site.ts` y vuelve a compilar.

## Fuentes de la información

- [HondurasTips (abril 2022)](https://www.hondurastips.hn/2022/04/22/centro-recreativo-lekes-un-sitio-para-disfrutar-y-relajarse-en-siguatepeque/)
- [Honduras.com (actualizado abril 2023)](https://www.honduras.com/guias/familiares/centro-recreativo-lekes-en-siguatepeque/)
- [RadioHouse (agosto 2021)](https://www.radiohouse.hn/2021/08/19/el-centro-recreativo-lekes-reabre-sus-puertas-para-disfrutar-de-momentos-inolvidables/)
- [Waze, ficha del lugar](https://www.waze.com/live-map/directions/hn/departamento-de-comayagua/siguatepeque/centro-recreativo-lekes?to=place.ChIJexHSinOVZY8RFKY-HHNVPWQ)
