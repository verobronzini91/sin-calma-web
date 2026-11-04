import { paths } from "@/content/home";
import { cn } from "@/lib/cn";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Tres tratamientos distintos, misma gramática: imagen, número, verbo, producto. */
const layouts = [
  { wrap: "lg:col-span-4", aspect: "aspect-[3/4]", dark: false },
  { wrap: "lg:col-span-4 lg:mt-40 sm:ml-[16%] lg:ml-0", aspect: "aspect-square", dark: false },
  { wrap: "lg:col-span-4 lg:mt-12", aspect: "aspect-[4/5]", dark: true },
];

export function ThreePaths({ index }: { index?: string }) {
  return (
    <section aria-labelledby="caminos-title" className="section-y bg-paper">
      <div className="shell">
        <SectionHeading
          index={index}
          eyebrow={paths.eyebrow}
          title={paths.title}
          id="caminos-title"
          className="reveal max-w-4xl"
        />

        <div className="grid-editorial mt-16 gap-y-16 lg:mt-24">
          {paths.items.map((item, i) => {
            const layout = layouts[i];
            return (
              <article
                key={item.verb}
                className={cn(
                  "reveal col-span-12 flex flex-col",
                  layout.wrap,
                  layout.dark && "-mx-4 bg-ink p-6 pb-10 text-ivory sm:mx-0 sm:p-8 lg:p-7",
                )}
              >
                <EditorialImage {...item.image} aspect={layout.aspect} sizes="(min-width: 1024px) 30vw, 100vw" />
                <div className="mt-7 flex items-baseline justify-between gap-4">
                  <h3>
                    <span className="display-lg block uppercase">{item.verb}</span>
                    <span className={cn("eyebrow mt-3 block", layout.dark ? "text-stone" : "text-clay")}>
                      {item.product}
                    </span>
                  </h3>
                  <span aria-hidden="true" className="font-serif text-2xl italic opacity-60">
                    0{i + 1}
                  </span>
                </div>
                <p className={cn("body-copy mt-5 max-w-sm", layout.dark ? "text-ivory/80" : "text-muted")}>
                  {item.text}
                </p>
                <CTA href={item.cta.href} variant="link" tone={layout.dark ? "light" : "dark"} className="mt-8 self-start">
                  {item.cta.label}
                </CTA>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
