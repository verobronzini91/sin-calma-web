import { weddingPlanning } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WeddingPlanningSection({ index, showCta = true }: { index?: string; showCta?: boolean }) {
  return (
    <section id="wedding-planning" aria-labelledby="wp-title" className="section-y bg-ink text-ivory">
      <div className="shell">
        <div className="grid-editorial gap-y-10">
          <SectionHeading
            index={index}
            eyebrow={weddingPlanning.eyebrow}
            title={weddingPlanning.title}
            id="wp-title"
            size="xl"
            tone="light"
            className="reveal col-span-12 lg:col-span-7"
          />
          <div className="reveal col-span-12 self-end sm:col-span-9 lg:col-span-4 lg:col-start-9">
            <p className="lead">{weddingPlanning.text}</p>
            {showCta && (
              <CTA href={weddingPlanning.cta.href} tone="light" className="mt-9">
                {weddingPlanning.cta.label}
              </CTA>
            )}
          </div>
        </div>

        <EditorialImage
          {...weddingPlanning.image}
          aspect="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
          sizes="100vw"
          className="reveal mt-16 -mx-4 sm:mx-0 lg:mt-24"
        />

        <div className="grid-editorial mt-16 gap-y-14 lg:mt-24">
          <div className="reveal col-span-12 sm:col-span-8 lg:col-span-4">
            <p aria-hidden="true" className="display-hero text-sand [font-variant-numeric:lining-nums]">
              15<span className="italic">+</span>
            </p>
            <p className="body-copy mt-8 max-w-sm text-ivory/80">{weddingPlanning.experience}</p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <h3 className="eyebrow text-stone">Servicios</h3>
            <ol className="mt-6 border-t border-line-light">
              {weddingPlanning.services.map((service, i) => (
                <li
                  key={service}
                  className="reveal flex items-baseline gap-6 border-b border-line-light py-5 lg:py-6"
                >
                  <span aria-hidden="true" className="eyebrow w-8 text-stone tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-md">{service}</span>
                </li>
              ))}
            </ol>
            {showCta && (
              <CTA href={weddingPlanning.cta.href} variant="link" tone="light" className="mt-10">
                {weddingPlanning.cta.label}
              </CTA>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
