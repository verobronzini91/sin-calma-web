import type { Metadata } from "next";
import { site } from "@/content/site";

type BuildMetadataOptions = {
  /** Título de la página. Sin título se usa el título principal del sitio. */
  title?: string;
  description?: string;
  /** Ruta relativa, ej: "/nosotras". Define el canonical. */
  path: string;
};

/**
 * Metadata por página: canonical, Open Graph y Twitter coherentes.
 * `metadataBase` (en el layout raíz) convierte las rutas relativas en absolutas.
 */
export function buildMetadata({ title, description = site.description, path }: BuildMetadataOptions): Metadata {
  const fullTitle = title ? site.titleTemplate.replace("%s", title) : site.title;

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
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
