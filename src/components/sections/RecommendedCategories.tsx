import { categories, recommended } from "@/content/home";
import { routes } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { CTA } from "@/components/ui/CTA";
import { EditorialCard } from "@/components/ui/EditorialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  index?: string;
  showCta?: boolean;
  /** En /recomendados cada categoría expone un ancla (#lugares, #musica…). */
  withAnchors?: boolean;
};

export function RecommendedCategories({ index, showCta = true, withAnchors = false }: Props) {
  return (
    <section aria-labelledby="recomendados-title" className="section-y bg-stone-light">
      <div className="shell">
        <div className="grid-editorial gap-y-10">
          <SectionHeading
            index={index}
            eyebrow={recommended.eyebrow}
            title={recommended.title}
            id="recomendados-title"
            className="reveal col-span-12 lg:col-span-7"
          />
          <div className="reveal col-span-12 self-end sm:col-span-9 lg:col-span-4 lg:col-start-9">
            <p className="body-copy text-ink-soft">{recommended.text}</p>
            {showCta && (
              <CTA href={recommended.cta.href} className="mt-8">
                {recommended.cta.label}
              </CTA>
            )}
          </div>
        </div>

        {/* Mobile: tira horizontal de mini portadas. Desktop: grilla escalonada. */}
        <ul
          aria-label="Categorías de recomendados"
          className="no-scrollbar -mx-4 mt-16 flex snap-x snap-mandatory scroll-px-4 gap-4 sm:scroll-px-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-24 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16 lg:overflow-visible lg:px-0"
        >
          {categories.map((cat, i) => (
            <li
              key={cat.slug}
              id={withAnchors ? cat.slug : undefined}
              className={cn("w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-auto", i % 2 === 1 && "lg:mt-16")}
            >
              <EditorialCard
                variant="cover"
                href={`${routes.recomendados}#${cat.slug}`}
                index={`N.º ${String(i + 1).padStart(2, "0")}`}
                title={cat.label}
                image={cat.image}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 68vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
