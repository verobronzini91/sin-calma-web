import { external, routes } from "./navigation";
import { personRoutes } from "./people";
import type { ImageAsset } from "./types";

/**
 * /nosotras — página editorial. Textos tal cual el brief aprobado.
 *
 * Fotos: cada imagen tiene su propio archivo (“slot”) en /public/images/nosotras.
 * Mientras ese archivo no exista se usa la foto actual (segunda ruta).
 * Para reemplazar una foto alcanza con subir el archivo con el nombre del slot.
 */

const wp = (name: string) => `/images/wedding-planning/${name}`;
const nos = (name: string) => `/images/nosotras/${name}`;
/** Slot propio + foto actual de respaldo. */
const slot = (name: string, fallback: string) => [nos(name), fallback];

export const nosHero = {
  title: "Nosotras",
  text: "Somos Clari y Vero. Hermanas, socias y dos mujeres que hace más de 15 años transforman ideas en bodas, eventos y experiencias.",
  note: "de esto se trata...",
  image: {
    src: slot("hero.jpg", nos("vero-clari-juntas.jpg")),
    alt: "Vero y Clari, fundadoras de Sin Calma",
    position: "50% 40%",
  } satisfies ImageAsset,
};

export const nosHistoria = {
  title: "De esto se trata",
  text: [
    "Empezamos haciendo tocados de novia, una idea que nació de un viaje de Clari a España. Casi sin darnos cuenta aprendimos a hacer ramos, después llegaron las ambientaciones, los eventos y, con el tiempo, las bodas completas.",
    "Fueron las mismas novias las que nos pedían cada vez más. Y al principio no entendíamos por qué.",
    "Hoy lo sabemos: no buscaban solamente a alguien que resolviera. Buscaban a alguien que las escuchara, que las acompañara y que creyera en su idea tanto como ellas.",
  ],
  closing: "Así fuimos construyendo nuestra forma de trabajar.",
  images: {
    main: {
      src: slot("historia.jpg", wp("15-anios.jpg")),
      alt: "Clari y Vero sonriendo en la puerta de un edificio, con un ramo de flores",
      position: "50% 45%",
    },
    detailA: {
      src: slot("historia-detalle-01.jpg", nos("detalle-manos.jpg")),
      alt: "Manos entrelazadas junto al vestido de la novia",
      position: "45% 50%",
    },
    detailB: {
      src: slot("historia-detalle-02.jpg", wp("destino-campo.jpg")),
      alt: "Centro de flores sobre una mesa de madera en una ceremonia al aire libre",
      position: "50% 70%",
    },
  } satisfies Record<string, ImageAsset>,
};

export const nosNumeros = {
  title: "Más de 15 años junto a las novias",
  stats: [
    { value: "+50", label: "Bodas organizadas" },
    { value: "+200", label: "Novias acompañadas" },
  ],
  lost: { title: "Y perdimos la cuenta", text: "de cuántas llevaron algo hecho por nosotras." },
  /** [0] base vertical del collage · [1] superpuesta (vertical) · [2] foto suelta (horizontal, foco en las manos) */
  images: [
    {
      src: slot("numeros-01.jpg", wp("lugares-03.jpg")),
      alt: "Invitados reunidos alrededor de una mesa larga bajo los árboles",
      position: "50% 50%",
    },
    {
      src: slot("numeros-02.jpg", nos("boda-mesa-evento.jpg")),
      alt: "Mesa larga puesta para una boda en un salón",
      position: "50% 60%",
    },
    {
      src: slot("numeros-03.jpg", wp("lugares-02.jpg")),
      alt: "Manos de la novia sosteniendo un ramo de flores bordó sobre el vestido",
      position: "50% 72%",
    },
  ] satisfies ImageAsset[],
};

export const nosCreamos = {
  title: "Creamos lo que nos proponemos",
  text: [
    "Nuestra historia siempre avanzó de la misma manera: detectamos algo que faltaba y buscamos la forma de crearlo.",
    "Así llegaron los tocados, las ambientaciones, las bodas, nuestros propios productos y, más adelante, nuevas herramientas para acompañar a las novias.",
    "Nos gusta imaginar cosas nuevas, trabajar sobre lugares inesperados y empezar con una idea que todavía no tiene forma.",
  ],
  closing: "Cada etapa empezó con algo que no existía y con las ganas de hacerlo posible.",
  image: {
    src: slot("creamos-01.jpg", nos("armando-ambientacion.jpg")),
    alt: "Armando a mano una guirnalda de hojas para la ambientación de una boda",
    position: "50% 55%",
  } satisfies ImageAsset,
  /** Foto chica superpuesta al collage */
  detail: {
    src: slot("creamos-02.jpg", wp("testimonio.jpg")),
    alt: "Novia sonriendo mientras sostiene su vestido colgado de una percha",
    position: "62% 45%",
  } satisfies ImageAsset,
};

export const nosMujerCalma = {
  title: "La mujer calma",
  left: [
    "La mujer calma es auténtica y segura de sí misma.",
    "No busca parecerse a nadie ni cumplir con lo que se supone que tiene que ser una novia.",
    "Tiene una visión clara de lo que quiere, elige con conciencia y valora lo que va más allá de las apariencias.",
  ],
  right: [
    "No buscamos definir cómo tiene que ser una novia.",
    "Acompañamos mujeres reales.",
    "Mujeres que se animan a decidir, a pedir lo que quieren, a soltar lo que no las representa y a celebrar siendo exactamente quienes son.",
  ],
  closing:
    "Eso es lo que queremos lograr en cada novia: que llegue a su boda más segura, más libre y más ella que nunca.",
  image: {
    src: slot("mujer-calma.jpg", nos("novia-balcon.jpg")),
    alt: "Novia en un balcón abierto, junto a su vestido colgado, antes de la boda",
    position: "76% 50%",
  } satisfies ImageAsset,
};

export const nosMantra = {
  note: "nuestro mantra",
  lead: "Creemos que la calma está en la libertad de ser quienes somos.",
  lines: ["Elegir lo que queremos,", "vestirnos como sentimos", "y celebrar a nuestra manera", "es el reflejo de una paz verdadera."],
  closing: "Sin calma no hay boda.",
  image: {
    src: slot("mantra-01.jpg", wp("acompanamiento.jpg")),
    alt: "Novia de espaldas en una ceremonia sobre un muelle frente al lago",
    position: "50% 55%",
  } satisfies ImageAsset,
  /** Foto chica superpuesta al collage */
  detail: {
    src: slot("mantra-02.jpg", wp("experiencia.jpg")),
    alt: "DJs pasando música bajo una carpa durante la fiesta de una boda",
    position: "50% 30%",
  } satisfies ImageAsset,
};

export const nosMiradas = {
  title: "Dos miradas, una misma forma de hacer",
  people: [
    {
      name: "Vero",
      disciplines: ["Organización", "Wedding Planning", "Estrategia", "Comunicación"],
      question: "¿Cómo hacemos que esto pase?",
      cta: { label: "Conocer a Vero", href: personRoutes.vero },
      image: {
        src: slot("vero.jpg", "/images/vero/vero-retrato.jpg"),
        alt: "Retrato de Vero, wedding planner de Sin Calma",
        position: "50% 45%",
      } satisfies ImageAsset,
    },
    {
      name: "Clari",
      disciplines: ["Diseño", "Estética", "Dirección creativa", "Curaduría"],
      question: "¿Cómo queremos que esto se sienta?",
      cta: { label: "Conocer a Clari", href: personRoutes.clari },
      image: {
        src: slot("clari.jpg", "/images/clari/clari-retrato.jpg"),
        alt: "Clari acomodando el peinado de una novia",
        position: "55% 40%",
      } satisfies ImageAsset,
    },
  ],
};

export const nosVinculo = {
  title: "Lo esencial siempre fue el vínculo",
  lead: "La organización importa. El diseño importa. Los detalles importan.",
  text: [
    "Pero hay algo que atraviesa todo: conocer a la mujer que tenemos del otro lado.",
    "Escucharla. Entender qué quiere y también qué no quiere. Acompañarla en decisiones que muchas veces toma por primera vez. Y recordarle, cuando duda, que tiene todo para lograrlo.",
    "Por eso trabajamos de una manera cercana.",
  ],
  closing: ["Porque una experiencia verdaderamente personal no empieza con una tendencia.", "Empieza con una conversación."],
  image: {
    src: slot("vinculo.jpg", wp("historia-propia.jpg")),
    alt: "Ajuste del vestido en la espalda de la novia antes de la ceremonia",
    position: "40% 40%",
  } satisfies ImageAsset,
};

export const nosCierre = {
  title: "Lo que hacemos por vos",
  text: [
    "Organizamos bodas con identidad.",
    "Creamos herramientas y experiencias para acompañarte.",
    "Y ponemos nuestra experiencia al servicio de cada mujer que quiere celebrar siendo ella misma.",
  ],
  cta: { label: "Conocé nuestro Wedding Planning", href: routes.weddingPlanning },
  diario: {
    before: "¿Organizás tu boda por tu cuenta? Conocé ",
    label: "El Diario de la Novia",
    href: external.diario,
    after: ".",
  },
};
