import { Arrow, VaseSketch } from "@/components/home/Ink";
import { Paragraphs, SectionTitle } from "@/components/sections/EditorialText";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { TableSketch } from "@/components/wedding-planning/Sketches";
import { asComoFunciona, asFormas, asHero, asRevisar } from "@/content/asesorias";
import { cn } from "@/lib/cn";

/** Lista con raya, como en el texto: líneas finas, sin viñetas ni íconos. */
function DashList({ items, className, itemClassName }: { items: string[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-4 border-b border-line py-4 lg:py-5", itemClassName)}>
          <span aria-hidden="true" className="text-ink-blue">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Dos líneas en serif grande; la segunda en cursiva. */
function Statement({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn("portada-title [--title-size:clamp(2rem,4vw,4rem)]", className)}>
      {lines.map((line, i) => (
        <p key={line} className={cn(i > 0 && "italic")}>
          {line}
        </p>
      ))}
    </div>
  );
}

/** Portada: titular, bloque de texto y una foto grande casi a todo el ancho. */
export function AsHero() {
  const { title, lead, text, closing, cta, image } = asHero;

  return (
    <section aria-labelledby="as-title" className="pt-10 pb-[clamp(4.5rem,10vw,10rem)] lg:pt-16">
      <div className="shell">
        <h1 id="as-title" className="portada-title rise [--title-size:clamp(2.3rem,6.6vw,6.75rem)]">
          {title.map((line, i) => (
            <span key={line} className={cn("block", i === title.length - 1 && "italic")}>
              {line}
            </span>
          ))}
        </h1>

        <div className="grid-editorial mt-14 gap-y-10 lg:mt-20">
          <div className="rise col-span-12 [--delay:150ms] lg:col-span-5">
            <p className="display-sm max-w-md italic">{lead}</p>
            <VaseSketch onLoad className="mt-10 hidden h-44 w-auto lg:block" />
          </div>
          <div className="rise col-span-12 [--delay:250ms] lg:col-span-5 lg:col-start-7">
            <Paragraphs items={text} className="max-w-lg" />
            <p className="lead mt-8 max-w-lg">{closing}</p>
            <CTA href={cta.href} variant="link" className="mt-10">
              {cta.label}
            </CTA>
          </div>
        </div>

        {/* Desktop: horizontal amplia (2:1). Tablet: la foto entera (4:3).
            Mobile: vertical 4:5 anclada a la derecha: el florero entero y parte de los papeles */}
        <EditorialImage
          {...image}
          aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[2/1]"
          imageClassName="group-hover:scale-100! max-sm:object-[100%_50%]!"
          sizes="100vw"
          preload
          className="fade-in mt-14 [--delay:300ms] lg:mt-20"
        />
      </div>
    </section>
  );
}

export function AsRevisar() {
  const { title, items, closing } = asRevisar;

  return (
    <section aria-labelledby="revisar-title" className="section-y border-t border-line">
      <div className="shell grid-editorial gap-y-10">
        <SectionTitle id="revisar-title" className="reveal col-span-12 lg:col-span-4">
          {title}
        </SectionTitle>
        <DashList
          items={items}
          itemClassName="display-sm py-5 lg:py-6"
          className="reveal col-span-12 lg:col-span-7 lg:col-start-6"
        />
        <Statement lines={closing} className="reveal col-span-12 mt-6 lg:col-span-10 lg:mt-12" />
      </div>
    </section>
  );
}

/** Pasos numerados, unidos por flechas de birome como el recorrido de Wedding Planning. */
export function AsComoFunciona() {
  const { title, steps, cta } = asComoFunciona;

  return (
    <section aria-labelledby="como-funciona-title" className="section-y bg-paper">
      <div className="shell">
        <SectionTitle id="como-funciona-title" className="reveal">
          {title}
        </SectionTitle>
        <ol className="mt-14 grid gap-y-14 [--gap:2.5rem] sm:grid-cols-3 sm:gap-x-(--gap) lg:mt-20 lg:[--gap:5rem]">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal relative">
              {/* Número y flecha en el mismo renglón: la flecha llega hasta el número siguiente (1 → 2 → 3).
                  Fija, sin animación de trazo, para que se vea siempre. En mobile, apilados y sin flecha. */}
              <div aria-hidden="true" className="flex items-center">
                <span className="portada-title text-ink-blue [--title-size:clamp(3.5rem,5vw,5rem)]">{i + 1}</span>
                {i < steps.length - 1 && (
                  <Arrow still className="-mr-[calc(var(--gap)-0.75rem)] ml-auto hidden w-20 shrink-0 sm:block lg:w-28" />
                )}
              </div>
              <h3 className="display-sm mt-4">
                <span className="sr-only">{i + 1}. </span>
                {step.title}
              </h3>
              <p className="body-copy mt-3 max-w-xs text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
        <CTA href={cta.href} variant="link" className="reveal mt-14 lg:mt-20">
          {cta.label}
        </CTA>
      </div>
    </section>
  );
}

/** Tres columnas separadas por líneas finas, con la imagen real de cada producto: sin tarjetas. */
export function AsFormas() {
  const { title, items } = asFormas;

  return (
    <section aria-labelledby="formas-title" className="section-y">
      <div className="shell">
        <SectionTitle id="formas-title" className="reveal">
          {title}
        </SectionTitle>
        {/* -mx + px iguales: las tres columnas quedan del mismo ancho, separadas por líneas finas */}
        <div className="mt-14 grid gap-y-14 lg:mt-20 lg:-mx-10 lg:grid-cols-3">
          {items.map((item, i) => {
            const visual = item.image;
            return (
              <article
                key={item.title}
                className={cn(
                  "reveal flex flex-col border-t border-line pt-8 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_auto_1fr] sm:gap-x-10 lg:flex lg:border-t-0 lg:px-10 lg:pt-0",
                  i > 0 && "lg:border-l",
                )}
              >
                {"sketch" in visual ? (
                  // Dibujo a mano en el mismo lugar y proporción que las fotos, para alinear las columnas
                  <div className="flex aspect-[4/5] w-full max-w-sm items-center justify-center bg-paper sm:row-span-3 lg:row-span-1">
                    <TableSketch className="h-36 w-auto lg:h-44" />
                  </div>
                ) : (
                  <EditorialImage
                    {...visual}
                    aspect="aspect-[4/5]"
                    imageClassName={cn("group-hover:scale-100!", visual.fit === "contain" && "object-contain!")}
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className={cn("w-full max-w-sm sm:row-span-3 lg:row-span-1", visual.fit === "contain" && "bg-paper")}
                  />
                )}
                <h3 className="display-md mt-8 sm:mt-0 lg:mt-8">{item.title}</h3>
                <p className="body-copy mt-4 max-w-sm text-ink-soft">
                  {item.text.before}
                  <strong className="font-medium text-ink">{item.text.strong}</strong>
                  {item.text.after}
                </p>
                <CTA
                  href={item.cta.href}
                  variant="link"
                  newTab={item.cta.newTab}
                  className="mt-8 self-start sm:self-end sm:justify-self-start lg:mt-auto lg:self-start lg:pt-8"
                >
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
