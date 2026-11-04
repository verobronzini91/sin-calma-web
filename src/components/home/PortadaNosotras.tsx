import type { CSSProperties } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { portadaNosotras } from "@/content/portada";
import { FlowerSketch } from "./Ink";
import { PortadaLink, TextLink } from "./PortadaLink";

/** Foto grande y horizontal a la izquierda (~52%, a sangre) y texto al lado. */
export function PortadaNosotras() {
  const { title, names, text, note, cta, image } = portadaNosotras;

  return (
    <section
      aria-labelledby="nosotras-title"
      className="mt-16 grid gap-y-10 lg:mt-20 lg:grid-cols-[52%_1fr] lg:items-center lg:gap-x-[5vw]"
    >
      <div className="reveal">
        <EditorialImage {...image} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 52vw, 100vw" />
      </div>

      <div className="reveal relative px-4 sm:px-6 lg:px-0 lg:pr-[3vw]">
        <h2 id="nosotras-title" className="entry-title" style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}>
          <TextLink href={cta.href}>{title}</TextLink>
        </h2>
        <p
          className="script mt-1 ml-[12%]"
          style={{ "--script-size": "clamp(1.8rem, 2.6vw, 2.5rem)", "--script-rotate": "-6deg" } as CSSProperties}
        >
          {names}
        </p>
        <p className="mt-8 max-w-[27rem] text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
        <PortadaLink cta={cta} className="mt-4" />

        <div className="mt-10 flex items-end gap-3">
          <FlowerSketch className="h-28 w-auto lg:h-36" />
          <p className="script mb-3" style={{ "--script-size": "1.7rem", "--script-rotate": "-8deg" } as CSSProperties}>
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}
