import { ClariEspacio, ClariMirada } from "@/components/nosotras/NosotrasSections";
import { PersonHero } from "@/components/sections/PersonHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTA } from "@/components/ui/CTA";
import { routes } from "@/content/navigation";
import { clari, personRoutes } from "@/content/people";
import { buildMetadata } from "@/lib/metadata";
import { personJsonLd } from "@/lib/person-jsonld";

export const metadata = buildMetadata({ ...clari.meta, path: personRoutes.clari });

export default function ClariPage() {
  return (
    <>
      <PersonHero {...clari.hero} />

      <ClariMirada />
      <ClariEspacio />

      <section aria-label="Seguir conociéndonos" className="section-y border-t border-line">
        <div className="shell">
          <CTA href={routes.weddingPlanning} variant="link">
            Contratá Wedding Planning
          </CTA>
        </div>
      </section>

      <JsonLd
        data={personJsonLd({
          name: clari.hero.name,
          jobTitle: "Diseño, estética y dirección creativa",
          path: personRoutes.clari,
          description: clari.meta.description,
        })}
      />
    </>
  );
}
