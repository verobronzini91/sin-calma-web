import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { InkDefs } from "@/components/home/Ink";
import { EditorialImage } from "@/components/ui/EditorialImage";
import {
  cedarvilleCursive,
  hankenGrotesk,
  instrumentSans,
  instrumentSerif,
  interTight,
  newsreader,
  notoSerifDisplay,
  nothingYouCouldDo,
  reenieBeanie,
  waitingForTheSunrise,
  zeyada,
} from "./fonts";
import { SketchSample } from "./SketchSample";

/** Página interna de prueba tipográfica: no se indexa ni figura en el sitemap. */
export const metadata: Metadata = {
  title: "Prueba tipográfica",
  robots: { index: false, follow: false },
};

type FontRef = { className: string; style: CSSProperties };

type TypeSystem = {
  id: string;
  name: string;
  why: string;
  display: FontRef & { label: string; weight: number; italic: boolean; tracking: string; extra?: CSSProperties };
  sans: FontRef & { label: string };
  hand: FontRef & { label: string; size: number };
};

const systems: TypeSystem[] = [
  {
    id: "a",
    name: "Sistema A",
    why: "La serif condensada con itálica más cercana a la referencia editorial, y la birome apurada e inclinada del manuscrito.",
    display: {
      ...instrumentSerif,
      label: "Instrument Serif",
      weight: 400,
      italic: true,
      tracking: "-0.02em",
    },
    sans: { ...instrumentSans, label: "Instrument Sans" },
    hand: { ...zeyada, label: "Zeyada", size: 1.9 },
  },
  {
    id: "b",
    name: "Sistema B",
    why: "Más contraste y más fashion magazine, con el ancho condensado a medida; el manuscrito es un trazo de lapicera rápido y rasposo.",
    display: {
      ...notoSerifDisplay,
      label: "Noto Serif Display · ancho 70%",
      weight: 500,
      italic: true,
      tracking: "-0.025em",
      extra: { fontVariationSettings: "'wdth' 70" },
    },
    sans: { ...interTight, label: "Inter Tight" },
    hand: { ...reenieBeanie, label: "Reenie Beanie", size: 1.85 },
  },
  {
    id: "c",
    name: "Sistema C",
    why: "Una serif contemporánea con tamaño óptico de display, más legible en páginas internas; el manuscrito es el más fino e íntimo.",
    display: {
      ...newsreader,
      label: "Newsreader · tamaño óptico display",
      weight: 400,
      italic: true,
      tracking: "-0.03em",
    },
    sans: { ...hankenGrotesk, label: "Hanken Grotesk" },
    hand: { ...nothingYouCouldDo, label: "Nothing You Could Do", size: 1.35 },
  },
];

const extraHands = [
  { ...waitingForTheSunrise, label: "Waiting for the Sunrise", size: 1.6 },
  { ...cedarvilleCursive, label: "Cedarville Cursive", size: 1.5 },
];

const nav = ["Diario de Boda", "Wedding Planning", "Asesorías", "Proveedores", "Inspiración", "Nosotras", "Contacto"];
const entries = [
  { n: "01", title: ["Diario", "de la novia"], text: "Tu boda, ordenada en un solo lugar.", cta: "Explorá" },
  { n: "02", title: ["Wedding", "Planning"], text: "Planificación con calma y propósito.", cta: "Conocé más" },
  { n: "04", title: ["Proveedores", "curados"], text: "Una selección pensada para tu esencia.", cta: "Descubrí" },
];

const photo = {
  src: "/images/wedding-planning/wp-evento.jpg",
  alt: "Mesa larga con flores y velas de una boda",
  tone: "clay" as const,
};

function Specimen({ system }: { system: TypeSystem }) {
  const { display, sans, hand } = system;
  const displayStyle: CSSProperties = {
    ...display.style,
    ...display.extra,
    fontWeight: display.weight,
    letterSpacing: display.tracking,
  };
  const sansStyle: CSSProperties = sans.style;
  const handStyle = (size: number): CSSProperties => ({ ...hand.style, fontSize: `${size}rem`, lineHeight: 1.05 });
  const caps = "text-[0.66rem] uppercase tracking-[0.16em]";

  return (
    <section id={`sistema-${system.id}`} aria-labelledby={`t-${system.id}`} className="border-t border-ink py-14 lg:py-20">
      {/* Ficha */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12" style={sansStyle}>
        <div>
          <h2 id={`t-${system.id}`} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]">
            {system.name}
          </h2>
          <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-ink-soft">{system.why}</p>
        </div>
        <dl className={`grid grid-cols-3 gap-4 ${caps}`}>
          <div>
            <dt className="text-muted">Display</dt>
            <dd className="mt-1 font-semibold">{display.label}</dd>
          </div>
          <div>
            <dt className="text-muted">Sans</dt>
            <dd className="mt-1 font-semibold">{sans.label}</dd>
          </div>
          <div>
            <dt className="text-muted">Manuscrita</dt>
            <dd className="mt-1 font-semibold">{hand.label}</dd>
          </div>
        </dl>
      </div>

      {/* Navegación */}
      <ul className={`mt-12 flex flex-wrap gap-x-8 gap-y-2 font-medium ${caps}`} style={sansStyle}>
        {nav.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Hero */}
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[clamp(3rem,7.5vw,7.25rem)] leading-[0.9]" style={displayStyle}>
            <span className="block">No necesitás</span>
            <span className="block">más opciones.</span>
            <span className="block" style={{ fontStyle: display.italic ? "italic" : "normal" }}>
              Necesitás calma.
            </span>
          </p>
          <p className={`mt-8 leading-[1.9] ${caps}`} style={sansStyle}>
            Una boda con sentido,
            <br />
            sin estrés y a tu manera.
          </p>
          <p className={`mt-4 inline-flex items-center gap-4 font-semibold ${caps}`} style={sansStyle}>
            <span className="border-b border-ink pb-0.5">Empezá acá</span>
            <span aria-hidden="true" className="h-px w-12 bg-ink" />
          </p>
        </div>

        {/* Manuscrito blanco sobre foto: sin sombra, halo, glow ni contorno */}
        <div className="relative">
          <EditorialImage {...photo} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 35vw, 100vw" />
          <p className="absolute top-[12%] right-[8%] -rotate-6 text-white" style={handStyle(hand.size * 1.25)}>
            ideas reales
            <br />
            <span className="ml-6">para novias</span>
            <br />
            <span className="ml-12">reales</span>
          </p>
        </div>
      </div>

      {/* Títulos de módulos y páginas */}
      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {entries.map((e) => (
          <div key={e.n}>
            <p className="flex items-center gap-4 text-[0.7rem] tracking-[0.12em]" style={sansStyle}>
              {e.n}
              <span aria-hidden="true" className="h-px w-14 bg-ink/50" />
            </p>
            <p className="mt-5 text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[0.92]" style={displayStyle}>
              {e.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className={`mt-4 max-w-[15rem] leading-[1.85] text-ink-soft ${caps}`} style={sansStyle}>
              {e.text}
            </p>
          </div>
        ))}
      </div>

      {/* Nosotras + texto de lectura + manuscrito azul + ilustración */}
      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <p className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]" style={displayStyle}>
            Nosotras
          </p>
          <p className="mt-1 ml-[12%] -rotate-3 text-ink-blue" style={handStyle(hand.size * 1.3)}>
            Vero + Clari
          </p>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft" style={sansStyle}>
            Dos miradas. Un mismo propósito. Creamos bodas, eventos y experiencias desde la organización, el diseño y
            la esencia de quienes las viven.
          </p>
        </div>

        <div className="space-y-7 text-ink-blue">
          <p className="-rotate-3" style={handStyle(hand.size)}>
            ideas reales para novias reales
          </p>
          <p className="ml-10 rotate-2" style={handStyle(hand.size)}>
            organización + diseño
          </p>
          <p style={handStyle(hand.size * 0.8)}>acá, la mesa larga bajo los árboles · ñandú, café, sí</p>
        </div>

        <div className="text-ink">
          <SketchSample className="w-full max-w-xs" />
          <p className="mt-2 ml-auto max-w-[12rem] -rotate-3 text-right text-ink-blue" style={handStyle(hand.size * 0.85)}>
            una mesa, dos flores
          </p>
        </div>
      </div>
    </section>
  );
}

export default function TypeTestPage() {
  return (
    <div className="shell pt-10 pb-24">
      <InkDefs />
      <header className="max-w-2xl">
        <p className="eyebrow text-muted">Interno · no indexado</p>
        <h1 className="mt-3 font-serif text-4xl">Prueba tipográfica</h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
          Tres sistemas completos (display, sans y manuscrita) con los textos reales de la Home. El manuscrito blanco
          sobre la foto va sin sombra, halo ni contorno. Todas las fuentes son de Google Fonts, con licencia OFL de uso
          libre.
        </p>
        <nav aria-label="Sistemas" className="mt-6 flex gap-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
          {systems.map((s) => (
            <a key={s.id} href={`#sistema-${s.id}`} className="border-b border-ink pb-0.5">
              {s.name}
            </a>
          ))}
          <a href="#manuscritas" className="border-b border-ink pb-0.5">
            Otras manuscritas
          </a>
        </nav>
      </header>

      <div className="mt-14">
        {systems.map((system) => (
          <Specimen key={system.id} system={system} />
        ))}
      </div>

      <section id="manuscritas" aria-labelledby="t-extra" className="border-t border-ink py-14">
        <h2 id="t-extra" className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]">
          Otras manuscritas finas, para comparar
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {extraHands.map((h) => (
            <div key={h.label}>
              <p className="text-[0.66rem] uppercase tracking-[0.16em] text-muted">{h.label}</p>
              <p className="mt-4 text-ink-blue" style={{ ...h.style, fontSize: `${h.size}rem`, lineHeight: 1.15 }}>
                ideas reales para novias reales
                <br />
                organización + diseño
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
