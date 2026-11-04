import { Inter_Tight, Noto_Serif_Display, Reenie_Beanie } from "next/font/google";

/**
 * Sistema tipográfico de la web (Sistema B). Todas de Google Fonts, licencia OFL.
 * Los tokens de uso (`--font-serif`, `--font-sans`, `--font-hand`) viven en globals.css.
 */

/** Display: serif editorial de alto contraste. Variable en peso y ancho; se usa condensada al 70%. */
export const serif = Noto_Serif_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-noto-serif-display",
  display: "swap",
});

/** Sans: navegación, cuerpo, CTAs, labels, formularios y textos chicos. */
export const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap",
});

/** Manuscrita: sólo anotaciones y frases cortas, nunca titulares. */
export const hand = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie-beanie",
  display: "swap",
});
