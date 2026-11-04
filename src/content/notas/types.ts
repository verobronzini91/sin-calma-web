/** Imagen de una nota: ruta en /public o URL, con sus medidas reales (para no recortarla). */
export type NotaImage = {
  src: string;
  width: number;
  height: number;
  /** Si falta, se describe como "<título de la nota>, foto N" */
  alt?: string;
};

/**
 * Cuerpo de una nota, en el orden en que se lee.
 * `html` admite sólo <strong>, <em>, <a> y <br>.
 */
export type NotaBlock =
  | { type: "paragraph"; html: string }
  | { type: "heading"; text: string }
  | { type: "quote"; html: string }
  | ({ type: "image"; caption?: string } & NotaImage);

export type Nota = {
  /** Ruta: /inspiracion/<slug> */
  slug: string;
  title: string;
  /** Fecha de publicación (AAAA-MM-DD). Ordena las notas: la más nueva primero. */
  date: string;
  category: string;
  /** Extracto para la portada de Notas y la descripción para buscadores */
  excerpt: string;
  author?: string;
  /** Publicación original, si la nota vino de otro sitio */
  source?: string;
  cover: NotaImage;
  body: NotaBlock[];
};
