import { hero } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-6 pb-20 sm:pt-10 lg:pt-12 lg:pb-32">
      <div className="shell">
        <div className="eyebrow flex items-center justify-between gap-6 border-b border-line pb-4 text-muted">
          <span>Creadoras de bodas, eventos y experiencias</span>
          <span className="hidden sm:inline">Organización · Diseño · Calma</span>
        </div>

        {/* Marca visible como masthead editorial */}
        <p className="display-hero rise mt-8 uppercase lg:mt-12">
          <span className="block">Sin calma</span>
          <span className="block pl-[8vw] italic normal-case sm:pl-[14vw]">no hay boda</span>
        </p>

        <div className="grid-editorial mt-10 gap-y-20 lg:mt-16">
          <div className="relative col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
            <EditorialImage
              {...hero.image}
              aspect="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[16/10]"
              sizes="(min-width: 1024px) 58vw, 100vw"
              preload
              className="rise [--delay:150ms]"
            />
            <EditorialImage
              {...hero.detail}
              aspect="aspect-[3/4]"
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="rise absolute -bottom-12 right-4 w-[40%] border-[6px] border-canvas [--delay:350ms] sm:w-[30%] sm:border-[10px] lg:-bottom-16 lg:-right-6 lg:w-[28%]"
            />
          </div>

          <div className="col-span-12 flex flex-col justify-end sm:col-span-10 lg:order-1 lg:col-span-5 lg:pb-4">
            <h1 id="hero-title" className="eyebrow max-w-sm text-clay">
              {hero.h1}
            </h1>
            <p className="mt-6 font-serif text-[clamp(1.7rem,3vw,2.75rem)] leading-[1.08] font-light">
              {hero.statement}
            </p>
            <p className="body-copy mt-6 max-w-md text-muted">{hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTA href={hero.primary.href}>{hero.primary.label}</CTA>
              <CTA href={hero.secondary.href} variant="secondary">
                {hero.secondary.label}
              </CTA>
            </div>
            <CTA href={hero.tertiary.href} variant="link" className="mt-7 self-start">
              {hero.tertiary.label}
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
