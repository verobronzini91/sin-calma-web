# Sin Calma no hay Boda — Web madre (Fase 1)

Maqueta funcional de la web madre (`sincalmanohayboda.com`). Proyecto independiente del Diario (`diario.sincalmanohayboda.com`).

## Correr localmente

```bash
npm install
cp .env.example .env.local   # opcional: URL canónica
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm start   # versión de producción
```

## Estructura

```
src/
  app/                 rutas: /, /bodas, /nosotras, /wedding-planning, /recomendados,
                       /experiencias, /inspiracion, /proveedores (App Router) + sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    layout/            Header, MobileMenu (único client component), Footer
    ui/                CTA, SectionHeading, DisplayTitle, EditorialImage, EditorialGrid,
                       EditorialCard, ImageTextBlock, TypographicDivider
    sections/          secciones de la Home, reutilizadas en las rutas internas
    seo/               JsonLd
  content/             site.ts, navigation.ts, home.ts, pages.ts (todos los textos)
  lib/                 metadata.ts (buildMetadata), jsonld.ts, fonts.ts, cn.ts, links.ts
public/images/         hero, bodas, experiencias, vero-clari, recomendados, editorial, diario
```

## Cargar fotos reales

Cada slot de imagen declara en `src/content/` (`home.ts`, `people.ts`) el archivo que espera.
**Para cargar una foto alcanza con copiarla en `public/images/` con ese nombre**, sin tocar código:

- Mientras el archivo no exista se ve un placeholder que muestra la ruta esperada.
- Sirve `.jpg`, `.jpeg`, `.webp`, `.png` o `.avif` con el mismo nombre.
- `*-mobile.jpg` (opcional) reemplaza la foto en pantallas chicas (art direction).
- `position: "50% 30%"` en el contenido ajusta el punto de foco del recorte.
- Revisar el `alt` de cada imagen para que describa la foto real.
- En `npm run dev` alcanza con recargar; en producción, las fotos entran con el siguiente build.

### Lista de fotos

| Archivo | Sección | Orientación | Proporción |
|---|---|---|---|
| `home/home-hero.jpg` | Home · hero | horizontal | 16:10 |
| `home/home-hero-mobile.jpg` *(opcional)* | Home · hero en mobile | vertical | 4:5 |
| `home/home-hero-detalle.jpg` | Home · hero, foto chica | vertical | 3:4 |
| `vero/vero-retrato.jpg` | Home · Nosotras, /nosotras (y hero de Vero si falta el propio) | vertical | 4:5 |
| `clari/clari-retrato.jpg` | Home · Nosotras, /nosotras (y hero de Clari si falta el propio) | vertical | 4:5 |
| `nosotras/vero-clari-juntas.jpg` | /nosotras · hero; Home · Nosotras (aparece sólo si existe) | horizontal | 3:2 (se ve 2:1 en desktop) |
| `nosotras/vero-clari-juntas-mobile.jpg` *(opcional)* | /nosotras · hero en mobile | vertical | 4:5 |
| `recomendados/lugares.jpg` | Home · Recomendados | vertical | 4:5 |
| `recomendados/fotografia-video.jpg` | Home · Recomendados | vertical | 4:5 |
| `recomendados/experiencias.jpg` | Home · Recomendados | vertical | 4:5 |
| `recomendados/viajes.jpg` | Home · Recomendados | vertical | 4:5 |
| `wedding-planning/wp-evento.jpg` | Home · Wedding Planning | horizontal | 3:2 (se recorta a 21:9 en desktop) |
| `wedding-planning/wp-evento-mobile.jpg` *(opcional)* | Home · Wedding Planning en mobile | vertical | 4:5 |
| `experiencias/experiencias-principal.jpg` | Home · Experiencias | horizontal | 4:3 |
| `experiencias/experiencias-detalle.jpg` | Home · Experiencias | vertical | 3:4 |
| `editorial/inspiracion-bodas-reales.jpg` | Home · Inspiración (destacada) | vertical | 4:5 |
| `editorial/inspiracion-guias.jpg` | Home · Inspiración | vertical | 4:5 |
| `editorial/inspiracion-youtube.jpg` | Home · Inspiración | vertical | 4:5 |
| `vero/vero-hero.jpg` | /nosotras/vero · hero | vertical | 4:5 |
| `vero/vero-experiencia.jpg` | /nosotras/vero · Experiencia | vertical | 4:5 |
| `vero/vero-galeria-evento.jpg` | /nosotras/vero · galería | horizontal | 3:2 |
| `vero/vero-galeria-retrato.jpg` | /nosotras/vero · galería | vertical | 4:5 |
| `vero/vero-galeria-reunion.jpg` | /nosotras/vero · galería | vertical | 4:5 |
| `vero/vero-galeria-backstage.jpg` | /nosotras/vero · galería | horizontal | 3:2 |
| `vero/vero-galeria-showroom.jpg` | /nosotras/vero · galería | horizontal | 3:2 |
| `vero/vero-galeria-proveedores.jpg` | /nosotras/vero · galería | vertical | 4:5 |
| `vero/vero-galeria-bodas.jpg` | /nosotras/vero · galería (cierre) | horizontal | 2:1 |
| `clari/clari-hero.jpg` | /nosotras/clari · hero | vertical | 4:5 |

Slots secundarios (también preparados): `home/home-manifiesto.jpg` (vertical 3:4), `home/camino-organiza.jpg` (3:4), `home/camino-encontra.jpg` (1:1), `home/camino-delega.jpg` (4:5), `home/home-proveedores.jpg` (4:5) y `recomendados/{musica,gastronomia,diseno-ambientacion,moda-belleza}.jpg` (4:5).

Tamaño recomendado: lado largo de 2400px como mínimo para las horizontales grandes y de 1600px para las verticales, en JPG con calidad ~80. Next optimiza el resto.

## Tema

Los colores están en `src/app/globals.css` (bloque `:root`), y las tipografías en `src/lib/fonts.ts`.

## SEO e indexación (para cuando se conecte Vercel)

Hoy `robots.txt` y la metadata permiten indexar en todos los entornos. Al conectar Vercel:

- **Producción** (`sincalmanohayboda.com`): indexable. `NEXT_PUBLIC_SITE_URL=https://sincalmanohayboda.com`.
- **Preview / staging**: `noindex`. Vercel expone `VERCEL_ENV` (`production` | `preview` | `development`):
  - en `src/app/robots.ts`, si `VERCEL_ENV !== "production"`, devolver `disallow: "/"`;
  - en `src/app/layout.tsx`, en ese caso usar `robots: { index: false, follow: false }`.
- Las URLs canónicas tienen que apuntar siempre al dominio de producción, también en las previews.

## Pendiente (fuera de Fase 1)

Los bloques "Próximamente" son temporales: contacto (`/nosotras#contacto`, `/wedding-planning#contacto`), crear una experiencia (`/experiencias#crear`), sumarse como proveedor (`/proveedores#sumate`) y el buscador de recomendados (`/recomendados#encontrar`). Todavía no hay matching, login, CMS, Supabase ni pagos.
