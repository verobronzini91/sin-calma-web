import { site } from "@/content/site";

export function personJsonLd({ name, jobTitle, path, description }: { name: string; jobTitle: string; path: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url: `${site.url}${path}`,
    worksFor: { "@id": `${site.url}/#organization` },
  };
}
