import {
  Cedarville_Cursive,
  Hanken_Grotesk,
  Instrument_Sans,
  Instrument_Serif,
  Inter_Tight,
  Newsreader,
  Noto_Serif_Display,
  Nothing_You_Could_Do,
  Reenie_Beanie,
  Waiting_for_the_Sunrise,
  Zeyada,
} from "next/font/google";

/**
 * Fuentes candidatas, cargadas sólo en /type-test.
 * Todas son de Google Fonts (licencia OFL, uso comercial libre).
 */

// Sistema A
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
export const instrumentSans = Instrument_Sans({ subsets: ["latin", "latin-ext"], display: "swap" });
export const zeyada = Zeyada({ subsets: ["latin", "latin-ext"], weight: "400", display: "swap" });

// Sistema B
export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
});
export const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], display: "swap" });
export const reenieBeanie = Reenie_Beanie({ subsets: ["latin"], weight: "400", display: "swap" });

// Sistema C
export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
export const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap" });
export const nothingYouCouldDo = Nothing_You_Could_Do({ subsets: ["latin"], weight: "400", display: "swap" });

// Manuscritas extra para comparar
export const waitingForTheSunrise = Waiting_for_the_Sunrise({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});
export const cedarvilleCursive = Cedarville_Cursive({ subsets: ["latin"], weight: "400", display: "swap" });
