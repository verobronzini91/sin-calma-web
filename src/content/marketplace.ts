import type { ImageAsset } from "./types";

/**
 * Marketplace de la novia.
 *
 * Sin Calma presenta y editorializa; la compra se hace siempre en la tienda oficial
 * de cada marca (`externalUrl`). No hay carrito, pagos, stock ni cuentas.
 *
 * - SHOP (/marketplace): grilla de `marketplaceProducts`. Cada producto tiene su ficha
 *   en /marketplace/[slug]; la grilla, los filtros, la ficha y el sitemap se arman solos.
 * - CÁPSULAS (/marketplace/capsulas): un bloque por cada `marketplaceCapsules`.
 *
 * Para sumar un producto o una colaboración alcanza con agregar un objeto a la lista.
 */

/* -------------------------------------------------------------------------- */
/* Categorías (filtros del SHOP). Para sumar otra, agregarla acá.               */
/* -------------------------------------------------------------------------- */

export const marketplaceCategories = [
  { id: "zapatos", label: "Zapatos" },
  { id: "joyeria", label: "Joyería" },
] as const;

export type MarketplaceCategory = (typeof marketplaceCategories)[number]["id"];

/* -------------------------------------------------------------------------- */
/* Cápsulas (colaboraciones)                                                    */
/* -------------------------------------------------------------------------- */

export type MarketplaceCapsule = {
  /** Identificador; los productos lo usan en `capsule` */
  slug: string;
  /** Nombre de la colaboración; se muestra en versalitas debajo de cada producto */
  name: string;
  brand: string;
  /** Titular del bloque en /marketplace/capsulas */
  title: string;
  text: string[];
  /** Remate destacado (opcional) */
  statement?: string;
  /**
   * Foto grande del bloque: ruta en /public o URL de la tienda de la marca.
   * Si el archivo todavía no existe se ve el espacio reservado con su nombre.
   */
  image: ImageAsset;
  /** Tienda oficial de la marca (se abre en otra pestaña). Vacío = el link no se muestra. */
  externalUrl?: string;
  /** Texto del link (la flecha → se agrega sola) */
  externalCta: string;
};

/** Fotos de calmashoes.com (Tiendanube), a 1024 px */
const calmaImg = (file: string, ext = "webp") =>
  `https://acdn-us.mitiendanube.com/stores/002/031/494/products/${file}-1024-1024.${ext}`;

export const marketplaceCapsules: MarketplaceCapsule[] = [
  {
    slug: "calma-zus",
    name: "Sin Calma × Calma Zus",
    brand: "Calma Zus",
    title: "Sin Calma × Calma Zus",
    text: [
      "Buscamos crear una marca de zapatos porque no había en el mercado una marca que combine comodidad, diseño y atemporalidad; lo que nos parecía clave para poder vestir a una novia.",
      "Por eso nos unimos al mejor taller de Recoleta, fusionando su trayectoria y excelencia en calidad con nuestro conocimiento en lo que la novia está buscando.",
    ],
    statement: "Buscamos vestir mujeres que pisen fuerte.",
    image: {
      src: calmaImg("cassandra6cm11_mesa-de-trabajo-11-72af7fbadd343b694616727767033998"),
      alt: "Detalle de la tira de lino de un zapato Cassandra de Calma Zus",
    },
    externalUrl: "https://calmashoes.com",
    externalCta: "Ver más",
  },
  {
    slug: "clave",
    name: "Sin Calma × Clave",
    brand: "Clave",
    title: "Sin Calma × Clave",
    text: [
      "Nuestro punto de partida fue a través de nuestras joyas que conocimos a las novias.",
      "Creemos que no son solo accesorios, sino piezas que acompañan a la mujer en los mejores momentos de su vida. Son pequeños tesoros que forman parte de una historia: la de una mujer.",
      "Junto con Clave, hemos creado esta colección inspirada por mujeres para mujeres que quieran destacarse.",
    ],
    image: {
      src: calmaImg("312-5d0efa9ee1267fa18517823938770411"),
      alt: "Tocados Oliva dorados en un recogido",
    },
    // Las piezas de Clave se compran en la tienda de Calma
    externalUrl: "https://calmashoes.com/accesorios-y-tocados-de-novia/",
    externalCta: "Ver más",
  },
];

export function getMarketplaceCapsule(slug: string) {
  return marketplaceCapsules.find((capsule) => capsule.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Productos                                                                    */
/* -------------------------------------------------------------------------- */

export type MarketplaceProduct = {
  /** URL interna: /marketplace/[slug] (no usar “capsulas”) */
  slug: string;
  name: string;
  brand: string;
  /** `slug` de la cápsula a la que pertenece (ver `marketplaceCapsules`) */
  capsule: string;
  category: MarketplaceCategory;
  /** Frase corta del producto, tal como la presenta la marca */
  tagline?: string;
  /** Descripción (párrafos), tomada de la tienda de la marca */
  description: string[];
  /** Características: { label: "Taco", value: "6 cm" } */
  details?: { label: string; value: string }[];
  /**
   * Fotos. La primera es la del producto aislado: grilla, Home y miniatura de la ficha.
   * Todas juntas forman la galería de la ficha. Pueden ser URLs de la tienda o fotos
   * propias en /public/images/marketplace/[slug]/ (ej. "/images/marketplace/cadiz/01.jpg").
   * Con la lista vacía se usa la foto principal de la página del producto (og:image).
   */
  images: ImageAsset[];
  /**
   * Tamaño del producto en la grilla del SHOP, sólo si hace falta corregirlo:
   * 1 = como viene en la foto. Si no se indica, se usa `marketplaceGridScale` según la categoría.
   */
  gridScale?: number;
  /** Sólo si decidimos mostrar precio, ej. "$ 00.000" */
  priceLabel?: string;
  /** Página del producto en la tienda oficial. Vacío = el botón de compra no se muestra. */
  externalUrl?: string;
  /** Texto del botón de compra, ej. "Comprar en Calma" (la flecha ↗ se agrega sola) */
  externalCta: string;
};

/**
 * Tamaño de los productos en la grilla del SHOP, por categoría (1 = como viene en la foto).
 * Con 0.75 los zapatos ocupan entre el 37% y el 45% del ancho del módulo. Las joyas varían
 * mucho de tamaño: las más chicas se corrigen con `gridScale` en cada producto.
 */
export const marketplaceGridScale: Record<MarketplaceCategory, number> = { zapatos: 0.75, joyeria: 0.9 };

const calmaZus = { brand: "Calma Zus", capsule: "calma-zus", externalCta: "Comprar en Calma" } as const;
/** Joyas y tocados de la cápsula con Clave; se compran en calmashoes.com */
const clave = { brand: "Clave", capsule: "clave", externalCta: "Comprar en Calma" } as const;

/** Textos y fotos tomados de cada ficha de calmashoes.com */
export const marketplaceProducts: MarketplaceProduct[] = [
  /* Zapatos: calmashoes.com/zapatos-comodos-de-novia (mismo orden que la tienda) */
  {
    ...calmaZus,
    slug: "danes",
    name: "Danés",
    category: "zapatos",
    tagline: "Minimalismo puro, hecho para brillar.",
    description: [
      "Nuestro modelo Danés tapa todo tipo de imperfecciones del pie, ideal si queres tapar algún juanete que no te guste. Sostiene el pie y lo hace el zapato más cómodo de toda nuestra colección.",
      "Nuestro modelo Danés es perfecto para novias modernas e invitadas elegantes que valoran la simplicidad con carácter. Tiene ese equilibrio sutil entre lo clásico y lo contemporáneo: un diseño minimalista que combina con todo. Va muy bien para aquellas novias que busquen un zapato intermedio entre lo que es cerrado y sandalia.",
      "Cada par se confecciona artesanalmente por zapateros expertos en Argentina, lo que lo convierte en una pieza única e irrepetible. Al trabajar con cuero vacuno natural, puede haber leves variaciones de tono según la partida.",
      "¿Querés otro color o textura? Escribinos y personalizamos tu par para crearlo juntas. Hacemos zapatos de novia a medida de lo que soñás.",
    ],
    details: [
      { label: "Preventa", value: "Lo encargás y en 20 días está listo (si lo necesitás urgente avisanos antes)" },
      { label: "Taco", value: "8 cm" },
      { label: "Plataforma", value: "Con plataforma de 2 cm" },
      { label: "Inclinación real al caminar", value: "6 cm" },
      { label: "Material", value: "Cuero vacuno natural color Tiza granulado, con acabado mate y suave." },
    ],
    images: [
      { src: calmaImg("2-a35c47f68a0028ae1717842980700624"), alt: "Danés de perfil" },
      { src: calmaImg("9-c0ec9d2ac6f17d35ba17842980918052"), alt: "Danés" },
      { src: calmaImg("8-71c946a01feb75e1af17842980879908"), alt: "Danés" },
      { src: calmaImg("7-2643c053ff6effdca617842980909883"), alt: "Danés" },
      { src: calmaImg("6-c57c502d8a8d5c787a17842980903017"), alt: "Danés" },
      { src: calmaImg("5-683f6a005f8a4dd40f17842980891152"), alt: "Danés" },
      { src: calmaImg("4-e1d0835b87f0f94f5617842980898382"), alt: "Danés" },
      { src: calmaImg("3-46696f83580ea3ae0417842980904230"), alt: "Danés" },
    ],
    externalUrl: "https://calmashoes.com/productos/danes-o8jy4/",
  },
  {
    ...calmaZus,
    slug: "uma-charol",
    name: "Uma Charol",
    category: "zapatos",
    description: [
      "Utilizamos cuero vacuno natural, si bien tratamos de utilizar siempre el mismo cuero, las partidas pueden sufrir alteraciones en su teñido.",
      "Cada zapato es único, hecha a mano por zapateros artesanos.",
    ],
    details: [
      { label: "Material", value: "Cuero vacuno acharolado color Tiza." },
      { label: "Taco", value: "9 cm" },
      { label: "Plataforma delantera", value: "3 cm" },
      { label: "Altura total", value: "10 cm, con plantilla y tapita" },
    ],
    images: [
      { src: calmaImg("122-599005144a1709119f17818970795821"), alt: "Uma Charol de perfil" },
      { src: calmaImg("whatsapp-image-2022-03-21-at-16-02-371-3b469493169a2a55b316478917857882"), alt: "Uma Charol" },
      { src: calmaImg("96-377f21c828d0c2451217430078040073"), alt: "Uma Charol" },
      { src: calmaImg("27-0af7803b721cbdfd9417268302395421"), alt: "Uma Charol" },
      { src: calmaImg("26-74804943d01782b89317268302394958"), alt: "Uma Charol" },
      { src: calmaImg("24-23aa67b68f9d50b02317268302399092"), alt: "Uma Charol" },
      { src: calmaImg("73-f9f6257d5444c424fa17309020326396"), alt: "Uma Charol" },
    ],
    externalUrl: "https://calmashoes.com/productos/uma-charol/",
  },
  {
    ...calmaZus,
    slug: "cassandra-8",
    name: "Cassandra 8",
    category: "zapatos",
    tagline: "Nuestro ícono. El zapato más cómodo.",
    description: [
      "Cassandra es el modelo más elegido por novias que buscan algo diferente pero atemporal. Su mezcla de materiales lo hace muy versátil: al combinar distintos tonos de blanco, va bien con casi todos los vestidos de novia. Acompaña con personalidad sin robar protagonismo — es ese detalle sutil que eleva cualquier look.",
      "Cada Cassandra se confecciona por zapateros artesanos argentinos, con dedicación, saber hacer y respeto por el oficio. No hay dos pares iguales: cada uno cuenta una historia.",
    ],
    details: [
      { label: "Taco", value: "8 cm" },
      { label: "Plataforma", value: "1 cm" },
      { label: "Inclinación real al caminar", value: "7 cm" },
      { label: "Material", value: "Combinación de cuero vacuno color Tiza y lino natural, una dupla que logra el equilibrio perfecto entre originalidad y textura. Cada par puede presentar leves variaciones de tono, propias del trabajo artesanal." },
    ],
    images: [
      { src: calmaImg("120-9b0c5259bf4c1c1c6617818972189800"), alt: "Cassandra 8 de perfil" },
      { src: calmaImg("110-9d10b5c0f5cca3dcbe17430055795977"), alt: "Cassandra 8" },
      { src: calmaImg("111-6b157532e53bf9954617430055794126"), alt: "Cassandra 8" },
      { src: calmaImg("5-1db590eb47eec9a4d117624013178587"), alt: "Cassandra 8" },
      { src: calmaImg("104-4672e7f67d48dae43217430037612889"), alt: "Cassandra 8" },
      { src: calmaImg("105-c7552f0d4b38e3b39e17430037619502"), alt: "Cassandra 8" },
    ],
    externalUrl: "https://calmashoes.com/productos/cassandra-8/",
  },
  {
    ...calmaZus,
    slug: "cadiz",
    name: "Cádiz",
    category: "zapatos",
    tagline: "Minimalismo puro, hecho para brillar.",
    description: [
      "Cádiz 6 es perfecto para novias modernas e invitadas elegantes que valoran la simplicidad con carácter. Tiene ese equilibrio sutil entre lo clásico y lo contemporáneo: un diseño minimalista que combina con todo.",
      "Cada par se confecciona artesanalmente por zapateros expertos en Argentina, lo que lo convierte en una pieza única e irrepetible.",
      "¿Querés otro color o textura? Escribinos y personalizamos tu par para crearlo juntas.",
    ],
    details: [
      { label: "Taco", value: "6 cm" },
      { label: "Plataforma", value: "Sin plataforma" },
      { label: "Inclinación real al caminar", value: "6 cm" },
      {
        label: "Material",
        value:
          "Cuero vacuno natural color Tiza, con acabado mate y suave. Puede haber leves variaciones de tono según la partida.",
      },
    ],
    images: [
      { src: calmaImg("118-976610fd7eb95efde817818686022425"), alt: "Cádiz de perfil" },
      { src: calmaImg("cadiz1-bb4e60bb0494b5f98117099395014893", "jpg"), alt: "Par de Cádiz" },
      { src: calmaImg("whatsapp-image-2024-08-12-at-08-00-35-2-804542f869924882dc17240976762031"), alt: "Cádiz sobre una tarima de madera" },
      { src: calmaImg("21-8b86db389ec6376b5e17268298918605"), alt: "Novia con las Cádiz debajo del vestido" },
      { src: calmaImg("22-6f9508cde881caf86d17268298918706"), alt: "Detalle de las Cádiz puestas" },
      { src: calmaImg("20-50af6f77e1b08a2bfa17268298920900"), alt: "Novia con las Cádiz frente a una puerta de madera" },
    ],
    externalUrl: "https://calmashoes.com/productos/cadiz/",
  },
  {
    ...calmaZus,
    slug: "casilda-8-suela",
    name: "Casilda 8 Suela",
    category: "zapatos",
    tagline: "Textura natural y carácter para brillar de día o de noche.",
    description: [
      "Casilda es para invitadas que buscan algo distinto al clásico blanco: un modelo original, fresco y con personalidad. La rafia y el tono suela lo hacen perfecto para casamientos de día, al aire libre o de verano, y combina con looks en tierras, beige y tostados.",
      "Cada par se confecciona artesanalmente por zapateros artesanos argentinos. Usamos cuero natural y, aunque buscamos siempre el mismo material, las partidas pueden tener leves variaciones de tono en el teñido — eso hace que tu Casilda sea única.",
    ],
    details: [
      { label: "Taco", value: "8 cm" },
      { label: "Plataforma delantera", value: "1 cm" },
      { label: "Inclinación real al caminar", value: "7 cm (la plataforma hace que un taco de 8 se sienta como 7)" },
      { label: "Material", value: "Cuero vacuno natural color Suela combinado con rafia. Una textura fresca y original que le da carácter." },
    ],
    images: [
      { src: calmaImg("134-af16bbfa303f93cdc817821333343415"), alt: "Casilda 8 Suela de perfil" },
      { src: calmaImg("168-c72690cdd8bacbc4bd17430141831643"), alt: "Casilda 8 Suela" },
      { src: calmaImg("169-4e3c8c04980371471117430141838191"), alt: "Casilda 8 Suela" },
      { src: calmaImg("172-c9f8b1e6fbd4e5d5a317430141836923"), alt: "Casilda 8 Suela" },
      { src: calmaImg("170-642af417c2fbf26abd17430141840677"), alt: "Casilda 8 Suela" },
    ],
    externalUrl: "https://calmashoes.com/productos/casilda-8-suela1/",
  },
  {
    ...calmaZus,
    slug: "cassandra-6",
    name: "Cassandra 6",
    category: "zapatos",
    tagline: "Nuestro ícono. Elegancia natural, diseño inolvidable.",
    description: [
      "Cassandra es el modelo más elegido por novias que buscan algo diferente pero atemporal. Su mezcla de materiales lo hace muy versátil: al combinar distintos tonos de blanco, va bien con casi todos los vestidos de novia. Acompaña con personalidad sin robar protagonismo — es ese detalle sutil que eleva cualquier look. Esta es la versión de taco bajo (6 cm), ideal si querés la comodidad de Cassandra con menos altura.",
      "Cada Cassandra se confecciona por zapateros artesanos argentinos, con dedicación, saber hacer y respeto por el oficio. No hay dos pares iguales: cada uno cuenta una historia.",
    ],
    details: [
      { label: "Taco", value: "6 cm" },
      { label: "Plataforma", value: "Sin plataforma" },
      {
        label: "Material",
        value:
          "Combinación de cuero vacuno color Tiza y lino natural. Cada par puede presentar leves variaciones de tono, propias del trabajo artesanal.",
      },
    ],
    images: [
      { src: calmaImg("ficha-de-producto-8-000d03c80aaaf152fe17821338204445"), alt: "Cassandra 6 de perfil" },
      { src: calmaImg("copia-de-31-df4f769b21ba16659716746106783415"), alt: "Par de Cassandra 6" },
      { src: calmaImg("cassandra6cm11_mesa-de-trabajo-11-72af7fbadd343b694616727767033998"), alt: "Detalle de la tira de lino" },
      { src: calmaImg("451-787fc5700e8c2ca28016746106786107"), alt: "Detalle del taco y la hebilla" },
      { src: calmaImg("4-9c7bc58511d192e48417268273097760"), alt: "Cassandra 6 sobre fondo blanco" },
      { src: calmaImg("copia-de-81-3469cbecc83097d32916746106785717"), alt: "Novia abrochándose las Cassandra 6" },
      { src: calmaImg("133-39428b5d6d4f1525d617430076861640"), alt: "Novia con las Cassandra 6 levantando el vestido" },
      { src: calmaImg("diseno-sin-titulo-5c019fb67d2039276917268284752958"), alt: "Novia caminando con las Cassandra 6" },
    ],
    externalUrl: "https://calmashoes.com/productos/cassandra-6/",
  },
  {
    ...calmaZus,
    slug: "piera",
    name: "Piera",
    category: "zapatos",
    description: [
      "Elegancia que se adapta a vos. Piera es ese zapato que venías buscando: un diseño sobrio y femenino, hecho a mano, que combina estilo con comodidad de verdad.",
      "Su capellada irregular es el sello del modelo. Además de darle un carácter único, abraza el pie y disimula todo tipo de imperfecciones, por eso es ideal si tenés pies irregulares o con juanetes. Comodidad real, sin resignar estética.",
      "Está confeccionado en cuero 100% vacuno blanco tiza texturado, con un taco de 6 cm que estiliza la pierna sin sacrificar estabilidad.",
      "Cada par es único, hecho a mano por zapateros artesanos. Trabajamos con cuero vacuno natural: si bien buscamos mantener siempre el mismo cuero, cada partida puede presentar leves variaciones en su teñido. Esa pequeña imperfección es, justamente, lo que hace que tu par sea irrepetible.",
    ],
    details: [
      { label: "Material", value: "cuero 100% vacuno" },
      { label: "Color", value: "blanco tiza texturado" },
      { label: "Taco", value: "6 cm, sin plataforma (altura total 7 cm con plantilla y tapita)" },
      { label: "Tira sobre los dedos", value: "4 cm en su parte más fina" },
    ],
    images: [
      { src: calmaImg("56-eaf98ef8dc913a5b2c17818674543117"), alt: "Piera de perfil" },
      { src: calmaImg("57-dfa64296326e86dc5917818674546478"), alt: "Piera" },
      { src: calmaImg("29-94ce10ff03a4c2883717818678212211"), alt: "Piera" },
      { src: calmaImg("30-3973cfdb19560f9b6217818678219233"), alt: "Piera" },
      { src: calmaImg("55-a8fe655ef7930dfa3017818674550183"), alt: "Piera" },
      { src: calmaImg("54-8e73293fce01cceca417818674549332"), alt: "Piera" },
      { src: calmaImg("47-16af2ab808602cf65417564946534673"), alt: "Piera" },
      { src: calmaImg("39-14ac7f120eaaa997c717564946552200"), alt: "Piera" },
      { src: calmaImg("36-2aaa9cf6ce4e93226b17564946558011"), alt: "Piera" },
      { src: calmaImg("52-be5238f889a2d63f6a17818674542329"), alt: "Piera" },
      { src: calmaImg("53-3c434bec143e773c5917818674544833"), alt: "Piera" },
    ],
    externalUrl: "https://calmashoes.com/productos/piera/",
  },
  {
    ...calmaZus,
    slug: "botas-sophie",
    name: "Botas Sophie",
    category: "zapatos",
    tagline: "Sutil, elegante y siempre a la altura.",
    description: [
      "¿Querés otro color? Escribinos y personalizamos tu par para crearlo a tu estilo. Hacemos zapatos de novia a medida de lo que soñás.",
      "Sophie está diseñada para novias e invitadas que buscan un zapato clásico, estilizador y atemporal. Tiene ese equilibrio justo entre delicadeza y presencia: estiliza la pierna sin resignar comodidad.",
      "Cada par se confecciona artesanalmente por zapateros expertos en Argentina, con materiales nobles y mucho oficio. Al ser cuero natural teñido a mano, puede haber sutiles diferencias de tono entre partidas — eso hace que tu Sophie sea única.",
    ],
    details: [
      { label: "Taco", value: "7,5 cm" },
      { label: "Plataforma", value: "Sin plataforma" },
      { label: "Material", value: "Cuero vacuno natural color Blanco Tiza." },
    ],
    images: [
      { src: calmaImg("113-c0f277b98d5f1d526717818672964897"), alt: "Botas Sophie de perfil" },
      { src: calmaImg("112-bb3e05a7152606dc8317818672965387"), alt: "Botas Sophie" },
      { src: calmaImg("219-751ba699f0c90fab8a17818679963682"), alt: "Botas Sophie" },
      { src: calmaImg("218-02407c25dd71bf0faa17818679967622"), alt: "Botas Sophie" },
      { src: calmaImg("216-15c891204472982da417818679971539"), alt: "Botas Sophie" },
      { src: calmaImg("217-9be87e77f39a7163f317818679968176"), alt: "Botas Sophie" },
      { src: calmaImg("215-9da025dfd577a3088117818679967581"), alt: "Botas Sophie" },
      { src: calmaImg("220-70c081261516a7b86d17818679965767"), alt: "Botas Sophie" },
      { src: calmaImg("88-d05d4e487ff7e5cc6b17430084762625"), alt: "Botas Sophie" },
      { src: calmaImg("92-af1b46ead33a40686117430084764534"), alt: "Botas Sophie" },
    ],
    externalUrl: "https://calmashoes.com/productos/botas-sophie/",
  },
  {
    ...calmaZus,
    slug: "casilda-9-suela",
    name: "Casilda 9 Suela",
    category: "zapatos",
    tagline: "Textura natural y altura para brillar de día o de noche.",
    description: [
      "Casilda 9 es para invitadas que buscan algo distinto al clásico blanco: un modelo original, fresco y con altura. La rafia lo hace perfecto para casamientos de día, al aire libre o de verano, y combina con looks en tierras, beige y tostados.",
      "Cada par se confecciona artesanalmente por zapateros artesanos argentinos. Usamos cuero natural y, aunque buscamos siempre el mismo material, las partidas pueden tener leves variaciones de tono en el teñido — eso hace que tu Casilda sea única.",
    ],
    details: [
      { label: "Taco", value: "9 cm" },
      { label: "Plataforma delantera", value: "3 cm" },
      { label: "Inclinación real al caminar", value: "6 cm (la plataforma hace que un taco de 9 se sienta como 6)" },
      { label: "Material", value: "Cuero vacuno natural combinado con rafia. Una textura fresca y original que le da carácter." },
      { label: "Detalle", value: "Suela apenas marcada, para un acabado limpio y minimalista." },
    ],
    images: [
      { src: calmaImg("133-41aae806c51987d13f17821335444112"), alt: "Casilda 9 Suela de perfil" },
      { src: calmaImg("162-0183a089e611c909f017430125232376"), alt: "Casilda 9 Suela" },
      { src: calmaImg("159-837a53e6a51cb3e19917430125147096"), alt: "Casilda 9 Suela" },
      { src: calmaImg("casilda10cmn_mesa-de-trabajo-11-5bd78ffb91741591c216728333997480"), alt: "Casilda 9 Suela" },
      { src: calmaImg("161-355d075be77f70161517430125182927"), alt: "Casilda 9 Suela" },
      { src: calmaImg("163-8b1a591b76370c72c217430125275396"), alt: "Casilda 9 Suela" },
      { src: calmaImg("modelocasilda6_mesa-de-trabajo-11-6ea6a7b09357b95e6916442534865881"), alt: "Casilda 9 Suela" },
      { src: calmaImg("casilda10cm2_mesa-de-trabajo-11-ad6cdfcf3f8f567a2516727769917376"), alt: "Casilda 9 Suela" },
      { src: calmaImg("179-9ad5f2285e81cda02917430170335053"), alt: "Casilda 9 Suela" },
      { src: calmaImg("180-caf49ec0c86961cdd017430170333942"), alt: "Casilda 9 Suela" },
      { src: calmaImg("181-8e0f352ded5ebba0a817430170336202"), alt: "Casilda 9 Suela" },
    ],
    externalUrl: "https://calmashoes.com/productos/casilda-9-suela/",
  },
  /* Joyería (cápsula Clave): calmashoes.com/accesorios-y-tocados-de-novia */
  {
    ...clave,
    slug: "tocado-oliva",
    name: "Tocado Oliva",
    category: "joyeria",
    tagline: "El primero. El que lo empezó todo.",
    description: [
      "Para la novia o invitada que quiere un accesorio con historia y alma botánica. El Tocado Rama Flores es nuestra pieza fundacional — la primera joya de pelo que creamos en Calma, y la que marcó el camino de toda la colección. Más grande que sus hermanas, tiene esa presencia de rama en plena floración: hojas, flores y capullos en metal, eternizados a mano.",
      "Llevalo como protagonista en un recogido lateral o en una trenza. Por sus 12 cm cubre bien el lateral de la cabeza y crea un efecto de jardín natural. También queda precioso combinado con el Tocado Floral (la versión más pequeña) para armar un look de dos piezas con volumen y movimiento.",
      "Cada pieza se elabora artesanalmente a partir de elementos de la naturaleza. No hay dos iguales — es parte de su magia.",
    ],
    details: [
      { label: "Material", value: "Bronce, con opción de baño en plata u oro. Pieza artesanal: elaborada a mano en base a ramas, flores y elementos de la naturaleza. Cada una es única." },
      { label: "Medidas", value: "12 cm de largo × 5 cm de ancho (medidas aproximadas). Precio por unidad." },
      { label: "Disponible en", value: "Bronce natural · Baño en plata · Baño en oro." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("254-a9e4c3aad462422f7517823049713219"), alt: "Tocado Oliva de frente" },
      { src: calmaImg("273-236e8dced2d36e334f17823939326598"), alt: "Tocado Oliva" },
      { src: calmaImg("272-1dcfe4bbf17a851f1c17823900812710"), alt: "Tocado Oliva" },
      { src: calmaImg("271-de3d5e5cc26c44e39717823900814964"), alt: "Tocado Oliva" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-oliva-aucxn/",
  },
  {
    ...clave,
    slug: "aros-perla",
    name: "Aros Perla",
    category: "joyeria",
    gridScale: 1.5,
    description: [
      "Pureza. Las perlas siempre fueron consideradas talismanes con muchos poderes. Se decía que llevar perlas haría que las amistades fueran más sólidas y que, incluso, podría calmar la ira hacia los demás. Además de ser el símbolo de amor más puro.",
    ],
    details: [
      { label: "Pieza", value: "Pendientes" },
      { label: "Material", value: "Pieza moldeada a mano en cera, fundida en Plata 925 o enchapada en Oro 18k en combinación con una perla original. Con circonita que puede ser color cristal (blanco) o negro." },
      { label: "Medida", value: "4,5 cm de largo y 1 cm de ancho (aprox.)" },
      { label: "Cierre", value: "Sistema de tuerca tradicional" },
      { label: "Tiempos de producción", value: "Realizamos cada pieza a pedido, de manera artesanal durante 14 a 20 días. Te avisaremos una vez que el pedido salga de nuestro taller." },
    ],
    images: [
      { src: calmaImg("255-11b7dd36143e64ed7a17822459594445"), alt: "Aros Perla de frente" },
      { src: calmaImg("296-f681fa622384c802ec17823901282583"), alt: "Aros Perla" },
      { src: calmaImg("295-b6ee124b58af446eba17823901283524"), alt: "Aros Perla" },
    ],
    externalUrl: "https://calmashoes.com/productos/aros-perla/",
  },
  {
    ...clave,
    slug: "tocado-estrella-triple",
    name: "Tocado Estrella Triple",
    category: "joyeria",
    gridScale: 0.88,
    tagline: "Una reliquia para la novia más especial.",
    description: [
      "Para la novia que quiere una pieza de joyería con alma propia. Esta corona no es un accesorio más: es una pieza de arte. Su diseño de tres estrellas en bronce envejecido y el brillo de los cristales le dan un carácter único, como si fuera una reliquia antigua encontrada en otro tiempo.",
      "Usala sola como el gran protagonista de tu peinado — no necesita nada más. Va perfecta con recogidos clásicos, trenzas y moños bajos. Para una novia con carácter que quiere que su tocado cuente una historia.",
    ],
    details: [
      { label: "Material", value: "Bronce envejecido con cristales Swarovski puede ser con baño en plata u oro." },
      { label: "Medidas", value: "12 cm de largo × 5,5 cm de ancho." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("252-2e741f8e0d9dc1211617823035145257"), alt: "Tocado Estrella Triple de frente" },
      { src: calmaImg("278-94284789bb0f148c7b17823902208468"), alt: "Tocado Estrella Triple" },
      { src: calmaImg("265-4e737b0fcf0c66a4a017823036623663"), alt: "Tocado Estrella Triple" },
      { src: calmaImg("266-a5989b4242069cb2f317823036619175"), alt: "Tocado Estrella Triple" },
      { src: calmaImg("267-7d6ae925a84b37710317823036617654"), alt: "Tocado Estrella Triple" },
      { src: calmaImg("279-436d8c1195d2c804b317823902206734"), alt: "Tocado Estrella Triple" },
      { src: calmaImg("277-725db71ba46d9cf17117823902202889"), alt: "Tocado Estrella Triple" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-estrella-triple/",
  },
  {
    ...clave,
    slug: "tocado-estrella-aplique-unico",
    name: "Tocado Estrella (Aplique único)",
    category: "joyeria",
    gridScale: 1.4,
    tagline: "Un brillo de estrella para tu peinado.",
    description: [
      "Para novias e invitadas que buscan ese detalle especial que termina de coronar el look. Su forma de estrella y el brillo de los cristales le dan un toque romántico y atemporal a cualquier peinado: recogido, semi-recogido o suelto.",
      "Estas piezas se lucen aún más combinando varias en un mismo peinado, formando una constelación. Sumá dos o tres para un efecto único y lleno de personalidad.",
    ],
    details: [
      { label: "Material", value: "Bronce con cristales Swarovski." },
      { label: "Medidas", value: "6 cm de largo × 5,5 cm de ancho." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("251-fb338fe96d74f658aa17823029491038"), alt: "Tocado Estrella (Aplique único) de frente" },
      { src: calmaImg("281-9d7a99d172d8f2a88317823901663373"), alt: "Tocado Estrella (Aplique único)" },
      { src: calmaImg("280-80b03eaf17f896ba0f17823901623815"), alt: "Tocado Estrella (Aplique único)" },
      { src: calmaImg("277-cdc6f479d5d4279fc417823901596652"), alt: "Tocado Estrella (Aplique único)" },
      { src: calmaImg("263-21f5c790ea3a779bfc17823033123511"), alt: "Tocado Estrella (Aplique único)" },
      { src: calmaImg("262-de3b27283e775144bb17823033117838"), alt: "Tocado Estrella (Aplique único)" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-estrella-aplique-unico/",
  },
  {
    ...clave,
    slug: "tocado-atuel",
    name: "Tocado Atuel",
    category: "joyeria",
    tagline: "La naturaleza en su forma más pura.",
    description: [
      "Para la novia o invitada que busca un accesorio con alma artística. El Tocado Rama no imita a la naturaleza — la reproduce tal cual: irregular, orgánica, impredecible. Es una pieza escultórica que se convierte en joya.",
      "Funciona de dos formas: como el detalle perfecto y sutil para quien quiere algo pequeño y especial, o como pieza complementaria que combina con cualquier otro tocado de la colección. Combinalo con la Corona Hojas para un look completamente botánico, o con la Corona Estrellas para mezclar lo orgánico con lo celestial.",
    ],
    details: [
      { label: "Material", value: "Bronce, con opción de baño en plata u oro. Cada pieza tiene su propia forma: al ser un trabajo orgánico, no hay dos iguales." },
      { label: "Medidas", value: "Son piezas de 8 cm de largo × 3 cm de ancho." },
      { label: "Disponible en", value: "Bronce natural · Baño en plata · Baño en oro." },
      { label: "Se ofrece", value: "Como pieza única que puede ser entremezclada con otras." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("260-41e4877a931396c57b17823044193615"), alt: "Tocado Atuel de frente" },
      { src: calmaImg("317-ae2c31edeeb24cb1fd17823938157983"), alt: "Tocado Atuel" },
      { src: calmaImg("316-fa06c888910be15a9d17823938160972"), alt: "Tocado Atuel" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-atuel/",
  },
  {
    ...clave,
    slug: "tocado-hojas",
    name: "Tocado Hojas",
    category: "joyeria",
    gridScale: 0.83,
    tagline: "La naturaleza como joya.",
    description: [
      "Para la novia que busca algo delicado, natural y atemporal. La Corona Hojas evoca la elegancia clásica de las coronas de laurel griegas — simple, orgánica y con una presencia que no necesita brillos para destacar. Va igual de bien con una novia boho que con una novia minimalista.",
      "Es tan versátil que la podés llevar con el pelo completamente recogido o totalmente suelto — en ambos casos queda perfecta. Y si querés un efecto más dramático y envolvente, usá dos coronas iguales juntas. Una se convierte en un detalle; dos se convierten en un look.",
    ],
    details: [
      { label: "Material", value: "Alpaca o bronce dorado. Una pieza de metal trabajado con acabado envejecido natural." },
      { label: "Medidas", value: "14 cm de largo × 5,5 cm de ancho." },
    ],
    images: [
      { src: calmaImg("253-93530c01b3d7301f4a17823040091030"), alt: "Tocado Hojas de frente" },
      { src: calmaImg("269-c0f6810fc3ffca572617823938393264"), alt: "Tocado Hojas" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-hojas/",
  },
  {
    ...clave,
    slug: "tocado-oliva-simple",
    name: "Tocado Oliva simple",
    category: "joyeria",
    gridScale: 0.75,
    tagline: "Pequeña, delicada y con mucho carácter.",
    description: [
      "Para la novia o invitada que busca un detalle sutil y botánico. La Ramita Floral es la pieza más delicada de la colección — pequeña en tamaño, grande en presencia.",
      "Llevala sola como un detalle discreto, o comprá dos y usalas simétricamente a ambos lados del peinado para un efecto de jardín en el pelo.",
    ],
    details: [
      { label: "Material", value: "Bronce, con opción de baño en plata u oro" },
      { label: "Medidas", value: "8 cm de largo × 5 cm de ancho (aproximadas). Precio por unidad." },
      { label: "Hecho a mano", value: "A partir de ramas y elementos de la naturaleza. No hay dos iguales." },
      { label: "Disponibilidad", value: "En stock en bronce; con baño de oro o plata, 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("261-842eaf86214044348917823108362401"), alt: "Dos tocados Oliva simple" },
      { src: calmaImg("312-5d0efa9ee1267fa18517823938770411"), alt: "Tocados Oliva simple dorados en un recogido" },
      { src: calmaImg("308-6ba22f88598ab842ba17823938849176"), alt: "Tocado Oliva simple plateado en un recogido" },
      { src: calmaImg("311-0b121815c7829cf43017823938770063"), alt: "Tocados Oliva simple a ambos lados del peinado" },
      { src: calmaImg("309-bdc9179d6d000f188117823938820553"), alt: "Tocado Oliva simple de perfil" },
      { src: calmaImg("310-04a6a4192c3600fb9317823938820373"), alt: "Tocados Oliva simple dorados, vista de espalda" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-oliva-simple/",
  },
  {
    ...clave,
    slug: "tocado-acacia",
    name: "Tocado Acacia",
    category: "joyeria",
    gridScale: 1.08,
    tagline: "Estructura pura. Sin adornos, sin límites.",
    description: [
      "Para la novia o invitada con gusto editorial que busca un accesorio distinto a todo. Sin hojas ni flores — solo ramas. El Tocado Ramas Finas es pura estructura y textura: una pieza que parece encontrada en la naturaleza y convertida en joya.",
      "Usalo solo como un detalle sutil y minimalista, o combiná dos o tres piezas en distintos puntos del peinado para un efecto de bosque etéreo. Queda especialmente bien en recogidos bajos y trenzas, donde las ramas asoman entre el cabello.",
      "Cada pieza se elabora artesanalmente. No hay dos iguales — es parte de su esencia.",
    ],
    details: [
      { label: "Material", value: "Cobre, bronce, o con baño en plata u oro. Pieza artesanal: cada una se trabaja a mano, con su propia forma orgánica e irrepetible." },
      { label: "Medidas", value: "8 cm de largo × 3 cm de ancho (medidas aproximadas). Precio por unidad." },
      { label: "Disponible en", value: "Cobre · Bronce · Baño en plata · Baño en oro." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("257-159cd7fb1c4af8787d17823110725349"), alt: "Tocado Acacia de frente" },
      { src: calmaImg("258-714cec9ed9f379572217823110728070"), alt: "Tocado Acacia" },
      { src: calmaImg("313-35900ec1486a2d158917823940194745"), alt: "Tocado Acacia" },
      { src: calmaImg("315-a012967eaebc9bcde717823940186139"), alt: "Tocado Acacia" },
      { src: calmaImg("314-919eac209cf2c274d917823940187929"), alt: "Tocado Acacia" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-acacia/",
  },
  {
    ...clave,
    slug: "tocado-organico",
    name: "Tocado Orgánico",
    category: "joyeria",
    gridScale: 1.04,
    tagline: "La naturaleza vuelta joya, hecha a mano.",
    description: [
      "Para la novia que quiere un accesorio con alma artística y presencia botánica, y para el novio que busca un boutonnière distinto a todos. El Tocado Floral es una pieza que cruza mundos: se puede llevar en el pelo, en la solapa o prendida como pin. Una sola pieza, tres formas de usarla.",
      "Usalo como tocado lateral en un recogido, como pin en el velo, o como boutonnière para el novio en lugar de una flor natural — dura para siempre y combina perfecto con los accesorios de la colección. También es el regalo ideal para el cortejo.",
      "Cada Tocado es una pieza única, elaborada artesanalmente a partir de ramas y elementos naturales. No hay dos iguales.",
    ],
    details: [
      { label: "Material", value: "Bronce, con opción de baño en plata u oro. Pieza artesanal: cada una se trabaja a mano en base a ramas y elementos de la naturaleza, por lo que no hay dos iguales." },
      { label: "Medidas", value: "6,5 cm de largo × 4 cm de ancho (medidas aproximadas). Precio por unidad." },
      { label: "Disponible en", value: "Bronce natural · Baño en plata · Baño en oro." },
      { label: "Disponibilidad", value: "Los tocados están en stock en bronce, si querés con baño de oro o plata se requieren 10 días hábiles antes de despachar." },
    ],
    images: [
      { src: calmaImg("259-65b8636a730c37520617823046572718"), alt: "Tocado Orgánico de frente" },
      { src: calmaImg("312-bc4e41ed24be74051917823939754788"), alt: "Tocado Orgánico" },
      { src: calmaImg("310-21401fcfb9a2bae33417823939758260"), alt: "Tocado Orgánico" },
    ],
    externalUrl: "https://calmashoes.com/productos/tocado-organico/",
  },
];

export function getMarketplaceProduct(slug: string) {
  return marketplaceProducts.find((product) => product.slug === slug);
}

/** Descripción breve para buscadores: la frase de la marca y el primer párrafo. */
export function productSummary(product: MarketplaceProduct) {
  return [product.tagline, product.description[0]].filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/* Textos de las páginas                                                        */
/* -------------------------------------------------------------------------- */

export const marketplaceMeta = {
  title: "Marketplace de la novia | Cápsulas y colaboraciones | Sin Calma",
  description:
    "Cápsulas y productos creados por Sin Calma junto a marcas seleccionadas para acompañar a la novia antes, durante y después de su boda.",
};

/** Encabezado y navegación interna, comunes a todo el Marketplace */
export const marketplaceHeader = {
  title: "Marketplace de la novia",
  nav: {
    shop: "Shop",
    capsulas: "Cápsulas",
    /** Link externo (se abre en otra pestaña) */
    ebook: { label: "Ebook", href: "https://calmashoes.com/ebook-guia-completa-para-una-novia-moderna/" },
  },
  /** Antes del número de cada bloque en CÁPSULAS: “Cápsula 01” */
  capsuleNumber: "Cápsula",
};

/** Filtro del SHOP: una opción por cada cápsula de `marketplaceCapsules` (se muestra su marca) */
export const marketplaceFilters = {
  filter: "Filtrar:",
  all: "Todas las cápsulas",
  empty: "Muy pronto, nuevas cápsulas en esta categoría.",
};

/** Introducción de /marketplace/capsulas */
export const marketplaceCapsulesIntro = {
  title: "Cuando dos miradas se encuentran.",
  text: [
    "Cada cápsula empieza con una pregunta: ¿qué podemos crear que realmente tenga sentido para una novia?",
    "A partir de ahí buscamos marcas con las que compartimos una manera de hacer y trabajamos juntas para convertir esa idea en un producto.",
  ],
};

/** Pop-up de bienvenida (sólo la primera visita). Para volver a verlo: /marketplace?intro */
export const marketplaceIntro: {
  note: string;
  title: string;
  text: string[];
  image: ImageAsset;
  closing: string[];
  cta: string;
} = {
  note: "una aclaración antes de empezar...",
  title: "Esto no es una tienda más.",
  text: [
    "Creamos este espacio para reunir cápsulas y colaboraciones que nacen del encuentro entre nuestra experiencia y el saber de marcas que admiramos.",
    "Nosotras pensamos qué puede necesitar una novia. Después buscamos a quienes saben hacerlo especialmente bien y creamos juntas.",
    "El resultado son productos con una mirada compartida, pensados para acompañarte antes, durante y después de tu boda.",
  ],
  image: {
    src: "/images/wedding-planning/historia-propia.jpg",
    alt: "Ajuste del vestido en la espalda de la novia antes de la ceremonia",
    position: "50% 40%",
  },
  closing: ["Sin Calma crea y cura.", "Cada marca produce y vende desde su propia tienda."],
  cta: "Ver más",
};

export const marketplaceProductLabels = {
  back: "Volver al shop",
  brand: "Marca",
  note: "La compra se hace en la tienda oficial de la marca.",
  gallery: { prev: "Foto anterior", next: "Foto siguiente" },
};
