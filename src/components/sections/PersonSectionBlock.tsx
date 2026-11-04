import type { PersonSection } from "@/content/people";
import { cn } from "@/lib/cn";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = PersonSection & {
  tone?: "canvas" | "paper" | "ink";
};

/**
 * Sección temática de una página personal.
 * Con imagen: retrato/foto + texto + frase destacada.
 * Sin imagen: titular a la izquierda, texto y conceptos a la derecha.
 */
export function PersonSectionBlock({ id, eyebrow, title, paragraphs, points, quote, image, tone = "canvas" }: Props) {
  const dark = tone === "ink";
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        "section-y",
        tone === "canvas" && "border-t border-line",
        tone === "paper" && "bg-paper",
        dark && "bg-ink text-ivory",
      )}
    >
      <div className="shell grid-editorial gap-y-12">
        {image ? (
          <EditorialImage
            {...image}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="reveal col-span-11 sm:col-span-7 lg:col-span-5"
          />
        ) : (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            id={titleId}
            tone={dark ? "light" : "dark"}
            className="reveal col-span-12 lg:col-span-6"
          />
        )}

        <div className={cn("reveal col-span-12 sm:col-span-10 lg:col-span-5 lg:col-start-8", image && "lg:self-center")}>
          {image && <SectionHeading eyebrow={eyebrow} title={title} id={titleId} size="md" className="mb-10" />}
          <div className={cn("body-copy max-w-lg space-y-4", dark ? "text-ivory/80" : "text-ink-soft")}>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {quote && (
            <p className="display-sm mt-10 max-w-md border-l border-clay pl-6 italic">{quote}</p>
          )}

          {points && (
            <ul
              aria-label={eyebrow}
              className={cn("mt-10 grid border-t sm:grid-cols-2 sm:gap-x-8", dark ? "border-line-light" : "border-line")}
            >
              {points.map((point) => (
                <li
                  key={point}
                  className={cn("border-b py-3.5 text-[0.85rem] tracking-wide", dark ? "border-line-light" : "border-line")}
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
