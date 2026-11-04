import { about } from "./home";
import { routes } from "./navigation";
import type { ImageAsset, TitleLine } from "./types";

/**
 * Contenido de /nosotras, /nosotras/vero y /nosotras/clari.
 * Las fotos se cargan copiando el archivo indicado en `src` dentro de /public.
 */

export const personRoutes = {
  vero: `${routes.nosotras}/vero`,
  clari: `${routes.nosotras}/clari`,
} as const;

const [veroBase, clariBase] = about.people;

/* -------------------------------------------------------------------------- */
/* /nosotras                                                                   */
/* -------------------------------------------------------------------------- */

export const nosotrasPage = {
  hero: {
    eyebrow: "Nosotras",
    title: ["Vero + Clari"] as TitleLine[],
    lead: "Dos miradas. Una misma forma de crear.",
    image: {
      src: "/images/nosotras/vero-clari-juntas.jpg",
      // Foto vertical en un slot horizontal: el foco sube para no cortar las caras.
      position: "50% 18%",
      mobileSrc: "/images/nosotras/vero-clari-juntas-mobile.jpg",
      alt: "Vero y Clari, fundadoras de Sin Calma",
      tone: "stone",
      label: "Vero + Clari — horizontal",
    } satisfies ImageAsset,
  },
  intro: about.intro,
  profiles: [
    {
      name: veroBase.name,
      role: veroBase.role,
      text: veroBase.text,
      cta: { label: "Conocer a Vero", href: personRoutes.vero },
      image: veroBase.image,
    },
    {
      name: clariBase.name,
      role: clariBase.role,
      text: clariBase.text,
      cta: { label: "Conocer a Clari", href: personRoutes.clari },
      image: clariBase.image,
    },
  ],
  closing: about.closing,
};

/* -------------------------------------------------------------------------- */
/* /nosotras/vero                                                              */
/* -------------------------------------------------------------------------- */

export type PersonSection = {
  id: string;
  eyebrow: string;
  title: TitleLine[];
  paragraphs: string[];
  points?: string[];
  quote?: string;
  image?: ImageAsset;
};

export const vero = {
  meta: {
    title: "Vero — Wedding planner, organización y estrategia",
    description:
      "Vero, wedding planner y cofundadora de Sin Calma. Más de 15 años alrededor de bodas, novias y eventos: organización, estrategia, comunicación y proveedores.",
  },
  hero: {
    eyebrow: "Nosotras · Vero",
    name: "Vero",
    title: "Organización, estrategia y comunicación.",
    intro: veroBase.text,
    image: {
      src: ["/images/vero/hero.jpg", "/images/vero/vero-retrato.jpg"],
      alt: "Vero armando un arreglo de flores sobre una mesa de madera",
      position: "50% 50%",
      tone: "stone",
      label: "Retrato Vero — vertical",
    } satisfies ImageAsset,
  },
  /** Su manera de hacer: texto + collage (foto base vertical y otra superpuesta). */
  hacer: {
    title: "Su manera de hacer",
    lead: "Vero transforma ideas en planes concretos.",
    text: [
      "Organiza, anticipa, arma equipos y conecta todas las partes necesarias para que una boda o una experiencia funcione de verdad.",
      "Su mirada combina wedding planning, producción, estrategia y comunicación.",
      "Le interesan especialmente los proyectos que empiezan desde cero, los lugares no tradicionales y esas situaciones en las que todavía hay que encontrar cómo hacer que algo suceda.",
    ],
    quote: "Cuando aparece una idea, Vero ya está pensando cómo hacerla posible.",
    images: [
      {
        src: "/images/vero/trabajando.jpg",
        alt: "Vero y Clari sonriendo, sentadas al aire libre",
        position: "50% 35%",
      },
      {
        src: "/images/vero/detalle-02.jpg",
        alt: "Vero sosteniendo un gran ramo de follaje y flores en una boda al aire libre",
        position: "40% 50%",
      },
    ] satisfies ImageAsset[],
  },
  /** De la idea a la realidad: foto grande de producción con un detalle horizontal superpuesto. */
  realidad: {
    title: "De la idea a la realidad",
    text: [
      "Cada proyecto empieza entendiendo qué quieren las personas que tiene enfrente.",
      "A partir de ahí ordena prioridades, proveedores, presupuesto, tiempos y logística para construir una experiencia posible y coherente.",
    ],
    statement: ["No trabaja desde paquetes cerrados.", "Trabaja encontrando la mejor manera de hacer realidad cada proyecto."],
    closing: "Organizar también es diseñar una experiencia.",
    images: [
      {
        src: "/images/vero/evento.jpeg",
        alt: "Vero subida a una escalera, colgando bolas de espejos con follaje bajo una carpa",
        position: "50% 55%",
      },
      {
        src: "/images/vero/detalle-01.jpg",
        alt: "Vero acomodando un arreglo de flores sobre una mesa",
        position: "35% 50%",
      },
    ] satisfies ImageAsset[],
  },
  closing: {
    title: ["Si querés,", { text: "lo pensamos juntas.", italic: true }] as TitleLine[],
    cta: { label: "Contratá Wedding Planning", href: routes.weddingPlanning },
  },
};

/* -------------------------------------------------------------------------- */
/* /nosotras/clari                                                             */
/* -------------------------------------------------------------------------- */

export const clari = {
  meta: {
    title: "Clari — Diseño, estética y dirección creativa",
    description:
      "Clari, cofundadora de Sin Calma: diseño, curaduría estética, identidad y dirección creativa para bodas, eventos y experiencias.",
  },
  hero: {
    eyebrow: "Nosotras · Clari",
    name: "Clari",
    title: "Diseño, estética y dirección creativa.",
    intro: clariBase.text,
    image: {
      src: ["/images/clari/clari-hero.jpg", "/images/clari/clari-retrato.jpg"],
      alt: "Retrato de Clari, directora creativa de Sin Calma",
      tone: "sand",
      label: "Retrato Clari — vertical",
    } satisfies ImageAsset,
  },
  /** Su mirada: texto + collage (foto base vertical y otra superpuesta). */
  mirada: {
    title: "Su mirada",
    lead: "Clari entiende el diseño como una forma de contar quiénes somos.",
    text: [
      "Su formación en Madrid y en NYU, con foco en marketing de moda, reforzó una mirada muy ligada a la identidad, la estética y la manera en que una experiencia se comunica visualmente.",
    ],
    statement: ["No busca aplicar una tendencia.", "Busca encontrar el lenguaje propio de cada proyecto."],
    images: [
      {
        src: "/images/clari/detalle-01.jpeg",
        alt: "Clari de espaldas en un mercado de flores, con un ramo en brazos",
        position: "50% 50%",
      },
      {
        src: "/images/clari/evento.jpg",
        alt: "Clari enseñando durante un taller, junto a una mesa de trabajo",
        position: "50% 40%",
      },
    ] satisfies ImageAsset[],
  },
  /** De la idea al espacio: collage a la izquierda, texto y una foto horizontal a la derecha. */
  espacio: {
    title: "De la idea al espacio",
    text: [
      "En una boda, su trabajo aparece en cada decisión visual: materiales, flores, iluminación, proporciones, objetos, colores y recorridos.",
      "Piensa cómo se relacionan entre sí para que todo tenga coherencia y se sienta parte de una misma historia.",
    ],
    statement: ["Su objetivo no es llenar un espacio.", "Es darle identidad."],
    images: [
      {
        src: "/images/clari/trabajando.jpeg",
        alt: "Clari armando a mano una guirnalda de follaje, sentada en el piso",
        position: "50% 50%",
      },
      {
        src: "/images/clari/detalle-03.jpeg",
        alt: "Clari armando un arreglo de follaje frente a un panel de madera",
        position: "50% 50%",
      },
      {
        src: "/images/clari/detalle-02.jpeg",
        alt: "Camino de follaje y flores secas sobre una mesa larga puesta para una boda",
        position: "50% 60%",
      },
    ] satisfies ImageAsset[],
  },
};

export const people = { vero, clari };
