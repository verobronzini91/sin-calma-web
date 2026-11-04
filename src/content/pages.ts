import { external, routes } from "./navigation";
import type { ImageAsset, TitleLine } from "./types";

type PageContent = {
  meta: { title: string; description: string };
  /** Opcional: algunas páginas tienen su propio contenido (ver people.ts). */
  hero?: {
    eyebrow: string;
    title: TitleLine[];
    lead: string;
    image: ImageAsset;
    ctas?: { label: string; href: string }[];
  };
  faq?: { title: string; items: { question: string; answer: string }[] };
  closing?: {
    title: string;
    text: string;
    cta: { label: string; href: string };
    /** Texto con el enlace al Diario en el medio: `before` + link + `after`. */
    diario: { before: string; label: string; after: string };
  };
};

/** Contenido de las landings internas (shells de Fase 1). */
export const pages = {
  bodas: {
    meta: {
      title: "Bodas pensadas con esencia, diseño y organización",
      description:
        "Organización de bodas, proveedores recomendados, wedding planning e inspiración real. Bodas creadas por Vero y Clari desde el diseño, la organización y el alma.",
    },
    hero: {
      eyebrow: "Bodas",
      title: ["Bodas pensadas", "con esencia, diseño", { text: "y organización", italic: true }],
      lead: "No creemos en una única forma de casarse. Creemos en celebraciones que tengan sentido para quienes las viven.",
      image: { alt: "Pareja de novios en una celebración al aire libre", tone: "sand", label: "Bodas" },
      ctas: [
        { label: "Organizar mi boda", href: external.diario },
        { label: "Encontrar recomendados", href: routes.recomendados },
        { label: "Trabajar con nosotras", href: routes.weddingPlanning },
      ],
    },
  },
  nosotras: {
    meta: {
      title: "Nosotras",
      description:
        "Vero y Clari, creadoras de bodas, eventos y experiencias: organización, estrategia, diseño y dirección creativa con sensibilidad.",
    },
  },
  weddingPlanning: {
    meta: {
      title: "Wedding Planning",
      description:
        "Wedding planning integral, destination weddings, asesorías, eventos privados y experiencias pensadas desde la organización y el diseño.",
    },
    /* El resto del contenido de la página vive en wedding-planning.ts */
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué hace un wedding planner?",
          answer:
            "Diseña, organiza y coordina la boda de principio a fin: concepto, lugar, proveedores, presupuesto, logística y coordinación del día. La pareja toma las decisiones. Nuestro trabajo es hacer que todo suceda.",
        },
        {
          question: "¿Con cuánta anticipación conviene contratar un wedding planner?",
          answer:
            "Lo ideal es empezar con tiempo, especialmente cuando se trata de bodas de destino o eventos en lugares no tradicionales. En esos casos hay más decisiones de producción, infraestructura, logística y proveedores que resolver desde el comienzo.",
        },
        {
          question: "¿Cuánto cuesta un wedding planner?",
          answer:
            "Depende del tipo de boda, el lugar, la cantidad de invitados y el nivel de producción que requiera el proyecto. Cada boda se cotiza de manera personalizada según lo que necesita.",
        },
        {
          question: "¿Pueden organizar una boda en un lugar sin infraestructura?",
          answer:
            "Sí. De hecho, es una de las cosas que más nos gusta hacer. Diseñamos y producimos el evento desde cero: estructura, servicios, logística, proveedores y ambientación.",
        },
        {
          question: "¿Trabajan con parejas que viven en otro lugar?",
          answer:
            "Sí. Podemos coordinar gran parte del proceso a distancia y estar presentes en cada instancia que requiera trabajo en el lugar de la boda.",
        },
      ],
    },
    closing: {
      title: "¿Están pensando una boda diferente?",
      text: "Contanos qué tienen en mente: fecha aproximada, lugar o tipo de espacio que imaginan y cantidad estimada de invitados.",
      cta: { label: "Escribinos", href: "mailto:c.calmashoes@gmail.com" },
      diario: {
        before: "¿Prefieren organizarla por su cuenta? Conozcan ",
        label: "El Diario de la Novia",
        after: ", nuestro organizador para acompañarlas durante todo el proceso.",
      },
    },
  },
  recomendados: {
    meta: {
      title: "Proveedores curados",
      description:
        "Proveedores de bodas y eventos seleccionados por Sin Calma: lugares, vestidos, gastronomía, fotografía, ambientación y más, elegidos por experiencia y mirada propia.",
    },
    hero: {
      eyebrow: "Recomendados",
      title: ["Proveedores recomendados", { text: "que se alinean con tu esencia.", italic: true }],
      lead: "No es un directorio. Es una selección pensada para tu forma de celebrar: pocas personas y propuestas, y por qué tienen sentido para vos.",
      image: { alt: "Salón de campo preparado para una fiesta", tone: "sage", label: "Recomendados" },
    },
  },
  experiencias: {
    meta: {
      title: "Experiencias y eventos privados",
      description:
        "Viajes, celebraciones, eventos privados, experiencias gastronómicas, encuentros y proyectos especiales diseñados por Sin Calma.",
    },
    hero: {
      eyebrow: "Experiencias",
      title: ["Experiencias", "y eventos", { text: "con identidad.", italic: true }],
      lead: "Viajes, celebraciones, eventos privados, experiencias gastronómicas, encuentros y proyectos especiales.",
      image: { alt: "Mesa de celebración íntima al atardecer", tone: "clay", label: "Experiencias" },
      ctas: [{ label: "Crear una experiencia", href: "#crear" }],
    },
  },
  inspiracion: {
    meta: {
      title: "Notas para una novia",
      description:
        "Notas de Sin Calma no hay Boda: bodas reales, historias, ideas, tendencias y nuestra mirada sobre todo lo que rodea a una boda.",
    },
    hero: {
      eyebrow: "Inspiración",
      title: ["Ideas, guías", "y bodas", { text: "reales.", italic: true }],
      lead: "Todo lo que sabemos, lo compartimos: guías, conversaciones, bodas reales y lo que se dice de las bodas.",
      image: { alt: "Detalle editorial de una boda real", tone: "sand", label: "Inspiración" },
    },
  },
  proveedores: {
    meta: {
      title: "Proveedores: formá parte de la selección",
      description:
        "Buscamos proveedores, espacios y experiencias con identidad, sensibilidad y calidad para formar parte de la selección de Sin Calma.",
    },
    hero: {
      eyebrow: "Soy proveedor",
      title: ["Una selección", { text: "por afinidad", italic: true }, "y calidad."],
      lead: "Buscamos proveedores, espacios y experiencias con identidad, sensibilidad y calidad. Si tu propuesta puede aportar, queremos conocerla.",
      image: { alt: "Proveedora preparando un arreglo floral", tone: "clay", label: "Proveedores" },
      ctas: [{ label: "Quiero formar parte", href: "#sumate" }],
    },
  },
} satisfies Record<string, PageContent>;

export const experienceTypes = [
  "Eventos privados",
  "Celebraciones",
  "Viajes y escapadas",
  "Experiencias gastronómicas",
  "Encuentros",
  "Proyectos especiales",
];


/** Caminos dentro del universo de bodas (/bodas). */
export const weddingPaths = {
  eyebrow: "Tu boda, a tu manera",
  title: ["Cuatro formas", { text: "de empezar.", italic: true }] as TitleLine[],
  items: [
    {
      kicker: "Organizá",
      title: "Mi Diario",
      text: "Tu espacio privado para ordenar presupuesto, invitados, tareas, proveedores, notas y decisiones.",
      cta: { label: "Entrar al Diario", href: external.diario },
      image: { alt: "Cuaderno con la planificación de una boda", tone: "ivory" } satisfies ImageAsset,
    },
    {
      kicker: "Encontrá",
      title: "Recomendados",
      text: "Personas y propuestas que se alinean con lo que estás buscando, y por qué tienen sentido para vos.",
      cta: { label: "Encontrar recomendados", href: routes.recomendados },
      image: { alt: "Salón de campo preparado para una boda", tone: "sage" } satisfies ImageAsset,
    },
    {
      kicker: "Delegá",
      title: "Wedding Planning",
      text: "Si querés que pensemos, diseñemos y organicemos el proyecto completo con vos.",
      cta: { label: "Trabajar con nosotras", href: routes.weddingPlanning },
      image: { alt: "Montaje de una boda al aire libre", tone: "clay" } satisfies ImageAsset,
    },
    {
      kicker: "Inspirate",
      title: "Bodas reales",
      text: "Bodas reales, guías y conversaciones para imaginar la tuya con más calma y menos ruido.",
      cta: { label: "Ver bodas reales", href: `${routes.inspiracion}#bodas-reales` },
      image: { alt: "Detalle de una boda real", tone: "stone" } satisfies ImageAsset,
    },
  ],
};
