import { external, routes } from "./navigation";
import type { ImageAsset } from "./types";

/**
 * Contenido de la Home editorial ("portada").
 * Las imágenes aceptan varias rutas: la primera que exista gana,
 * así se pueden cargar fotos nuevas sin tocar el código.
 */

export const instagramUrl = "https://www.instagram.com/calmazus_/";

export const portadaHero = {
  title: ["Una nueva forma", "de crear tu boda."],
  text: ["Un universo inspirado", "por novias, para novias."],
  note: ["Sin calma", "no hay boda"],
  image: {
    src: ["/images/home/portada.jpg", "/images/clari/clari-retrato.jpg"],
    alt: "Novia mientras le acomodan el peinado antes de la ceremonia",
    tone: "stone",
  } satisfies ImageAsset,
};

export type PortadaEntry = {
  /** Titular en dos líneas, como en la maqueta. */
  title: [string, string];
  text: string;
  /** El título del bloque es el enlace. */
  href: string;
  image: ImageAsset;
};

export const portadaEntries: PortadaEntry[] = [
  {
    title: ["Diario", "de la novia"],
    text: "Una novia ordenada es una novia en Calma. Cada novia escribe su propia boda, y este es el lugar ideal para planearla.",
    href: external.diario,
    image: {
      src: ["/images/home/diario-novia.jpg", "/images/home/home-hero-detalle.jpg"],
      alt: "Diario de la novia abierto sobre una mesa, con anillos y una birome",
      position: "40% 50%",
      tone: "ivory",
    },
  },
  {
    title: ["Wedding", "Planning"],
    text: "Creamos bodas como experiencias que expresan la personalidad de los novios.",
    href: routes.weddingPlanning,
    image: {
      src: "/images/home/home-hero.jpg",
      alt: "Boda al aire libre bajo carpas, entre árboles",
      position: "50% 62%",
      tone: "stone",
    },
  },
  {
    title: ["Asesorías", "virtuales"],
    text: "Te damos una mano para lograr tu calma. Estés donde estés y en el momento en que vos lo necesites.",
    href: routes.asesorias,
    image: {
      src: ["/images/home/asesorias-virtuales.jpg", "/images/vero/vero-retrato.jpg"],
      alt: "Notebook abierta con una asesoría virtual de Sin Calma, junto a un café",
      position: "56% 50%",
      tone: "sage",
    },
  },
  {
    title: ["Proveedores", "curados"],
    text: "Nuestra lista de recomendados, con quienes compartimos una misma esencia.",
    href: routes.recomendados,
    image: {
      src: "/images/home/proveedores-curados.jpeg",
      alt: "DJ pasando música con bandejas de vinilo en una boda",
      tone: "clay",
    },
  },
];

export const portadaNosotras = {
  title: "Nosotras",
  names: "Vero + Clari",
  text: "Después de tantos años acompañando novias, entendimos que cada boda se vive de una manera distinta. Creamos Sin Calma para compartir lo aprendido, inspirar nuevas formas de celebrar y acompañarte a tomar decisiones que realmente se parezcan a vos.",
  /** Texto completo, reservado para /nosotras (esa página no se modificó). */
  story: [
    "Después de tantos años acompañando novias, entendimos que cada boda se vive de una manera distinta. Nos gusta pensar Sin Calma como un espacio donde compartir todo lo que aprendimos, inspirar nuevas formas de celebrar y acompañarte a tomar decisiones que realmente se parezcan a vos.",
    "Creemos en novias reales, seguras de lo que quieren, que no necesitan seguir fórmulas ni convertirse en alguien más para casarse. Bodas con identidad, elecciones más conscientes y experiencias que respetan la esencia de cada pareja.",
    "Porque para nosotras, la calma también está ahí: en la libertad de elegir, de crear a tu manera y de disfrutar el proceso sin perderte en el camino.",
  ],
  note: "organización + diseño",
  cta: { label: "Conocé nuestra historia", href: routes.nosotras },
  image: {
    /* La misma foto que abre /nosotras (ver nosHero en content/nosotras.ts) */
    src: "/images/nosotras/hero.jpg",
    alt: "Vero y Clari, fundadoras de Sin Calma no hay Boda",
    /* Recorte 4:3 sobre foto vertical: arranca justo arriba de las cabezas */
    position: "50% 44%",
    tone: "stone",
  } satisfies ImageAsset,
};

/**
 * Marketplace en la Home: exactamente 3 productos del Marketplace de la novia
 * (por `slug`, ver content/marketplace.ts). Foto, nombre y “Ver más” llevan al Marketplace.
 */
export const portadaMarketplace = {
  title: "Marketplace de la novia",
  note: "ítems que no pueden faltar en tu boda",
  cta: { label: "Ver más", href: routes.marketplace },
  products: ["cadiz", "cassandra-6", "tocado-oliva-simple"],
};

export const portadaInstagram = {
  title: "Novedades de Instagram",
  cta: { label: "Ver Instagram", href: instagramUrl },
};

export const portadaFooter = {
  newsletter: "Recibí ideas, novedades y próximos eventos.",
};
