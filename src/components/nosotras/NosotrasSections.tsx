import type { CSSProperties, ReactNode } from "react";
import { Arrow, FlowerSketch, Underline, VaseSketch } from "@/components/home/Ink";
import { Paragraphs } from "@/components/sections/EditorialText";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { PlanSketch } from "@/components/wedding-planning/Sketches";
import type { ImageAsset } from "@/content/types";
import {
  nosCierre,
  nosCreamos,
  nosHero,
  nosHistoria,
  nosMantra,
  nosMiradas,
  nosMujerCalma,
  nosNumeros,
  nosVinculo,
} from "@/content/nosotras";
import { clari, vero } from "@/content/people";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";

/** Las fotos de esta página no hacen zoom al pasar el mouse. */
const still = "group-hover:scale-100!";
/** Aire vertical de sección, algo más contenido que en el resto del sitio. */
const sectionY = "py-[clamp(3.5rem,7vw,7rem)]";
/** Cuerpo de texto un punto más chico que el general. */
const body = "text-[0.95rem]! lg:text-base!";

/** Manuscrito azul tinta, chico o mediano: nunca titular. */
function Script({ children, size, rotate = "-4deg", className }: { children: ReactNode; size: string; rotate?: string; className?: string }) {
  return (
    <p className={cn("script", className)} style={{ "--script-size": size, "--script-rotate": rotate } as CSSProperties}>
      {children}
    </p>
  );
}

/** Titular de sección en la serif de portada. */
function Title({ id, children, size = "clamp(1.8rem,3.2vw,3.25rem)", className }: { id: string; children: ReactNode; size?: string; className?: string }) {
  return (
    <h2 id={id} className={cn("portada-title", className)} style={{ "--title-size": size } as CSSProperties}>
      {children}
    </h2>
  );
}

/**
 * Collage: una foto base y otra más chica superpuesta en una esquina, con un filete blanco
 * que las separa (sin sombras). Cada foto es un slot reemplazable (ver content/nosotras.ts).
 */
function Collage({
  base,
  over,
  baseAspect = "aspect-[4/5]",
  overAspect = "aspect-[4/5]",
  corner = "br",
  sizes,
  className,
}: {
  base: ImageAsset;
  over: ImageAsset;
  baseAspect?: string;
  overAspect?: string;
  /** Esquina donde se apoya la foto superpuesta */
  corner?: "br" | "bl";
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative pb-[16%]", className)}>
      <EditorialImage
        {...base}
        aspect={baseAspect}
        imageClassName={still}
        sizes={sizes}
        className={cn("w-[78%]", corner === "bl" && "ml-auto")}
      />
      <EditorialImage
        {...over}
        aspect={overAspect}
        imageClassName={still}
        sizes="(min-width: 1024px) 20vw, 45vw"
        className={cn("absolute bottom-0 w-[44%] border-8 border-canvas lg:border-[10px]", corner === "br" ? "right-0" : "left-0")}
      />
    </div>
  );
}

/* 1 · Hero: cercano e íntimo, foto vertical grande a la derecha. */
export function NosHero() {
  const { title, text, note, image } = nosHero;

  return (
    <section aria-labelledby="nos-title" className="pt-10 pb-4 lg:pt-14">
      <div className="shell grid-editorial items-end gap-y-10">
        <div className="rise col-span-12 lg:col-span-6 lg:pb-8">
          <h1 id="nos-title" className="portada-title [--title-size:clamp(3rem,6.5vw,6.25rem)]">
            {title}
          </h1>
          <p className="lead mt-6 max-w-md lg:mt-8">{text}</p>
          <div className="mt-10 hidden items-end gap-4 lg:flex">
            <Script size="clamp(1.7rem,2.2vw,2.3rem)">{note}</Script>
            <Arrow className="mb-1 w-20 rotate-[28deg]" />
          </div>
        </div>
        <div className="rise col-span-12 [--delay:150ms] sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-8">
          <EditorialImage {...image} aspect="aspect-[4/5]" imageClassName={still} sizes="(min-width: 1024px) 40vw, 90vw" preload />
        </div>
        <Script size="1.8rem" className="col-span-12 lg:hidden">
          {note}
        </Script>
      </div>
    </section>
  );
}

/* 2 · De esto se trata: foto grande a la izquierda, texto a la derecha y dos detalles superpuestos. */
export function NosHistoria() {
  const { title, text, closing, images } = nosHistoria;

  return (
    <section aria-labelledby="historia-title" className={sectionY}>
      <h2 id="historia-title" className="sr-only">
        {title}
      </h2>
      <div className="shell grid-editorial gap-y-10">
        <EditorialImage
          {...images.main}
          aspect="aspect-[4/5]"
          imageClassName={still}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="reveal col-span-12 sm:col-span-9 lg:col-span-6"
        />
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Paragraphs items={text} className={cn("reveal max-w-lg", body)} />
          <p className="lead reveal mt-6 max-w-md italic">{closing}</p>
          <Collage
            base={images.detailA}
            over={images.detailB}
            baseAspect="aspect-[4/5]"
            overAspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="reveal mt-10 lg:mt-14"
          />
        </div>
      </div>
    </section>
  );
}

/* 3 · Más de 15 años: collage de bodas reales y los números como apuntes manuscritos. */
export function NosNumeros() {
  const { title, stats, lost, images } = nosNumeros;
  const [base, over, loose] = images;

  return (
    <section aria-labelledby="numeros-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial gap-y-10">
        <Collage
          base={base}
          over={over}
          baseAspect="aspect-[4/5]"
          overAspect="aspect-[4/5]"
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="reveal order-2 col-span-12 sm:col-span-10 lg:order-none lg:col-span-6"
        />
        <div className="order-1 col-span-12 lg:order-none lg:col-span-5 lg:col-start-8">
          <Title id="numeros-title" className="reveal max-w-md">
            {title}
          </Title>
          {/* Los números como notas al margen, no como titulares */}
          <ul className="reveal mt-8 space-y-3 lg:mt-10">
            {stats.map((stat, i) => (
              <li key={stat.value}>
                <Script size="clamp(2rem,2.8vw,2.8rem)" rotate={i === 0 ? "-4deg" : "2deg"} className={cn(i === 1 && "ml-10")}>
                  {stat.value} {stat.label.toLowerCase()}
                </Script>
              </li>
            ))}
          </ul>
          <div className="reveal mt-10">
            <p className="portada-title uppercase [--title-size:clamp(1.5rem,2.2vw,2.2rem)]">{lost.title}</p>
            <p className="lead mt-2 max-w-sm italic">{lost.text}</p>
          </div>
          <EditorialImage
            {...loose}
            aspect="aspect-[4/3]"
            imageClassName={still}
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="reveal mt-10 lg:mt-12"
          />
        </div>
      </div>
    </section>
  );
}

/* 4 · Creamos lo que nos proponemos: collage, un boceto y el texto desplazado. */
export function NosCreamos() {
  const { title, text, closing, image, detail } = nosCreamos;

  return (
    <section aria-labelledby="creamos-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial gap-y-12">
        <div className="relative col-span-12 sm:col-span-10 lg:col-span-6">
          <Collage base={image} over={detail} baseAspect="aspect-[3/4]" sizes="(min-width: 1024px) 40vw, 80vw" className="reveal" />
          <PlanSketch className="absolute top-6 right-2 hidden h-24 w-auto sm:block lg:right-6 lg:h-28" />
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-center">
          <Title id="creamos-title" className="reveal max-w-md">
            {title}
          </Title>
          <Paragraphs items={text} className={cn("reveal mt-8 max-w-lg", body)} />
          <p className="lead reveal mt-8 max-w-md italic">{closing}</p>
        </div>
      </div>
    </section>
  );
}

/* 5 · La mujer calma: titular grande, texto a los dos lados de una foto alta y protagonista. */
export function NosMujerCalma() {
  const { title, left, right, closing, image } = nosMujerCalma;
  const [first, statement, ...rest] = right;

  return (
    <section aria-labelledby="mujer-calma-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell">
        <Title id="mujer-calma-title" size="clamp(2.6rem,5.5vw,5.5rem)" className="reveal">
          La mujer <span className="italic">calma</span>
          <span className="sr-only"> — {title}</span>
        </Title>

        {/* Texto · foto · texto como una sola pieza centrada: entra en una pantalla de desktop */}
        <div className="grid-editorial mt-8 gap-y-10 lg:mt-10">
          <Paragraphs
            items={left}
            className={cn("reveal col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-2 lg:self-end", body)}
          />
          <EditorialImage
            {...image}
            aspect="aspect-[4/5] lg:aspect-auto lg:h-[min(52vh,29rem)]"
            imageClassName={still}
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="reveal col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-5 lg:h-[min(52vh,29rem)]"
          />
          <div className="reveal col-span-12 lg:col-span-3 lg:col-start-9 lg:self-start">
            <Paragraphs items={[first]} className={body} />
            <p className="display-sm mt-5 italic">{statement}</p>
            <Paragraphs items={rest} className={cn("mt-5", body)} />
          </div>
        </div>

        <p className="display-sm reveal mt-10 max-w-2xl lg:mt-8 lg:ml-[calc((100%-11*2rem)/12*4+4*2rem)]">{closing}</p>
      </div>
    </section>
  );
}

/* 6 · Nuestro mantra: sin caja, asimétrico, con collage de novia y un dibujo. */
export function NosMantra() {
  const { note, lead, lines, closing, image, detail } = nosMantra;

  return (
    <section aria-labelledby="mantra-title" className={sectionY}>
      <div className="shell grid-editorial items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <h2 id="mantra-title">
            <Script size="clamp(1.9rem,2.6vw,2.6rem)">{note}</Script>
          </h2>
          <p className="display-sm reveal mt-6 max-w-lg">{lead}</p>
          <p className="display-sm reveal mt-6 italic">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-10 flex items-end gap-8">
            <p className="portada-title reveal relative inline-block [--title-size:clamp(2rem,3.4vw,3.4rem)]">
              {closing}
              <Underline className="absolute -bottom-2 left-0 h-[0.25em] w-full" />
            </p>
            <FlowerSketch className="hidden h-28 w-auto sm:block" />
          </div>
        </div>
        <Collage
          base={image}
          over={detail}
          baseAspect="aspect-[3/4]"
          overAspect="aspect-square"
          corner="bl"
          sizes="(min-width: 1024px) 36vw, 80vw"
          className="reveal col-span-12 sm:col-span-10 sm:col-start-3 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>
  );
}

/* 7 · El vínculo: texto amplio y una foto cercana grande. */
export function NosVinculo() {
  const { title, lead, text, closing, image } = nosVinculo;

  return (
    <section aria-labelledby="vinculo-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial items-center gap-y-10">
        <div className="col-span-12 lg:col-span-6">
          <Title id="vinculo-title" className="reveal max-w-lg">
            {title}
          </Title>
          <p className="lead reveal mt-8 max-w-xl">{lead}</p>
          <Paragraphs items={text} className={cn("reveal mt-6 max-w-lg", body)} />
          <div className="display-sm reveal mt-10 max-w-lg">
            <p>{closing[0]}</p>
            <p className="mt-1 italic">{closing[1]}</p>
          </div>
        </div>
        <EditorialImage
          {...image}
          aspect="aspect-[4/5]"
          imageClassName={still}
          sizes="(min-width: 1024px) 42vw, 90vw"
          className="reveal col-span-12 sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>
  );
}

/* 8 y 9 · Vero / Clari: dos columnas distintas pero complementarias. */
export function NosMiradas() {
  const { title, people } = nosMiradas;

  return (
    <section aria-labelledby="miradas-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell">
        <Title id="miradas-title" className="reveal max-w-2xl">
          {title}
        </Title>
        <div className="grid-editorial mt-10 gap-y-16 lg:mt-14">
          {people.map((person, i) => (
            <article
              key={person.name}
              className={cn("reveal col-span-12 sm:col-span-6", i === 0 ? "lg:col-span-6" : "sm:mt-24 lg:col-span-6")}
            >
              <EditorialImage
                {...person.image}
                aspect={i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}
                imageClassName={still}
                sizes="(min-width: 640px) 48vw, 100vw"
              />
              <h3 className="portada-title mt-6 [--title-size:clamp(2.4rem,4.2vw,4.25rem)]">{person.name}</h3>
              <p className="caps-copy mt-3 text-ink-soft">{person.disciplines.join(" · ")}</p>
              <Script size="clamp(1.6rem,2vw,2rem)" rotate={i === 0 ? "-3deg" : "2deg"} className="mt-6">
                {person.question}
              </Script>
              <div>
                <CTA href={person.cta.href} variant="link" className="mt-6">
                  {person.cta.label}
                </CTA>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 10 · Cierre. `id="contacto"`: destino de los enlaces “Contacto” del sitio. */
export function NosCierre() {
  const { title, text, cta, diario } = nosCierre;

  return (
    <section id="contacto" aria-labelledby="cierre-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <Title id="cierre-title" className="reveal">
            {title}
          </Title>
          <div className="reveal body-copy mt-6 max-w-xl text-ink-soft">
            {text.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <CTA href={cta.href} variant="link" className="mt-8">
            {cta.label}
          </CTA>
          <p className="mt-10 max-w-xl text-[0.92rem] leading-relaxed text-ink-soft lg:mt-14">
            {diario.before}
            <a
              href={diario.href}
              {...newTabProps(diario.href)}
              className="text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-ink-blue"
            >
              {diario.label}
            </a>
            {diario.after}
          </p>
        </div>
        <div className="col-span-3 col-start-10 hidden items-end justify-end lg:flex">
          <VaseSketch className="h-44 w-auto" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* /nosotras/clari                                                             */
/* -------------------------------------------------------------------------- */

/** Dos líneas en serif mediana; la segunda en cursiva. */
function Statement({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn("display-sm", className)}>
      {lines.map((line, i) => (
        <p key={line} className={cn(i > 0 && "mt-1 italic")}>
          {line}
        </p>
      ))}
    </div>
  );
}

/* Clari · Su mirada: texto a la izquierda, collage a la derecha. */
export function ClariMirada() {
  const { title, lead, text, statement, images } = clari.mirada;
  const [base, over] = images;

  return (
    <section aria-labelledby="clari-mirada-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <Title id="clari-mirada-title" className="reveal">
            {title}
          </Title>
          <p className="lead reveal mt-8 max-w-lg">{lead}</p>
          <Paragraphs items={text} className={cn("reveal mt-6 max-w-lg", body)} />
          <Statement lines={statement} className="reveal mt-10 max-w-lg" />
        </div>
        <Collage
          base={base}
          over={over}
          corner="bl"
          sizes="(min-width: 1024px) 36vw, 80vw"
          className="reveal col-span-12 sm:col-span-10 sm:col-start-3 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>
  );
}

/* Clari · De la idea al espacio: collage a la izquierda; texto y una foto horizontal a la derecha. */
export function ClariEspacio() {
  const { title, text, statement, images } = clari.espacio;
  const [base, over, wide] = images;

  return (
    <section aria-labelledby="clari-espacio-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial gap-y-12">
        <Collage
          base={base}
          over={over}
          baseAspect="aspect-[3/4]"
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="reveal order-2 col-span-12 sm:col-span-10 lg:order-none lg:col-span-6"
        />
        <div className="order-1 col-span-12 lg:order-none lg:col-span-5 lg:col-start-8">
          <Title id="clari-espacio-title" className="reveal max-w-md">
            {title}
          </Title>
          <Paragraphs items={text} className={cn("reveal mt-8 max-w-lg", body)} />
          <Statement lines={statement} className="reveal mt-10 max-w-lg" />
          <EditorialImage
            {...wide}
            aspect="aspect-[4/3]"
            imageClassName={still}
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="reveal mt-10 lg:mt-12"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* /nosotras/vero                                                              */
/* -------------------------------------------------------------------------- */

/* Vero · Su manera de hacer: collage a la izquierda, texto a la derecha. */
export function VeroHacer() {
  const { title, lead, text, quote, images } = vero.hacer;
  const [base, over] = images;

  return (
    <section aria-labelledby="vero-hacer-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial items-center gap-y-12">
        <Collage
          base={base}
          over={over}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="reveal order-2 col-span-12 sm:col-span-10 lg:order-none lg:col-span-6"
        />
        <div className="order-1 col-span-12 lg:order-none lg:col-span-5 lg:col-start-8">
          <Title id="vero-hacer-title" className="reveal">
            {title}
          </Title>
          <p className="lead reveal mt-8 max-w-lg">{lead}</p>
          <Paragraphs items={text} className={cn("reveal mt-6 max-w-lg", body)} />
          <p className="display-sm reveal mt-10 max-w-md italic">{quote}</p>
        </div>
      </div>
    </section>
  );
}

/* Vero · De la idea a la realidad: texto a la izquierda; foto grande de producción con un detalle horizontal. */
export function VeroRealidad() {
  const { title, text, statement, closing, images } = vero.realidad;
  const [base, over] = images;

  return (
    <section aria-labelledby="vero-realidad-title" className={cn(sectionY, "border-t border-line")}>
      <div className="shell grid-editorial items-center gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <Title id="vero-realidad-title" className="reveal max-w-md">
            {title}
          </Title>
          <Paragraphs items={text} className={cn("reveal mt-8 max-w-lg", body)} />
          <Statement lines={statement} className="reveal mt-10 max-w-lg" />
          <p className="portada-title reveal mt-12 max-w-lg [--title-size:clamp(1.6rem,2.4vw,2.4rem)]">{closing}</p>
        </div>
        <Collage
          base={base}
          over={over}
          baseAspect="aspect-[3/4]"
          overAspect="aspect-[4/3]"
          corner="bl"
          sizes="(min-width: 1024px) 44vw, 80vw"
          className="reveal col-span-12 sm:col-span-10 sm:col-start-3 lg:col-span-6 lg:col-start-7"
        />
      </div>
    </section>
  );
}
