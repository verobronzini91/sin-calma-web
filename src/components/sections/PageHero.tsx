import type { ImageAsset, TitleLine } from "@/content/types";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageHeroProps = {
  eyebrow: string;
  /** H1 SEO de la página (visible, como titular) */
  title: TitleLine[];
  lead: string;
  image: ImageAsset;
  ctas?: { label: string; href: string }[];
};

/** Encabezado de las rutas internas: mismo lenguaje que la Home, en versión compacta. */
export function PageHero({ eyebrow, title, lead, image, ctas = [] }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div className="shell grid-editorial gap-y-14">
        <div className="rise col-span-12 flex flex-col justify-end lg:col-span-7">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} id="page-title" size="xl" />
          <p className="lead mt-10 max-w-xl text-ink-soft">{lead}</p>
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {ctas.map((cta, i) => (
                <CTA
                  key={cta.label}
                  href={cta.href}
                  variant={i === 0 ? "primary" : i === 1 ? "secondary" : "link"}
                  className={i > 1 ? "mt-4 self-start sm:mt-0 sm:ml-4 sm:self-center" : undefined}
                >
                  {cta.label}
                </CTA>
              ))}
            </div>
          )}
        </div>
        <EditorialImage
          {...image}
          aspect="aspect-[4/5]"
          sizes="(min-width: 1024px) 34vw, 80vw"
          preload
          className="rise col-span-9 col-start-4 [--delay:150ms] sm:col-span-6 sm:col-start-7 lg:col-span-4 lg:col-start-9"
        />
      </div>
    </section>
  );
}
