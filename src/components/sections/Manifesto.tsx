import { manifesto } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Manifesto({ index, showCta = true }: { index?: string; showCta?: boolean }) {
  return (
    <section id="manifiesto" aria-labelledby="manifiesto-title" className="section-y border-t border-line">
      <div className="shell grid-editorial gap-y-14">
        <SectionHeading
          index={index}
          eyebrow={manifesto.eyebrow}
          title={manifesto.title}
          id="manifiesto-title"
          size="xl"
          className="reveal col-span-12 lg:col-span-8"
        />

        <EditorialImage
          {...manifesto.image}
          aspect="aspect-[3/4]"
          sizes="(min-width: 1024px) 30vw, 60vw"
          className="reveal col-span-8 col-start-5 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:mt-40"
        />

        <div className="reveal col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-3">
          <div className="body-copy space-y-5 text-ink-soft">
            {manifesto.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "dropcap" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <p className="lead mt-10 border-l border-clay pl-6 text-ink">{manifesto.positioning}</p>
          {showCta && (
            <CTA href={manifesto.cta.href} variant="link" className="mt-10">
              {manifesto.cta.label}
            </CTA>
          )}
        </div>
      </div>
    </section>
  );
}
