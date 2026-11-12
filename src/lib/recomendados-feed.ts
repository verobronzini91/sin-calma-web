import { proveedores, type Proveedor, type ProveedorCategory } from "@/content/proveedores";
import { site } from "@/content/site";

/**
 * Feed público de Nuestros recomendados (contrato versión 1, ver docs/recomendados-feed.md en el repo del Diario).
 * Una sola fuente: los mismos proveedores publicados en /recomendados (src/content/proveedores.ts). El Diario de
 * Boda lo lee para no cargar los proveedores dos veces. Solo datos públicos, los mismos que ya muestra el sitio.
 */

/** Rubro del Diario para cada categoría del portal. */
export const DIARIO_RUBRO: Record<ProveedorCategory, string> = {
  lugares: "lugar",
  vestidos: "vestido",
  joyeria: "otros",
  civil: "otros",
  gastronomia: "catering",
  barra: "barra",
  ambientacion: "ambientacion",
  flores: "flores",
  "foto-video": "foto",
  musica: "musica",
  beauty: "beauty",
  papeleria: "papeleria",
  transporte: "transporte",
  experiencias: "otros",
};

export type FeedItem = {
  slug: string;
  name: string;
  category: string;
  zones: string[];
  capacityMin: number | null;
  capacityMax: number | null;
  priceLevel: number | null;
  styles: string[];
  description: string | null;
  benefit: string | null;
  image: string | null;
  url: string;
  instagram: string | null;
};

export type Feed = { version: 1; updatedAt: string; items: FeedItem[] };

const absolute = (base: string, path: string) => (/^https:\/\//.test(path) ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`);
const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);

export function toFeedItem(p: Proveedor, base: string = site.url): FeedItem {
  const cover = Array.isArray(p.coverImage.src) ? p.coverImage.src[0] : p.coverImage.src;
  const zones = [
    ...(p.location ? p.location.split(",").map((z) => z.trim()).filter(Boolean) : []),
    ...(p.diario?.zones ?? []),
  ];
  return {
    slug: p.slug,
    name: p.name,
    category: DIARIO_RUBRO[p.category],
    zones: [...new Set(zones)].slice(0, 20),
    capacityMin: p.diario?.capacityMin ?? null,
    capacityMax: p.diario?.capacityMax ?? null,
    priceLevel: p.diario?.priceLevel ?? null,
    styles: (p.diario?.styles ?? []).slice(0, 20),
    description: clip(p.highlight, 600),
    benefit: p.diario?.benefit ? clip(p.diario.benefit, 300) : null,
    image: cover ? absolute(base, cover) : null,
    url: `${base}/recomendados/${p.slug}`,
    instagram: p.instagram ?? null,
  };
}

/** Solo los proveedores publicados (los borradores nunca salen, aunque SHOW_DRAFTS esté activo en local). */
export function buildFeed(list: readonly Proveedor[] = proveedores, base: string = site.url, now: Date = new Date()): Feed {
  return { version: 1, updatedAt: now.toISOString(), items: list.filter((p) => !p.draft).map((p) => toFeedItem(p, base)) };
}
