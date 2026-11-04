import type { Nota } from "@/content/notas";
import { site } from "@/content/site";

/** BlogPosting de una nota (schema.org) */
export function articleJsonLd(nota: Nota, path: string) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: nota.title,
    description: nota.excerpt,
    image: [{ "@type": "ImageObject", url: new URL(nota.cover.src, site.url).href, width: nota.cover.width, height: nota.cover.height }],
    datePublished: nota.date,
    dateModified: nota.date,
    inLanguage: site.lang,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: nota.author ? { "@type": "Person", name: nota.author } : { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    articleSection: nota.category,
    isPartOf: { "@id": `${site.url}/#website` },
  };
}
