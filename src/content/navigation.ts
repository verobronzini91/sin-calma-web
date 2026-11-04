import { site } from "./site";

export type NavLink = {
  label: string;
  href: string;
};

/** Rutas internas del sitio. Fuente única para el sitemap. */
export const routes = {
  home: "/",
  bodas: "/bodas",
  nosotras: "/nosotras",
  weddingPlanning: "/wedding-planning",
  asesorias: "/asesorias-para-novias",
  marketplace: "/marketplace",
  marketplaceCapsulas: "/marketplace/capsulas",
  recomendados: "/recomendados",
  experiencias: "/experiencias",
  inspiracion: "/inspiracion",
  proveedores: "/proveedores",
} as const;

export const sitemapRoutes: { path: string; priority: number }[] = [
  { path: routes.home, priority: 1 },
  { path: routes.bodas, priority: 0.9 },
  { path: routes.weddingPlanning, priority: 0.9 },
  { path: routes.asesorias, priority: 0.8 },
  { path: routes.marketplace, priority: 0.8 },
  { path: routes.marketplaceCapsulas, priority: 0.6 },
  { path: routes.recomendados, priority: 0.9 },
  { path: routes.nosotras, priority: 0.7 },
  { path: `${routes.nosotras}/vero`, priority: 0.6 },
  { path: `${routes.nosotras}/clari`, priority: 0.6 },
  { path: routes.experiencias, priority: 0.7 },
  { path: routes.inspiracion, priority: 0.8 },
  { path: routes.proveedores, priority: 0.6 },
];

/** Enlaces externos */
export const external = {
  diario: site.diarioUrl,
} as const;

/**
 * Navegación global: la misma en el header (desktop y mobile) y en el footer,
 * en la Home y en el resto del sitio.
 */
export const mainNav: NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "Diario", href: external.diario },
  { label: "Marketplace", href: routes.marketplace },
  { label: "Wedding Planning", href: routes.weddingPlanning },
  { label: "Asesorías", href: routes.asesorias },
  { label: "Nosotras", href: routes.nosotras },
  { label: "Proveedores", href: routes.recomendados },
  { label: "Notas", href: routes.inspiracion },
];

/** La sección actual: Home sólo en `/`; el resto también en sus subpáginas. */
export function isActiveNav(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Placeholders legales: se convertirán en links cuando existan las páginas. */
export const legalPlaceholders = [
  "Términos y condiciones",
  "Política de privacidad",
  "Política de cookies",
];
