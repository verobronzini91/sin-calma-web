import { external, routes } from "./navigation";
import type { ImageAsset, TitleLine } from "./types";

/**
 * Contenido de la Home. Los textos salen del brief de marca.
 * Las imágenes son placeholders: completar `src` cuando haya fotos reales.
 */

export const hero = {
  h1: "Wedding planning, organización de bodas y proveedores recomendados",
  statement: "Creamos bodas, eventos y experiencias desde la organización, el diseño y la esencia de quienes las viven.",
  description:
    "Un universo creado por Vero y Clari para ordenar tu boda, encontrar proveedores que se alinean con lo que sos e imaginar eventos y experiencias que realmente tengan que ver con vos.",
  primary: { label: "Organizar mi boda", href: external.diario },
  secondary: { label: "Encontrar recomendados", href: routes.recomendados },
  tertiary: { label: "Trabajar con nosotras", href: routes.weddingPlanning },
  image: {
    src: "/images/home/home-hero.jpg",
    mobileSrc: "/images/home/home-hero-mobile.jpg",
    alt: "Pareja caminando al atardecer después de la ceremonia",
    tone: "sand",
    label: "Hero — horizontal",
  } satisfies ImageAsset,
  detail: {
    src: "/images/home/home-hero-detalle.jpg",
    alt: "Detalle de mesa con vajilla y flores de estación",
    tone: "stone",
    label: "Detalle — vertical",
  } satisfies ImageAsset,
};

export const manifesto = {
  eyebrow: "Nuestro manifiesto",
  title: ["No necesitás", "más opciones.", "Necesitás", { text: "calma.", italic: true }] as TitleLine[],
  paragraphs: [
    "Después de años trabajando en bodas y eventos entendimos que el problema no suele ser la falta de información. Es el exceso.",
    "Por eso creamos un espacio para ayudarte a ordenar, elegir y encontrar personas que realmente tengan sentido para lo que estás imaginando.",
  ],
  positioning:
    "Sin Calma te ayuda a ordenarte, elegir proveedores que se alinean a tu esencia y a vivir el proceso desde el alma.",
  cta: { label: "Conocé Sin Calma", href: routes.nosotras },
  image: {
    src: "/images/home/home-manifiesto.jpg",
    alt: "Novia de espaldas en un jardín, luz natural",
    tone: "stone",
    label: "Editorial — vertical",
  } satisfies ImageAsset,
};

export const paths = {
  eyebrow: "Tres caminos para empezar",
  title: ["¿Por dónde", { text: "querés empezar?", italic: true }] as TitleLine[],
  items: [
    {
      verb: "Organizá",
      product: "Mi Diario",
      text: "Tu espacio privado para ordenar presupuesto, invitados, tareas, proveedores, notas y decisiones.",
      cta: { label: "Entrar al Diario", href: external.diario },
      image: { src: "/images/home/camino-organiza.jpg", alt: "Cuaderno abierto con notas de organización de una boda", tone: "ivory", label: "Diario" } satisfies ImageAsset,
    },
    {
      verb: "Encontrá",
      product: "Recomendados",
      text: "Contanos qué estás organizando y descubrí proveedores y experiencias que se alinean con lo que estás buscando.",
      cta: { label: "Encontrar recomendados", href: routes.recomendados },
      image: { src: "/images/home/camino-encontra.jpg", alt: "Salón de campo preparado para una celebración", tone: "sage", label: "Recomendados" } satisfies ImageAsset,
    },
    {
      verb: "Delegá",
      product: "Wedding Planning",
      text: "Si querés que pensemos, diseñemos y organicemos el proyecto completo con vos.",
      cta: { label: "Trabajemos juntas", href: `${routes.weddingPlanning}#contacto` },
      image: { src: "/images/home/camino-delega.jpg", alt: "Montaje de una boda al aire libre durante la tarde", tone: "clay", label: "Wedding planning" } satisfies ImageAsset,
    },
  ],
};

export const about = {
  eyebrow: "Nosotras",
  title: ["Dos miradas.", { text: "Una misma esencia.", italic: true }] as TitleLine[],
  intro:
    "Vero y Clari, creadoras de bodas, eventos y experiencias. Dos perfiles distintos que se complementan para pensar cada proyecto desde la organización, la estética y la sensibilidad.",
  people: [
    {
      name: "Vero",
      role: "Organización · estrategia · comunicación",
      text: "Vero mira estructura, timing, proveedores, decisiones, logística, ejecución y estrategia. Su obsesión: que no se escape nada y que todo tenga sentido.",
      motto: "Que no se escape nada.",
      concepts: ["Organización", "Estrategia", "Wedding planning", "Comunicación", "Proveedores", "Ejecución"],
      image: { src: "/images/vero/vero-retrato.jpg", alt: "Retrato de Vero, wedding planner de Sin Calma", tone: "stone", label: "Retrato Vero" } satisfies ImageAsset,
    },
    {
      name: "Clari",
      role: "Diseño · estética · dirección creativa",
      text: "Clari mira identidad, sensibilidad visual, coherencia estética, dirección creativa y cómo transformar una idea en una experiencia.",
      motto: "Cómo se ve y cómo se siente.",
      concepts: ["Diseño", "Curaduría estética", "Dirección creativa", "Buen gusto", "Identidad visual", "Cómo se ve y cómo se siente"],
      image: { src: "/images/clari/clari-retrato.jpg", alt: "Retrato de Clari, directora creativa de Sin Calma", tone: "sand", label: "Retrato Clari" } satisfies ImageAsset,
    },
  ],
  /** Foto de Vero y Clari juntas. Opcional en la Home: sólo aparece cuando existe el archivo. */
  together: {
    src: "/images/nosotras/vero-clari-juntas.jpg",
    // Foto vertical en un slot horizontal: el foco sube para no cortar las caras.
    position: "50% 18%",
    alt: "Vero y Clari, fundadoras de Sin Calma",
    tone: "stone",
    optional: true,
  } satisfies ImageAsset,
  closing: ["Cómo funciona.", "Cómo se ve.", "Cómo se siente."],
  cta: { label: "Conocernos", href: routes.nosotras },
};

export type Category = { slug: string; label: string; image: ImageAsset };

export const categories: Category[] = [
  { slug: "lugares", label: "Lugares", image: { src: "/images/recomendados/lugares.jpg", alt: "Estancia con galería abierta al parque", tone: "sage" } },
  { slug: "fotografia-video", label: "Fotografía & video", image: { src: "/images/recomendados/fotografia-video.jpg", alt: "Cámara analógica sobre una mesa de madera", tone: "charcoal" } },
  { slug: "musica", label: "Música", image: { src: "/images/recomendados/musica.jpg", alt: "Músicos tocando en una fiesta al aire libre", tone: "stone" } },
  { slug: "gastronomia", label: "Gastronomía", image: { src: "/images/recomendados/gastronomia.jpg", alt: "Mesa larga servida con platos de estación", tone: "sand" } },
  { slug: "diseno-ambientacion", label: "Diseño & ambientación", image: { src: "/images/recomendados/diseno-ambientacion.jpg", alt: "Arreglo floral con ramas y flores secas", tone: "ivory" } },
  { slug: "moda-belleza", label: "Moda & belleza", image: { src: "/images/recomendados/moda-belleza.jpg", alt: "Vestido de novia colgado junto a una ventana", tone: "clay" } },
  { slug: "experiencias", label: "Experiencias", image: { src: "/images/recomendados/experiencias.jpg", alt: "Invitados brindando al atardecer", tone: "stone" } },
  { slug: "viajes", label: "Viajes", image: { src: "/images/recomendados/viajes.jpg", alt: "Paisaje de costa mediterránea desde una terraza", tone: "sage" } },
];

export const recommended = {
  eyebrow: "Recomendados",
  title: ["Proveedores", "que tienen sentido", { text: "para vos.", italic: true }] as TitleLine[],
  text: "No elegimos proveedores solamente porque trabajan en bodas. Elegimos personas y propuestas por cómo trabajan, qué transmiten y para qué tipo de celebración funcionan. Una selección pensada para tu forma de celebrar, con opciones que se acercan a tu esencia.",
  cta: { label: "Encontrar mis recomendados", href: `${routes.recomendados}#encontrar` },
};

export const howItWorks = {
  eyebrow: "Cómo funciona",
  title: ["Te preguntamos", { text: "lo justo.", italic: true }] as TitleLine[],
  steps: [
    "Nos contás qué estás organizando.",
    "Respondés algunas preguntas.",
    "Buscamos lo que se alinea con lo que estás buscando.",
    "Te contamos por qué cada propuesta tiene sentido para vos.",
  ],
  highlight: ["La recomendación no se compra.", "El criterio es nuestro."],
};

export const diario = {
  eyebrow: "Mi Diario",
  title: ["Tu boda,", "ordenada en", { text: "un solo lugar.", italic: true }] as TitleLine[],
  paragraphs: [
    "Checklist, presupuesto, invitados, proveedores, notas, tareas y planificación.",
    "Un espacio privado, fácil de usar y pensado para que puedas disfrutar del proceso.",
  ],
  note: [
    "Sin publicidad invasiva.",
    "Cuando quieras buscar proveedores, Sin Calma puede ayudarte desde afuera del Diario.",
  ],
  primary: { label: "Conocé Mi Diario", href: external.diario },
  secondary: { label: "Ingresar", href: external.diario },
  /** Completar con capturas reales en /public/images/diario/ */
  screenshot: undefined as ImageAsset | undefined,
  modules: ["Checklist", "Presupuesto", "Invitados", "Proveedores", "Notas", "Planificación"],
};

export const weddingPlanning = {
  eyebrow: "Wedding planning",
  title: ["Si querés,", "lo hacemos", { text: "con vos.", italic: true }] as TitleLine[],
  text: "Creamos bodas, destination weddings, eventos y experiencias desde la organización, el diseño y la sensibilidad.",
  experience:
    "Más de 15 años trabajando alrededor de novias y eventos nos enseñaron algo: una buena idea necesita una ejecución impecable.",
  services: ["Wedding Planning integral", "Destination weddings", "Asesorías", "Eventos privados", "Experiencias"],
  cta: { label: "Quiero trabajar con ustedes", href: `${routes.weddingPlanning}#contacto` },
  image: {
    src: "/images/wedding-planning/wp-evento.jpg",
    mobileSrc: "/images/wedding-planning/wp-evento-mobile.jpg",
    alt: "Boda al aire libre con mesa larga bajo los árboles",
    tone: "sand",
    label: "Wedding planning — panorámica",
  } satisfies ImageAsset,
};

export const experiences = {
  eyebrow: "Experiencias",
  title: ["No todo", "empieza en", { text: "una boda.", italic: true }] as TitleLine[],
  text: "Viajes, celebraciones, eventos privados, experiencias gastronómicas, encuentros y proyectos especiales.",
  primary: { label: "Explorar experiencias", href: routes.experiencias },
  secondary: { label: "Crear una experiencia", href: `${routes.experiencias}#crear` },
  image: { src: "/images/experiencias/experiencias-principal.jpg", alt: "Cena íntima en una terraza con vista al mar", tone: "sage", label: "Experiencias — horizontal" } satisfies ImageAsset,
  detail: { src: "/images/experiencias/experiencias-detalle.jpg", alt: "Copas y pan de campo sobre mantel de lino", tone: "ivory", label: "Detalle" } satisfies ImageAsset,
};

export type InspirationItem = {
  slug: string;
  kicker: string;
  title: string;
  excerpt?: string;
  image: ImageAsset;
};

/** Contenido placeholder: se reemplaza por el blog / APIs más adelante. */
export const inspiration = {
  eyebrow: "Inspiración",
  title: ["Todo lo que", "sabemos,", { text: "lo compartimos.", italic: true }] as TitleLine[],
  cta: { label: "Ir al blog", href: routes.inspiracion },
  items: [
    {
      slug: "bodas-reales",
      kicker: "Bodas reales",
      title: "Una boda de campo, sin apuro y con mucha mesa",
      excerpt: "Cómo se pensó, cómo se organizó y por qué cada decisión tuvo sentido.",
      image: { src: "/images/editorial/inspiracion-bodas-reales.jpg", alt: "Boda real en el campo con mesa larga", tone: "sand" },
    },
    {
      slug: "guias",
      kicker: "Guías",
      title: "Cómo armar el timing del día sin que se escape nada",
      image: { src: "/images/editorial/inspiracion-guias.jpg", alt: "Agenda abierta con el cronograma de una boda", tone: "ivory" },
    },
    {
      slug: "youtube",
      kicker: "YouTube",
      title: "Lo que conviene saber antes de la prueba de menú",
      image: { src: "/images/editorial/inspiracion-youtube.jpg", alt: "Vista previa de video sobre prueba de menú", tone: "charcoal" },
    },
    {
      slug: "blog",
      kicker: "Blog",
      title: "Presupuesto: por dónde empezar a ordenarlo",
      image: { alt: "Escritorio con notas de presupuesto", tone: "stone" },
    },
    {
      slug: "instagram",
      kicker: "Instagram",
      title: "Detalles, backstage y elecciones de la semana",
      image: { alt: "Detalle de flores y papelería de boda", tone: "clay" },
    },
    {
      slug: "entrevistas",
      kicker: "Entrevistas",
      title: "Conversaciones con proveedores que admiramos",
      image: { alt: "Retrato de proveedor en su taller", tone: "stone" },
    },
    {
      slug: "destination-weddings",
      kicker: "Destination weddings",
      title: "Casarse lejos: qué decidir primero",
      image: { alt: "Paisaje de destino para boda", tone: "sage" },
    },
    {
      slug: "se-dice-de-las-bodas",
      kicker: "Se dice de las bodas",
      title: "Mitos, verdades y cosas que se repiten sin pensar",
      image: { alt: "Invitados conversando en una fiesta", tone: "sand" },
    },
  ] satisfies InspirationItem[],
};

export const providers = {
  eyebrow: "Soy proveedor",
  title: ["¿Tenés una", "propuesta que", { text: "vale la pena?", italic: true }] as TitleLine[],
  paragraphs: [
    "Buscamos proveedores, espacios y experiencias con identidad, sensibilidad y calidad.",
    "Si tu propuesta puede aportar, queremos conocerla.",
  ],
  values: ["Identidad", "Sensibilidad", "Calidad"],
  note: "Cada incorporación a Sin Calma es seleccionada por afinidad, calidad y criterio.",
  cta: { label: "Quiero formar parte", href: `${routes.proveedores}#sumate` },
  image: { src: "/images/home/home-proveedores.jpg", alt: "Florista trabajando en su taller", tone: "clay", label: "Proveedores — vertical" } satisfies ImageAsset,
};

export const closing = {
  lines: ["Organizá.", "Elegí.", "Viví."],
  subtext: "Todo con más calma y menos ruido.",
  ctas: [
    { label: "Crear mi Diario", href: external.diario },
    { label: "Encontrar recomendados", href: routes.recomendados },
    { label: "Trabajar con nosotras", href: routes.weddingPlanning },
  ],
};
