import type { ImageAsset } from "./types";

/**
 * Proveedores curados (/recomendados). Todo lo de la sección se edita en este archivo.
 *
 * Para sumar un proveedor: copiar El Campo El Paraíso (el modelo) al final de `all` y completar
 * sus datos. Los campos opcionales que queden vacíos no se muestran.
 * Fotos en /public/images/proveedores/<slug>/.
 */

/** `label` se usa en los filtros; `one`, en la tarjeta y la ficha ("Lugar · Open Door") */
export const proveedorCategories = [
  { id: "lugares", label: "Lugares", one: "Lugar" },
  { id: "vestidos", label: "Diseñadoras de vestido", one: "Diseñadora de vestido" },
  { id: "joyeria", label: "Joyería & accesorios", one: "Joyería & accesorios" },
  { id: "civil", label: "Civil", one: "Civil" },
  { id: "gastronomia", label: "Gastronomía", one: "Gastronomía" },
  { id: "barra", label: "Barra de tragos", one: "Barra de tragos" },
  { id: "ambientacion", label: "Ambientación", one: "Ambientación" },
  { id: "flores", label: "Flores", one: "Flores" },
  { id: "foto-video", label: "Foto & video", one: "Foto & video" },
  { id: "musica", label: "Música", one: "Música" },
  { id: "beauty", label: "Beauty", one: "Beauty" },
  { id: "papeleria", label: "Papelería", one: "Papelería" },
  { id: "transporte", label: "Transporte", one: "Transporte" },
  { id: "experiencias", label: "Experiencias", one: "Experiencia" },
] as const;

export type ProveedorCategory = (typeof proveedorCategories)[number]["id"];

/**
 * Video vertical (9:16) de la ficha. Con `src` vacío no se muestra nada y la galería ocupa su lugar.
 * - "youtube": link de YouTube (watch, youtu.be o shorts)
 * - "video": MP4 en /public (ej: "/videos/proveedores/<slug>.mp4") o URL de un archivo de video
 * - "embed": URL para embeber tal cual (ej: https://www.instagram.com/reel/<id>/embed)
 */
export type ProveedorReel = { type: "youtube" | "video" | "embed"; src: string; poster?: string };

export type Proveedor = {
  /** Ruta: /recomendados/<slug> */
  slug: string;
  name: string;
  category: ProveedorCategory;
  /** "Zona, Provincia". En la tarjeta y la ficha se ve sólo la zona (lo anterior a la coma). */
  location?: string;
  /** Breve descripción: se ve en la tarjeta y en la ficha */
  highlight: string;
  /** Descripción más larga para la ficha (opcional; si está, reemplaza a `highlight` en la ficha) */
  description?: string[];
  /** Por qué lo elegimos */
  whyWeChooseIt: string[];
  /** Nuestra mirada (opcional) */
  ourView?: string[];
  coverImage: ImageAsset;
  /** Carrusel de la ficha, en orden */
  gallery: ImageAsset[];
  reel?: ProveedorReel;
  /** URL completa del perfil. Es el contacto principal. */
  instagram?: string;
  website?: string;
  /** Número con código de país, sin + ni espacios, ej: "5491100000000" */
  whatsapp?: string;
  email?: string;
  /** Borrador: no se publica (sólo se ve con SHOW_DRAFTS=1, para revisar en local) */
  draft?: boolean;
};

const showDrafts = process.env.SHOW_DRAFTS === "1";

const paraiso = (file: string, alt: string): ImageAsset => ({ src: `/images/proveedores/el-campo-el-paraiso/${file}`, alt });

const all: Proveedor[] = [
  // Modelo para los próximos proveedores. Fuente: estudiovebe.com/proyectos/buenos-aires
  {
    slug: "el-campo-el-paraiso",
    name: "El Campo El Paraíso",
    category: "lugares",
    location: "Open Door, Buenos Aires",
    highlight:
      "Un campo en Open Door para crear una boda completamente a medida, con espíritu de destino pero a pocos kilómetros de la ciudad.",
    whyWeChooseIt: [
      "Lo recomendamos porque es un campo ideal para crear una verdadera experiencia de boda.",
      "Está a pocos kilómetros de la ciudad, pero permite vivir el casamiento como si fuera una boda de destino: elegir el formato, los proveedores, los tiempos y la manera de celebrar.",
      "Podés diseñar el evento 100% a tu medida e incluso extenderlo durante varios días para que tus invitados vivan algo mucho más completo que una sola noche.",
      "Nos gusta especialmente por esa libertad: el espacio se adapta a la boda, y no al revés.",
    ],
    ourView: [
      "Para nosotras, el lugar de una boda no es solamente un escenario.",
      "Puede convertirse en parte de la experiencia.",
      "El Paraíso permite empezar con una idea y construir alrededor de ella una celebración propia, sin paquetes cerrados ni formatos preestablecidos.",
    ],
    coverImage: paraiso("living-en-el-parque.jpg", "Living de sillones blancos y mesas bajas de madera con flores, sobre el pasto"),
    // Empieza con la portada; después espacio, ambientación, detalle y momentos; cierra con la fiesta de noche
    gallery: [
      paraiso("living-en-el-parque.jpg", "Living de sillones blancos y mesas bajas de madera con flores, sobre el pasto"),
      paraiso("mesa-larga-sobre-el-pasto.jpg", "Mesa larga con flores de colores y sillas de madera sobre el pasto, frente al campo"),
      paraiso("casa-bajo-los-arboles.jpg", "Casa de ladrillo con galería, bajo un árbol grande, frente al parque"),
      paraiso("parque-con-galeria.jpg", "Parque con árboles, un ciruelo en flor y una galería de madera al fondo"),
      paraiso("mesa-puesta-con-flores.jpg", "Detalle de la mesa puesta: centros de flores, platos con servilletas celestes y copas"),
      paraiso("carpa-pista-de-baile.jpg", "Carpa con arco de follaje verde, pista de baile y cabina de DJ, con banquetas blancas"),
      paraiso("mesa-de-quesos-y-fiambres.jpg", "Mesa de quesos, fiambres y limones al aire libre"),
      paraiso("campo-al-atardecer.jpg", "Campo al atardecer entre árboles, con un caballo pastando detrás del alambrado"),
      paraiso("fiesta-bajo-las-luces.jpg", "Invitados en mesas sobre el pasto bajo guirnaldas de luces, al anochecer"),
    ],
    // Pegar el link de YouTube en `src` y el Reel aparece solo
    reel: { type: "youtube", src: "" },
    instagram: "https://www.instagram.com/elparaiso.opendoor/",
  },
];

export const proveedores = all.filter((p) => showDrafts || !p.draft);

export const getProveedor = (slug: string) => proveedores.find((p) => p.slug === slug);

export const proveedorCategoryLabel = (id: ProveedorCategory) => proveedorCategories.find((c) => c.id === id)?.one ?? id;

export const proveedoresPage = {
  title: "Proveedores curados",
  intro: {
    /** Cada párrafo es una lista de tramos; `hand` va en manuscrito azul, `accent` en serif itálica azul */
    paragraphs: [
      [{ text: "Si contratás a alguno de estos proveedores porque lo conociste a través de nuestras recomendaciones, escribinos." }],
      [{ text: "Tenemos un " }, { text: "regalo exclusivo —y secreto—", accent: true }, { text: " para vos." }],
      [
        { text: "Así te convertís en una " },
        { text: "Novia Calma", hand: true },
        { text: " y accedés a propuestas y experiencias creadas especialmente para nuestra comunidad." },
      ],
      [
        {
          text: "Los encuentros y eventos exclusivos que ves en nuestras redes son parte de esta curaduría de proveedores y están pensados únicamente para nuestras novias.",
        },
      ],
    ] as { text: string; hand?: boolean; accent?: boolean }[][],
  },
  search: {
    title: "¿Qué estás buscando para tu boda?",
    placeholder: "Buscá lugares, vestidos, fotógrafos…",
    label: "Buscar proveedores",
  },
  filters: { all: "Todos", label: "Categorías" },
  badge: "Recomendado por Sin Calma",
  /** Sin proveedores publicados: cierre debajo de las categorías */
  none: "Estamos armando nuestra selección.",
  /** Hay proveedores, pero la búsqueda o la categoría no encuentra ninguno */
  empty: "Todavía no hay proveedores en esta selección.",
  detail: {
    why: "Por qué lo elegimos",
    ourView: "Nuestra mirada",
    contact: "Contacto",
    instagram: "Contactar por Instagram",
    website: "Web",
    whatsapp: "WhatsApp",
    email: "Escribir",
    gallery: { prev: "Foto anterior", next: "Foto siguiente" },
    reel: "Reel",
  },
};
