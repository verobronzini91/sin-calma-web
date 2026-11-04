/** Una línea de un titular editorial. `italic` marca el acento tipográfico. */
export type TitleLine = string | { text: string; italic?: boolean };

export type ImageTone = "stone" | "sand" | "ivory" | "sage" | "clay" | "charcoal";

/**
 * Imagen editorial.
 *
 * `src` es la ruta esperada dentro de /public (ej: "/images/home/home-hero.jpg").
 * Si el archivo todavía no existe se muestra un placeholder con ese nombre:
 * para cargar una foto alcanza con copiar el archivo con ese nombre en esa carpeta.
 */
export type ImageAsset = {
  /** Ruta en /public. Con varias rutas se usa la primera que exista. */
  src?: string | string[];
  /** Versión vertical opcional para mobile (art direction). */
  mobileSrc?: string;
  alt: string;
  /** Punto de foco del recorte, ej: "50% 30%" (CSS object-position). */
  position?: string;
  /** Si es true y no hay archivo, no se muestra nada (en lugar del placeholder). */
  optional?: boolean;
  tone?: ImageTone;
  label?: string;
};
