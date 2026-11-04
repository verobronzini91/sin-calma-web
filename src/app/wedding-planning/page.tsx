import { InkDefs } from "@/components/home/Ink";
import { Faq } from "@/components/sections/Faq";
import {
  WpAcompanamiento,
  WpComoExperiencia,
  WpDestino,
  WpHero,
  WpHistoria,
  WpLugares,
  WpQuinceAnios,
  WpRecorrido,
  WpServicio,
  WpTestimonios,
} from "@/components/wedding-planning/WeddingPlanningSections";
import { CTA } from "@/components/ui/CTA";
import { external, routes } from "@/content/navigation";
import { pages } from "@/content/pages";
import { newTabProps } from "@/lib/links";
import { buildMetadata } from "@/lib/metadata";

const page = pages.weddingPlanning;

export const metadata = buildMetadata({ ...page.meta, path: routes.weddingPlanning });

export default function WeddingPlanningPage() {
  const { closing } = page;

  return (
    <>
      <InkDefs />
      <WpHero />
      <WpRecorrido />
      <WpHistoria />
      <WpQuinceAnios />
      <WpComoExperiencia />
      <WpLugares />
      <WpDestino />
      <WpAcompanamiento />
      <WpTestimonios />
      <WpServicio />
      {/* Escala del título del FAQ ajustada sólo en esta página */}
      <div className="border-t border-line [&_#faq-title]:text-[clamp(1.6rem,2.7vw,2.5rem)]">
        <Faq {...page.faq} />
      </div>
      {/* `id="contacto"`: destino de los enlaces a /wedding-planning#contacto (ej. Asesorías en la Home) */}
      <section id="contacto" aria-labelledby="cierre-title" className="section-y border-t border-line">
        <div className="shell">
          <h2 id="cierre-title" className="display-lg max-w-3xl" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>
            {closing.title}
          </h2>
          <p className="body-copy mt-6 max-w-xl text-ink-soft lg:mt-8">{closing.text}</p>
          <CTA href={closing.cta.href} variant="link" className="mt-8 lg:mt-10">
            {closing.cta.label}
          </CTA>
          <p className="mt-14 max-w-xl text-[0.92rem] leading-relaxed text-ink-soft lg:mt-20">
            {closing.diario.before}
            <a
              href={external.diario}
              {...newTabProps(external.diario)}
              className="text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-ink-blue"
            >
              {closing.diario.label}
            </a>
            {closing.diario.after}
          </p>
        </div>
      </section>
    </>
  );
}
