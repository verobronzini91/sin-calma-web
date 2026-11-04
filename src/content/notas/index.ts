import { n15AnosAcompanandoNovias } from "./15-anos-acompanando-novias";
import { deEnsenarteACaminarAAcompanarteElDiaDeTuBoda } from "./de-ensenarte-a-caminar-a-acompanarte-el-dia-de-tu-boda";
import { elCasamientoDeMaggieYFer } from "./el-casamiento-de-maggie-y-fer";
import { elCasamientoSiEsParaTodaLaVida } from "./el-casamiento-si-es-para-toda-la-vida";
import { laBodaDeJuani } from "./la-boda-de-juani";
import { laCasaDeClari } from "./la-casa-de-clari";
import { losUltimosCalmaHechosPorLasManosQueLosHicieronNacer } from "./los-ultimos-calma-hechos-por-las-manos-que-los-hicieron-nacer";
import type { Nota } from "./types";
import { unaSemanaEnCalma } from "./una-semana-en-calma";

export type { Nota, NotaBlock, NotaImage } from "./types";

/**
 * Notas (/inspiracion). Cada nota vive en su propio archivo de esta carpeta.
 * Para sumar una: copiar un archivo, cambiar sus datos e importarlo en esta lista.
 * El orden de la página lo da la fecha, no el orden de la lista.
 * Las ocho primeras se migraron tal cual desde el blog de calmashoes.com.
 */
export const notas: Nota[] = [
  deEnsenarteACaminarAAcompanarteElDiaDeTuBoda,
  n15AnosAcompanandoNovias,
  unaSemanaEnCalma,
  losUltimosCalmaHechosPorLasManosQueLosHicieronNacer,
  elCasamientoSiEsParaTodaLaVida,
  laBodaDeJuani,
  laCasaDeClari,
  elCasamientoDeMaggieYFer,
].sort((a, b) => b.date.localeCompare(a.date));

export const getNota = (slug: string) => notas.find((nota) => nota.slug === slug);

/** Otras notas para el cierre: primero las de la misma categoría, después las más nuevas. */
export function relatedNotas(nota: Nota, count = 3) {
  const others = notas.filter((n) => n.slug !== nota.slug);
  return [...others.filter((n) => n.category === nota.category), ...others.filter((n) => n.category !== nota.category)].slice(0, count);
}

/** 18.10.2026, como en la referencia */
export function formatNotaDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}.${m}.${y}`;
}

export const notasPage = {
  title: "Notas para una novia",
  readMore: "Ver más",
  more: "Más notas",
};
