import { VeroHacer, VeroRealidad } from "@/components/nosotras/NosotrasSections";
import { PersonHero } from "@/components/sections/PersonHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTA } from "@/components/ui/CTA";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { personRoutes, vero } from "@/content/people";
import { buildMetadata } from "@/lib/metadata";
import { personJsonLd } from "@/lib/person-jsonld";

export const metadata = buildMetadata({ ...vero.meta, path: personRoutes.vero });

export default function VeroPage() {
  return (
    <>
      <PersonHero {...vero.hero} />

      <VeroHacer />
      <VeroRealidad />

      <section aria-labelledby="vero-cierre-title" className="border-t border-line py-[clamp(3rem,6vw,6rem)]">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <DisplayTitle id="vero-cierre-title" lines={vero.closing.title} size="md" className="reveal" />
          <CTA href={vero.closing.cta.href} variant="link" className="reveal">
            {vero.closing.cta.label}
          </CTA>
        </div>
      </section>

      <JsonLd
        data={personJsonLd({
          name: vero.hero.name,
          jobTitle: "Wedding planner · Organización, estrategia y comunicación",
          path: personRoutes.vero,
          description: vero.meta.description,
        })}
      />
    </>
  );
}
