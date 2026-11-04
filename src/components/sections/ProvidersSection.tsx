import { providers } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProvidersSection({ index, showCta = true }: { index?: string; showCta?: boolean }) {
  return (
    <section id="soy-proveedor" aria-labelledby="proveedores-title" className="section-y bg-stone">
      <div className="shell grid-editorial gap-y-14">
        <EditorialImage
          {...providers.image}
          aspect="aspect-[4/5]"
          sizes="(min-width: 1024px) 34vw, 70vw"
          className="reveal col-span-10 sm:col-span-6 lg:col-span-4"
        />

        <div className="reveal col-span-12 lg:col-span-6 lg:col-start-7 lg:self-center">
          <SectionHeading index={index} eyebrow={providers.eyebrow} title={providers.title} id="proveedores-title" />
          <div className="body-copy mt-10 max-w-md space-y-4 text-ink-soft">
            {providers.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ul aria-label="Lo que buscamos" className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {providers.values.map((value, i) => (
              <li key={value} className="display-sm flex items-baseline gap-4 italic">
                {value}
                {i < providers.values.length - 1 && (
                  <span aria-hidden="true" className="not-italic text-muted">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8 text-muted">{providers.note}</p>
          {showCta && (
            <CTA href={providers.cta.href} className="mt-10">
              {providers.cta.label}
            </CTA>
          )}
        </div>
      </div>
    </section>
  );
}
