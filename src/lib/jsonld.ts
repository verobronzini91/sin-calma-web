import { site } from "@/content/site";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  founder: site.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
  knowsAbout: ["Wedding planning", "Organización de bodas", "Destination weddings", "Eventos privados", "Diseño de eventos"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: site.lang,
  publisher: { "@id": `${site.url}/#organization` },
};
