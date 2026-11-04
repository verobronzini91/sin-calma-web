import type { Metadata } from "next";
import { site } from "@/content/site";

type BuildMetadataOptions = {
  /** Título de la página. Sin título se usa el título principal del sitio. */
  title?: string;
  description?: string;
  /** Ruta relativa, ej: "/nosotras". Define el canonical. */
  path: string;
  /** Título y descripción sólo para compartir (Open Graph y Twitter). Sin ellos se usan los de Google. */
  socialTitle?: string;
  socialDescription?: string;
};

/** Imagen al compartir cualquier página que no tenga una propia (1200 × 630). */
export const defaultSocialImage = {
  url: "/images/og/sin-calma-home.jpg",
  width: 1200,
  height: 630,
  alt: "Sin Calma no hay Boda: boda en un parque, con carpas e invitados bajo los árboles",
};

/**
 * Metadata por página: canonical, Open Graph y Twitter coherentes.
 * `metadataBase` (en el layout raíz) convierte las rutas relativas en absolutas.
 */
export function buildMetadata({ title, description = site.description, path, socialTitle, socialDescription }: BuildMetadataOptions): Metadata {
  const fullTitle = socialTitle ?? (title ? site.titleTemplate.replace("%s", title) : site.title);
  const shareDescription = socialDescription ?? description;

  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description: shareDescription,
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: shareDescription,
      images: [defaultSocialImage],
    },
  };
}
