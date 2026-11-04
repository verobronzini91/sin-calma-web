import type { CSSProperties } from "react";
import { Arrow, FlowerSketch, Underline, VaseSketch } from "@/components/home/Ink";
import { Paragraphs, SectionTitle } from "@/components/sections/EditorialText";
import { EditorialImage } from "@/components/ui/EditorialImage";
import {
  wpAcompanamiento,
  wpComoExperiencia,
  wpDestino,
  wpExperiencia15,
  wpHero,
  wpHistoria,
  wpLugares,
  wpRecorrido,
  wpServicio,
  wpTestimonios,
} from "@/content/wedding-planning";
import { cn } from "@/lib/cn";
import { ClipboardSketch, HouseSketch, PlanSketch, TableSketch } from "./Sketches";

/** Las fotos de esta página no hacen zoom al pasar el mouse. */
const still = "group-hover:scale-100!";

/** Titular grande en blanco, la bajada y el CTA; la foto abajo, casi a todo el ancho. */
export function WpHero() {
  const { title, text, image } = wpHero;

  return (
    <section aria-labelledby="wp-title" className="pt-10 lg:pt-16">
      <div className="shell grid-editorial items-end gap-y-8">
        <h1
          id="wp-title"
          className="portada-title rise col-span-12 [--title-size:clamp(2.6rem,6.6vw,6.75rem)] lg:col-span-8"
        >
          {title.map((line, i) => (
            <span key={line} className={cn("block", i === title.length - 1 && "italic")}>
              {line}
            </span>
          ))}
        </h1>
        <div className="rise col-span-12 [--delay:150ms] lg:col-span-4 lg:pb-3">
          <Paragraphs items={text} className="max-w-sm" />
        </div>
      </div>
      <div className="shell mt-10 lg:mt-14">
        <EditorialImage
          {...image}
          aspect="aspect-[4/3] lg:aspect-[21/9]"
          imageClassName={still}
          sizes="100vw"
          preload
          className="fade-in [--delay:250ms]"
        />
      </div>
    </section>
  );
}

/** Foto a sangre con la frase encima. */
export function WpHistoria() {
  const { title, image } = wpHistoria;

  return (
    <section aria-labelledby="historia-title" className="relative">
      <EditorialImage
        {...image}
        aspect="aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:h-[min(92svh,62rem)]"
        className="lg:h-[min(92svh,62rem)]"
        imageClassName={cn(still, "max-sm:object-[30%_40%]!")}
        sizes="100vw"
      />
      {/* Velo inferior: sólo lo necesario para que el titular se lea */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.5)_0%,rgb(0_0_0/0.18)_32%,transparent_55%)]"
      />
      <h2
        id="historia-title"
        className="portada-title reveal absolute bottom-8 left-4 text-white [--title-size:clamp(2.3rem,5.8vw,6.25rem)] sm:bottom-10 sm:left-6 lg:bottom-[8%] lg:left-[4.4vw]"
      >
        {title.map((line, i) => (
          <span key={line} className={cn("block", i === 1 && "italic")}>
            {line}
          </span>
        ))}
      </h2>
    </section>
  );
}

/** El “15” como pieza central; la foto acompaña, chica. */
export function WpQuinceAnios() {
  const { title, text, note, image } = wpExperiencia15;

  return (
    <section aria-labelledby="quince-title" className="section-y">
      <div className="shell grid-editorial gap-y-12">
        <h2
          id="quince-title"
          aria-label={`${title.before} ${title.number} ${title.after}`}
          className="portada-title col-span-12 lg:col-span-5 lg:self-center"
        >
          <span aria-hidden="true" className="block [--title-size:clamp(1.8rem,3.4vw,3.4rem)] portada-title">
            {title.before}
          </span>
          <span aria-hidden="true" className="flex items-end gap-[0.06em]">
            <span className="portada-title -ml-[0.04em] leading-[0.74] tracking-[-0.05em] [--title-size:clamp(8rem,22vw,21rem)]">
              {title.number}
            </span>
            <span className="portada-title pb-[0.12em] [--title-size:clamp(1.8rem,3.4vw,3.4rem)]">{title.after}</span>
          </span>
        </h2>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <EditorialImage {...image} aspect="aspect-[5/4]" imageClassName={still} sizes="(min-width: 1024px) 56vw, 100vw" className="reveal" />
        </div>

        <p
          className="script col-span-12 self-start [--script-size:clamp(1.7rem,2.4vw,2.4rem)] lg:col-span-4 lg:mt-4"
          style={{ "--script-rotate": "-4deg" } as CSSProperties}
        >
          {note}
        </p>
        <Paragraphs items={text} className="reveal col-span-12 max-w-xl lg:col-span-6 lg:col-start-6" />
      </div>
    </section>
  );
}

export function WpComoExperiencia() {
  const { title, text, quote, image } = wpComoExperiencia;

  return (
    <section aria-labelledby="como-experiencia-title" className="section-y border-t border-line">
      <div className="shell grid-editorial gap-y-12">
        <div className="reveal col-span-12 lg:col-span-5">
          <SectionTitle id="como-experiencia-title" className="max-w-md">
            {title}
          </SectionTitle>
          <Paragraphs items={text} className="mt-8 max-w-md lg:mt-10" />
          <p className="portada-title relative mt-8 inline-block italic [--title-size:clamp(2.3rem,4.4vw,4.5rem)]">
            {quote}
            <Underline className="absolute -bottom-[0.18em] left-0 h-[0.2em] w-full" />
          </p>
        </div>
        <EditorialImage
          {...image}
          aspect="aspect-[4/3] lg:aspect-[5/4]"
          imageClassName={still}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="reveal col-span-12 lg:col-span-6 lg:col-start-7 lg:self-center"
        />
      </div>
    </section>
  );
}

/** Tres lugares distintos, en tres tamaños: no es un antes y después. */
export function WpLugares() {
  const { title, intro, quote, text, closing, note, images } = wpLugares;
  const [parque, casa, mesa] = images;

  return (
    <section aria-labelledby="lugares-title" className="section-y border-t border-line">
      <div className="shell">
        <div className="grid-editorial gap-y-8">
          <SectionTitle id="lugares-title" className="reveal col-span-12 max-w-3xl lg:col-span-7">
            {title}
          </SectionTitle>
          <div className="reveal col-span-12 lg:col-span-10">
            <p className="body-copy text-ink-soft">{intro}</p>
            <p className="display-md mt-4 italic">{quote}</p>
          </div>
        </div>

        <EditorialImage
          {...casa}
          aspect="aspect-[4/3] lg:aspect-[16/9]"
          imageClassName={still}
          sizes="100vw"
          className="reveal mt-14 lg:mt-20"
        />

        <div className="grid-editorial mt-6 gap-y-10 lg:mt-8">
          <EditorialImage
            {...mesa}
            aspect="aspect-[3/2]"
            imageClassName={still}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="reveal col-span-12 lg:col-span-7"
          />
          <Paragraphs items={text} className="reveal col-span-12 max-w-md lg:col-span-4 lg:col-start-9 lg:self-end" />
        </div>

        <div className="grid-editorial mt-16 gap-y-10 lg:mt-8">
          <div className="reveal col-span-12 lg:col-span-4 lg:self-center">
            <div className="display-sm space-y-2">
              {closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p
              className="script mt-8 [--script-size:clamp(1.8rem,2.4vw,2.4rem)]"
              style={{ "--script-rotate": "-5deg" } as CSSProperties}
            >
              {note}
            </p>
          </div>
          <EditorialImage
            {...parque}
            aspect="aspect-[4/3] lg:aspect-[2/1]"
            imageClassName={still}
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="reveal col-span-12 lg:col-span-8 lg:col-start-5"
          />
        </div>
      </div>
    </section>
  );
}

/** Texto arriba y la foto a sangre. */
export function WpDestino() {
  const { title, text, image } = wpDestino;

  return (
    <section aria-labelledby="destino-title" className="border-t border-line pt-[clamp(4.5rem,10vw,10rem)]">
      <div className="shell grid-editorial gap-y-8">
        <SectionTitle id="destino-title" className="reveal col-span-12 max-w-xl lg:col-span-5">
          {title}
        </SectionTitle>
        <Paragraphs items={text} className="reveal col-span-12 max-w-xl lg:col-span-5 lg:col-start-7" />
      </div>
      <EditorialImage
        {...image}
        aspect="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9]"
        imageClassName={still}
        sizes="100vw"
        className="reveal mt-14 lg:mt-20"
      />
    </section>
  );
}

const stepSketches = [PlanSketch, HouseSketch, TableSketch, ClipboardSketch];

/** Recorrido dibujado a mano: cuatro pasos unidos por flechas de birome. */
export function WpRecorrido() {
  const { title, subtitle, steps } = wpRecorrido;

  return (
    <section aria-labelledby="recorrido-title" className="section-y mt-24 bg-paper lg:mt-36">
      <div className="shell">
        <SectionTitle id="recorrido-title" className="reveal max-w-3xl">
          {title}
        </SectionTitle>
        <p className="body-copy mt-6 text-ink-soft">{subtitle}</p>

        <ol className="mt-16 grid gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-14">
          {steps.map((step, i) => {
            const Sketch = stepSketches[i];
            return (
              <li key={step.title} className="reveal relative">
                <Sketch className="h-32 w-auto lg:h-40" />
                {i < steps.length - 1 && (
                  <Arrow className="absolute top-14 -right-12 hidden w-12 lg:block" />
                )}
                <p className="eyebrow mt-8 text-muted">{step.label}</p>
                <h3 className="display-sm mt-2">{step.title}</h3>
                <p className="body-copy mt-3 max-w-xs text-ink-soft">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function WpAcompanamiento() {
  const { title, text, closing, image } = wpAcompanamiento;

  return (
    <section aria-labelledby="acompanamiento-title" className="section-y">
      <div className="shell grid-editorial gap-y-12">
        <EditorialImage
          {...image}
          aspect="aspect-[3/4]"
          imageClassName={still}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="reveal col-span-11 sm:col-span-8 lg:col-span-5"
        />
        <div className="reveal col-span-12 lg:col-span-5 lg:col-start-7 lg:self-center">
          <SectionTitle id="acompanamiento-title">{title}</SectionTitle>
          <Paragraphs items={text} className="mt-8 max-w-md lg:mt-10" />
          <div className="mt-10 flex items-end gap-6">
            <p className="lead max-w-sm italic">{closing}</p>
            <FlowerSketch className="h-32 w-auto shrink-0 lg:h-40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Estructura para testimonios reales. Hoy muestra un testimonio de muestra (placeholder). */
export function WpTestimonios() {
  const { title, items, image } = wpTestimonios;

  return (
    <section aria-labelledby="testimonios-title" className="section-y border-t border-line">
      <h2 id="testimonios-title" className="sr-only">
        {title}
      </h2>
      <div className="shell grid-editorial gap-y-10">
        <EditorialImage
          {...image}
          aspect="aspect-[4/3] sm:aspect-[3/2]"
          imageClassName={still}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="reveal col-span-12 lg:col-span-7"
        />
        <div className="col-span-12 space-y-14 lg:col-span-5 lg:col-start-8 lg:self-center">
          {items.map((item) => (
            <figure key={item.quote} data-placeholder={item.sample ? "testimonio-de-muestra" : undefined} className="reveal">
              <span aria-hidden="true" className="portada-title block text-ink-blue [--title-size:5rem]">
                “
              </span>
              <blockquote className="-mt-6 font-serif text-[clamp(1.3rem,1.75vw,1.6rem)] leading-[1.32] italic">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="caps-copy mt-6 text-muted">{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Índice editorial del servicio: título fijo a la izquierda, líneas finas a la derecha. */
export function WpServicio() {
  const { title, intro, items } = wpServicio;

  return (
    <section aria-labelledby="servicio-title" className="section-y border-t border-line">
      <div className="shell grid-editorial gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionTitle id="servicio-title" className="max-w-lg">
              {title}
            </SectionTitle>
            <Paragraphs items={intro} className="mt-8 max-w-sm lg:mt-10" />
            <VaseSketch className="mt-12 hidden h-40 w-auto lg:block" />
          </div>
        </div>
        <ul className="col-span-12 border-t border-line lg:col-span-6 lg:col-start-7">
          {items.map((item) => (
            <li
              key={item.title}
              className="reveal grid gap-3 border-b border-line py-8 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8 lg:py-10"
            >
              <h3 className="display-sm">{item.title}</h3>
              <p className="body-copy text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
