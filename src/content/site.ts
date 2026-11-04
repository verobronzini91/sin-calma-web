/**
 * Configuración base de la marca.
 * `NEXT_PUBLIC_SITE_URL` define la URL canónica (ver .env.example).
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sincalmanohayboda.com";

export const site = {
  name: "Sin Calma no hay Boda",
  wordmark: "Sin calma no hay boda",
  url: rawUrl.replace(/\/+$/, ""),
  diarioUrl: "https://diario.sincalmanohayboda.com.ar",
  lang: "es-AR",
  locale: "es_AR",
  title: "Sin Calma no hay Boda | Wedding Planner, Bodas y Proveedores",
  titleTemplate: "%s | Sin Calma no hay Boda",
  description:
    "Wedding planning, organización de bodas, proveedores recomendados, experiencias y herramientas para novias. Un universo creado por Vero y Clari.",
  tagline: "Cómo funciona. Cómo se ve. Cómo se siente.",
  founders: [
    { name: "Vero", jobTitle: "Wedding planner · Organización y estrategia" },
    { name: "Clari", jobTitle: "Diseño y dirección creativa" },
  ],
} as const;
