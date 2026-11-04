import { about } from "@/content/home";
import { cn } from "@/lib/cn";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TypographicDivider } from "@/components/ui/TypographicDivider";

export function AboutUs({ index, showCta = true }: { index?: string; showCta?: boolean }) {
  return (
    <section id="nosotras" aria-labelledby="nosotras-title" className="section-y">
      <div className="shell">
        <div className="grid-editorial gap-y-8">
          <SectionHeading
            index={index}
            eyebrow={about.eyebrow}
            title={about.title}
            id="nosotras-title"
            size="xl"
            className="reveal col-span-12 lg:col-span-7"
          />
          <p className="lead reveal col-span-12 self-end text-ink-soft sm:col-span-9 lg:col-span-4 lg:col-start-9">
            {about.intro}
          </p>
        </div>

        <div className="grid-editorial mt-20 gap-y-20 lg:mt-28">
          {about.people.map((person, i) => (
            <article
              key={person.name}
              className={cn(
                "reveal col-span-12 sm:col-span-10 lg:col-span-5",
                i === 0 ? "lg:col-start-1" : "sm:col-start-3 lg:col-start-8 lg:mt-48",
              )}
            >
              <div className="grid grid-cols-5 items-end gap-4">
                <EditorialImage
                  {...person.image}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className={cn("col-span-4", i === 1 && "col-start-2")}
                />
              </div>

              <div className="mt-8 flex items-end justify-between gap-6 border-b border-line-strong pb-5">
                <h3 className="display-xl">{person.name}</h3>
                <p className="mb-2 text-right font-serif text-lg italic text-muted">“{person.motto}”</p>
              </div>
              <p className="eyebrow mt-5 text-clay">{person.role}</p>
              <p className="body-copy mt-5 text-ink-soft">{person.text}</p>

              <ul aria-label={`Lo que mira ${person.name}`} className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line">
                {person.concepts.map((concept) => (
                  <li key={concept} className="border-b border-line py-3 text-[0.82rem] tracking-wide">
                    {concept}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <TypographicDivider text="juntas" className="mt-24 lg:mt-36" />

        <div className="reveal grid-editorial mt-14 items-end gap-y-12 lg:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <p className="display-lg">
              {about.closing.map((line, i) => (
                <span
                  key={line}
                  className={cn("block", i === 1 && "italic sm:pl-[12%]", i === 2 && "sm:pl-[24%]")}
                >
                  {line}{" "}
                </span>
              ))}
            </p>
            {showCta && (
              <div className="mt-12 sm:pl-[24%]">
                <CTA href={about.cta.href} variant="secondary">
                  {about.cta.label}
                </CTA>
              </div>
            )}
          </div>
          <EditorialImage
            {...about.together}
            aspect="aspect-[3/2]"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="col-span-12 lg:col-span-5 lg:col-start-8"
          />
        </div>
      </div>
    </section>
  );
}
