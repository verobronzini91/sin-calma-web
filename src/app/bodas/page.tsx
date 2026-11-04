import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/content/navigation";
import { pages, weddingPaths } from "@/content/pages";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/metadata";

const page = pages.bodas;

export const metadata = buildMetadata({ ...page.meta, path: routes.bodas });

export default function BodasPage() {
  return (
    <>
      <PageHero {...page.hero} />

      <section aria-labelledby="caminos-bodas-title" className="section-y border-t border-line bg-paper">
        <div className="shell">
          <SectionHeading
            eyebrow={weddingPaths.eyebrow}
            title={weddingPaths.title}
            id="caminos-bodas-title"
            className="reveal max-w-4xl"
          />

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {weddingPaths.items.map((item, i) => (
              <article key={item.title} className={cn("reveal flex flex-col", i % 2 === 1 && "lg:mt-20")}>
                <EditorialImage
                  {...item.image}
                  aspect={i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                />
                <p className="eyebrow mt-6 text-clay">
                  0{i + 1} · {item.kicker}
                </p>
                <h3 className="display-md mt-3">{item.title}</h3>
                <p className="body-copy mt-4 text-muted">{item.text}</p>
                <CTA href={item.cta.href} variant="link" className="mt-6 self-start">
                  {item.cta.label}
                </CTA>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
