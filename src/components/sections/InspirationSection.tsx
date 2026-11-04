import { inspiration } from "@/content/home";
import { routes } from "@/content/navigation";
import { CTA } from "@/components/ui/CTA";
import { EditorialCard } from "@/components/ui/EditorialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Previews editoriales con contenido placeholder.
 * Composición tipo revista: una nota destacada, notas con imagen y un índice tipográfico.
 */
export function InspirationSection({ index, showCta = true }: { index?: string; showCta?: boolean }) {
  const [feature, ...rest] = inspiration.items;
  // Tres previews con foto (destacada + 2) y el resto como índice tipográfico.
  const withImage = rest.slice(0, 2);
  const sideText = rest.slice(2, 4);
  const textOnly = rest.slice(4);
  const href = (slug: string) => `${routes.inspiracion}#${slug}`;

  return (
    <section aria-labelledby="inspiracion-title" className="section-y border-t border-line">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index={index}
            eyebrow={inspiration.eyebrow}
            title={inspiration.title}
            id="inspiracion-title"
            className="reveal"
          />
          {showCta && (
            <CTA href={inspiration.cta.href} variant="secondary" className="reveal self-start lg:self-end">
              {inspiration.cta.label}
            </CTA>
          )}
        </div>

        <div className="grid-editorial mt-16 gap-y-14 lg:mt-24">
          <EditorialCard
            variant="feature"
            href={href(feature.slug)}
            kicker={feature.kicker}
            title={feature.title}
            excerpt={feature.excerpt}
            image={feature.image}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="reveal col-span-12 lg:col-span-5"
          />

          <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:col-span-6 lg:col-start-7 lg:gap-x-8">
            {withImage.map((item, i) => (
              <EditorialCard
                key={item.slug}
                href={href(item.slug)}
                kicker={item.kicker}
                title={item.title}
                image={item.image}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 22vw, 50vw"
                className={i === 1 ? "reveal mt-12 lg:mt-20" : "reveal"}
              />
            ))}
            {sideText.map((item) => (
              <EditorialCard
                key={item.slug}
                variant="text"
                href={href(item.slug)}
                kicker={item.kicker}
                title={item.title}
                className="reveal"
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-24">
          {textOnly.map((item) => (
            <EditorialCard
              key={item.slug}
              variant="text"
              href={href(item.slug)}
              kicker={item.kicker}
              title={item.title}
              className="reveal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
