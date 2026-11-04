import { diario } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Área reservada para capturas reales del Diario.
 * Cuando exista `diario.screenshot.src`, se muestra la imagen en lugar del esquema.
 */
function DiarioPreview() {
  if (diario.screenshot?.src) {
    return <EditorialImage {...diario.screenshot} aspect="aspect-[16/11]" sizes="(min-width: 1024px) 55vw, 100vw" />;
  }

  return (
    <figure>
      <div aria-hidden="true" className="aspect-[16/11] border border-line-strong bg-white p-4 sm:p-6">
        <div className="flex h-full gap-4 sm:gap-6">
          <div className="hidden w-1/4 flex-col gap-3 border-r border-line pr-4 sm:flex">
            <span className="font-serif text-lg italic">Mi Diario</span>
            {diario.modules.map((m, i) => (
              <span key={m} className={`text-[0.68rem] tracking-wide ${i === 0 ? "text-ink" : "text-muted"}`}>
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col">
            <span className="eyebrow text-muted">Checklist</span>
            <span className="mt-2 font-serif text-2xl sm:text-3xl">Lo que viene</span>
            <div className="mt-5 flex flex-1 flex-col justify-between border-t border-line">
              {[72, 54, 86, 40, 64, 48].map((w, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-line py-2">
                  <span className={`size-3 shrink-0 border border-ink ${i < 2 ? "bg-ink" : ""}`} />
                  <span className="h-1.5 bg-stone" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-[0.72rem] tracking-wide text-muted">
        Vista esquemática — espacio reservado para capturas reales del Diario.
      </figcaption>
    </figure>
  );
}

export function DiarioSection({ index }: { index?: string }) {
  return (
    <section id="mi-diario" aria-labelledby="diario-title" className="section-y bg-paper">
      <div className="shell grid-editorial gap-y-16">
        <div className="reveal col-span-12 lg:col-span-5">
          <SectionHeading index={index} eyebrow={diario.eyebrow} title={diario.title} id="diario-title" />
          <div className="body-copy mt-10 max-w-md space-y-4 text-ink-soft">
            {diario.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 max-w-md border-l border-clay pl-5 font-serif text-lg leading-snug italic text-muted">
            {diario.note[0]} {diario.note[1]}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTA href={diario.primary.href}>{diario.primary.label}</CTA>
            <CTA href={diario.secondary.href} variant="secondary">
              {diario.secondary.label}
            </CTA>
          </div>
        </div>

        <div className="reveal col-span-12 lg:col-span-6 lg:col-start-7 lg:self-center">
          <DiarioPreview />
        </div>
      </div>
    </section>
  );
}
