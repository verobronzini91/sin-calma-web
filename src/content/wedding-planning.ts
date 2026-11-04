import type { ImageAsset } from "./types";

/**
 * Textos de /wedding-planning, tal cual `references/wedding-planning/textos.md`.
 * Las fotos viven en /public/images/wedding-planning; `position` es el foco del recorte.
 */
const img = (name: string) => `/images/wedding-planning/${name}.jpg`;

export const wpHero = {
  title: ["Wedding planner", "de bodas como", "experiencia"],
  text: [
    "Diseñamos casamientos con identidad, pensados alrededor de su historia y de su manera de celebrar.",
    "Sin fórmulas ni paquetes cerrados: partimos de ustedes.",
  ],
  image: {
    src: img("hero"),
    alt: "Carpa abierta entre árboles altos con los invitados de una boda en el parque",
    position: "50% 74%",
  } satisfies ImageAsset,
};

export const wpHistoria = {
  title: ["Más que una boda,", "una historia propia."],
  image: {
    src: img("historia-propia"),
    alt: "Ajuste del vestido en la espalda de la novia antes de la ceremonia",
    position: "50% 38%",
  } satisfies ImageAsset,
};

export const wpExperiencia15 = {
  title: { before: "MÁS DE", number: "15", after: "AÑOS" },
  text: [
    "Durante más de 15 años acompañamos novias, parejas y eventos que nos enseñaron que ninguna boda debería sentirse igual a otra.",
    "Nuestra experiencia se construyó creando casamientos distintos, desarrollando ideas desde cero, trabajando en lugares inesperados y resolviendo todo lo necesario para convertir una idea en una experiencia real.",
    "No seguimos fórmulas. Aprendimos a escuchar, producir y encontrar la manera de hacer posible aquello que, muchas veces, todavía no existe.",
  ],
  note: "Más de 15 años creando bodas con identidad.",
  image: {
    src: img("15-anios"),
    alt: "Vero y Clari sonriendo en la puerta de un edificio, con un ramo de flores",
    position: "50% 45%",
  } satisfies ImageAsset,
};

export const wpComoExperiencia = {
  title: "Bodas pensadas como experiencia",
  text: [
    "Nos interesa crear algo que se viva, no solamente algo que se vea lindo.",
    "Pensamos cada boda como una experiencia completa: el lugar, los tiempos, la música, la gastronomía, la ambientación, los recorridos, los encuentros y cada decisión que hace que ese día tenga una identidad propia.",
    "Puede ser una comida larga en el campo, una celebración de varios días, una fiesta en una casa, una boda de destino o un evento creado completamente para esa ocasión.",
    "Lo importante es que cuando alguien llegue diga:",
  ],
  quote: "“Esto son ellos.”",
  image: {
    src: img("experiencia"),
    alt: "DJs pasando música bajo una carpa durante la fiesta de una boda",
    position: "50% 30%",
  } satisfies ImageAsset,
};

export const wpLugares = {
  title: "Bodas en lugares no tradicionales",
  intro: "Muchas bodas empiezan con una frase:",
  quote: "“Queremos hacer algo distinto, pero no sabemos cómo.”",
  text: [
    "Nuestro trabajo es transformar eso en algo real.",
    "Hicimos casamientos en campos, casas, espacios vacíos y lugares sin infraestructura que había que pensar desde cero.",
    "Buscamos el lugar, imaginamos cómo usarlo y armamos el equipo, los proveedores, la logística y la producción necesaria para que funcione.",
  ],
  closing: ["Nos gusta trabajar sobre lo que parece difícil.", "A veces, incluso sobre lo que parece imposible."],
  note: "Hacemos posible lo imposible.",
  images: [
    {
      src: img("lugares-01"),
      alt: "Carpa tensada y livings al aire libre bajo árboles en un parque",
      position: "50% 85%",
    },
    {
      src: img("lugares-02"),
      alt: "Invitados entre sombrillas y sillones en el jardín de una casa",
      position: "50% 66%",
    },
    {
      src: img("lugares-03"),
      alt: "Invitados reunidos alrededor de una mesa larga bajo los árboles",
      position: "50% 50%",
    },
  ] satisfies ImageAsset[],
};

export const wpDestino = {
  title: "Bodas de destino y bodas en el campo",
  text: [
    "Casarse lejos de casa, en medio del campo o en un lugar que nunca fue pensado para una boda requiere algo más que una buena idea.",
    "Requiere producción, logística y un equipo que sepa resolver en el lugar.",
    "Coordinamos todo el proceso aunque los novios vivan lejos del destino elegido, para que puedan llegar a su boda sabiendo que cada detalle está pensado y resuelto.",
  ],
  image: {
    src: img("destino-campo"),
    alt: "Centro de flores sobre una mesa de madera frente a los bancos de una ceremonia al aire libre",
    position: "50% 62%",
  } satisfies ImageAsset,
};

export const wpRecorrido = {
  title: "Un proceso pensado para que disfruten cada etapa.",
  subtitle: "Un acompañamiento cercano, claro y flexible.",
  steps: [
    {
      label: "Paso 1",
      title: "Concepto y diseño",
      text: "Partimos de su historia para crear una propuesta con identidad, estética y sentido.",
    },
    {
      label: "Paso 2",
      title: "Lugar y experiencia",
      text: "Buscamos escenarios inesperados y los convertimos en el marco perfecto para una celebración única.",
    },
    {
      label: "Paso 3",
      title: "Producción y proveedores",
      text: "Armamos el equipo, la logística y cada detalle necesario para que lo imposible se vuelva real.",
    },
    {
      label: "Paso 4",
      title: "Coordinación del día",
      text: "Ordenamos los tiempos y la ejecución para que todo suceda con calma y fluidez.",
    },
  ],
};

export const wpAcompanamiento = {
  title: "Un acompañamiento real",
  text: [
    "Organizar una boda implica muchas decisiones y muchos meses compartidos.",
    "Nos conocemos, hablamos mucho y entendemos qué les importa, qué no quieren, qué los representa y cuándo necesitan que alguien simplemente resuelva.",
    "Con muchas parejas terminamos generando un vínculo que se parece bastante a una amistad.",
  ],
  closing: "Porque para crear algo verdaderamente personal, primero tenemos que conocerlos.",
  image: {
    src: img("acompanamiento"),
    alt: "Ceremonia sobre un muelle frente al lago, con un arco de flores y hojas",
    position: "50% 50%",
  } satisfies ImageAsset,
};

/**
 * PLACEHOLDER — testimonio DE MUESTRA, no es una reseña real.
 * Reemplazar por testimonios verdaderos antes de publicar. No inventar citas.
 */
export const wpTestimonios = {
  title: "Testimonios",
  items: [
    {
      quote:
        "Desde la primera reunión sentimos que entendieron exactamente lo que queríamos, incluso antes de que nosotros supiéramos cómo explicarlo. Tomaron un lugar que nunca había sido pensado para una boda y lo transformaron completamente, sin que dejara de sentirse nuestro. Durante meses fueron quienes ordenaban, resolvían y nos devolvían la calma cada vez que aparecía algo nuevo. El día del casamiento solo tuvimos que llegar y disfrutar.",
      author: "— Testimonio de pareja · texto de muestra",
      sample: true,
    },
  ],
  image: {
    src: img("testimonio"),
    alt: "Novia sonriendo mientras sostiene su vestido colgado de una percha",
    position: "60% 45%",
  } satisfies ImageAsset,
};

export const wpServicio = {
  title: "Qué incluye nuestro servicio de Wedding Planning",
  intro: [
    "Cada proyecto se arma según lo que esa boda necesita.",
    "Podemos acompañarlos desde la primera idea hasta el último detalle.",
  ],
  items: [
    {
      title: "Concepto y diseño",
      text: "Dirección general y creativa, desarrollo del concepto y diseño de la experiencia y estética de la boda.",
    },
    {
      title: "Espacio y proveedores",
      text: "Búsqueda y selección de lugares, desarrollo de bodas en espacios no tradicionales y selección y coordinación de proveedores.",
    },
    {
      title: "Presupuesto y producción",
      text: "Planificación del presupuesto, logística y producción integral del evento.",
    },
    {
      title: "Coordinación del día de la boda",
      text: "Cronograma, coordinación general y ejecución del día para que ustedes puedan dedicarse a vivirlo.",
    },
  ],
};
