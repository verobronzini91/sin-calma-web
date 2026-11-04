import { AsComoFunciona, AsFormas, AsHero, AsRevisar } from "@/components/asesorias/AsesoriasSections";
import { InkDefs } from "@/components/home/Ink";
import { Faq } from "@/components/sections/Faq";
import { CTA } from "@/components/ui/CTA";
import { asCierre, asFaq, asesoriasMeta } from "@/content/asesorias";
import { routes } from "@/content/navigation";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...asesoriasMeta, path: routes.asesorias });

export default function AsesoriasPage() {
  return (
    <>
      <InkDefs />
      <AsHero />
      <AsRevisar />
      <AsComoFunciona />
      <AsFormas />
      {/* Misma escala de título de FAQ que en Wedding Planning */}
      <div className="border-t border-line [&_#faq-title]:text-[clamp(1.6rem,2.7vw,2.5rem)]">
        <Faq {...asFaq} />
      </div>
      <section id="contacto" aria-labelledby="cierre-title" className="section-y border-t border-line">
        <div className="shell">
          <h2 id="cierre-title" className="display-lg max-w-3xl" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>
            {asCierre.title}
          </h2>
          <CTA href={asCierre.cta.href} variant="link" className="mt-8 lg:mt-10">
            {asCierre.cta.label}
          </CTA>
        </div>
      </section>
    </>
  );
}
