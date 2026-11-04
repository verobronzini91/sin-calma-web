import type { CSSProperties } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { portadaHero } from "@/content/portada";
import { Underline, VaseSketch } from "./Ink";

/**
 * Portada a sangre: la foto ocupa todo el hero y el titular, la bajada, la nota
 * manuscrita y las flores van encima, como una sola pieza.
 */
export function PortadaHero() {
  const { title, text, note, image } = portadaHero;
  const last = title[title.length - 1];
  const lastWord = last.slice(last.lastIndexOf(" ") + 1);
  const lastStart = last.slice(0, last.lastIndexOf(" ") + 1);

  const copy = (
    <p className="caps-copy rise text-ink" style={{ "--delay": "200ms" } as CSSProperties}>
      {text.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );

  return (
    <section aria-labelledby="portada-title" className="relative">
      <div className="relative flex flex-col overflow-hidden lg:block lg:h-[min(calc(100svh-4rem),54rem)] lg:min-h-[36rem]">
        <EditorialImage
          {...image}
          aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full"
          className="lg:h-full"
          imageClassName="origin-[58%_22%] [scale:-1.4_1.4]"
          sizes="140vw"
          preload
        />
        {/* Velo: aclara la zona del titular sin cortar la foto */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(90deg,rgb(255_255_255/0.82)_0%,rgb(255_255_255/0.62)_30%,rgb(255_255_255/0.12)_48%,transparent_58%)]"
        />

        <h1
          id="portada-title"
          className="portada-title rise order-first px-4 pt-4 pb-6 sm:px-6 lg:absolute lg:bottom-[calc(10%+9.5rem)] lg:left-[4.4vw] lg:order-none lg:p-0 lg:[--title-size:min(5.8vw,6.25rem)]"
        >
          {title.slice(0, -1).map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
          <span className="block whitespace-nowrap italic">
            {lastStart}
            <span className="relative">
              {lastWord}
              <Underline onLoad onPhoto className="absolute -bottom-[0.1em] -left-[0.08em] h-[0.18em] w-[2.25em] -rotate-2" />
            </span>
          </span>
        </h1>

        <div className="absolute bottom-[10%] left-[4.4vw] hidden lg:block">{copy}</div>

        {/* Acentos laterales sobre la foto */}
        <p
          className="script fade-in absolute bottom-[7%] left-4 text-left [--script-size:2rem] sm:left-8 lg:top-[38%] lg:right-[3vw] lg:bottom-auto lg:left-auto lg:text-center lg:[--script-size:2.9rem]"
          style={{ "--delay": "1600ms", "--script-rotate": "-8deg", "--script-color": "#fff" } as CSSProperties}
        >
          {note.map((line, i) => (
            <span key={line} className="block" style={{ marginLeft: `${i * 1.6}rem` }}>
              {line}
            </span>
          ))}
        </p>
        <VaseSketch onLoad onPhoto className="absolute right-[2vw] bottom-0 h-32 w-auto sm:h-40 lg:h-[34%]" />
      </div>

      {/* Mobile: la bajada y el CTA debajo de la foto */}
      <div className="shell pt-6 lg:hidden">{copy}</div>
    </section>
  );
}
