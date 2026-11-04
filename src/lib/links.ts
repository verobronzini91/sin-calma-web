import { site } from "@/content/site";

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** El Diario vive fuera del sitio: sus enlaces abren en otra pestaña. */
export function newTabProps(href: string) {
  return href.startsWith(site.diarioUrl) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
}
