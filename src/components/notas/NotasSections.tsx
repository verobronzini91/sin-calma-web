import Image from "next/image";
import Link from "next/link";
import { formatNotaDate, notasPage, type Nota, type NotaImage } from "@/content/notas";
import { routes } from "@/content/navigation";
import { cn } from "@/lib/cn";

export const notaPath = (slug: string) => `${routes.inspiracion}/${slug}`;

/** Texto de una nota: sólo <strong>, <em>, <a> y <br> (contenido propio, ver content/notas) */
const prose =
  "[&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.2em] [&_a:hover]:text-ink-blue [&_strong]:font-semibold [&_strong]:text-ink";

const altFor = (nota: Nota, image: NotaImage, n?: number) =>
  image.alt || (n ? `${nota.title}, foto ${n}` : nota.title);

/** Fecha ——— CATEGORÍA, como en la referencia */
function NotaMeta({ nota, className }: { nota: Nota; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.7rem] tracking-[0.08em] text-ink-soft uppercase", className)}>
      <time dateTime={nota.date} className="tabular-nums">
        {formatNotaDate(nota.date)}
      </time>
      <span aria-hidden="true" className="h-px w-10 bg-current sm:w-14" />
      <span>{nota.category}</span>
    </p>
  );
}

function ReadMore({ nota }: { nota: Nota }) {
  return (
    <Link
      href={notaPath(nota.slug)}
      aria-label={`${notasPage.readMore}: ${nota.title}`}
      className="group inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] uppercase decoration-1 underline-offset-[0.4em] hover:underline"
    >
      {notasPage.readMore}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Foto de portada recortada a un marco fijo (la grilla necesita alturas parejas) */
function CoverImage({ nota, aspect, sizes, preload }: { nota: Nota; aspect: string; sizes: string; preload?: boolean }) {
  return (
    <Link href={notaPath(nota.slug)} tabIndex={-1} aria-hidden="true" className={cn("group relative block overflow-hidden", aspect)}>
      <Image
        src={nota.cover.src}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Portada de Notas: una grande, después de a pares (ritmo editorial)           */
/* -------------------------------------------------------------------------- */

type Row = { kind: "feature"; nota: Nota; reverse: boolean } | { kind: "pair"; notas: Nota[] };

/** Ciclos de cinco: una destacada (alternando el lado de la foto) y dos pares. */
function compose(list: Nota[]): Row[] {
  const rows: Row[] = [];
  for (let i = 0, cycle = 0; i < list.length; cycle++) {
    rows.push({ kind: "feature", nota: list[i++], reverse: cycle % 2 === 1 });
    for (let k = 0; k < 2 && i < list.length; k++, i += 2) rows.push({ kind: "pair", notas: list.slice(i, i + 2) });
  }
  return rows;
}

function NotaFeature({ nota, reverse, first }: { nota: Nota; reverse: boolean; first: boolean }) {
  return (
    <article className="reveal grid items-center gap-y-8 lg:grid-cols-12 lg:gap-x-8">
      <div className={cn("lg:col-span-6", reverse && "lg:order-2 lg:col-start-7")}>
        <CoverImage nota={nota} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 47vw, 100vw" preload={first} />
      </div>
      <div className={cn("lg:col-span-5", reverse ? "lg:order-1 lg:col-start-2 lg:row-start-1" : "lg:col-start-8")}>
        <NotaMeta nota={nota} />
        <h2 className="mt-6 font-serif text-[clamp(1.9rem,3.2vw,3.1rem)] leading-[1.08] font-normal">
          <Link href={notaPath(nota.slug)} className="decoration-1 underline-offset-[0.18em] hover:underline">
            {nota.title}
          </Link>
        </h2>
        <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">{nota.excerpt}</p>
        <div className="mt-6">
          <ReadMore nota={nota} />
        </div>
      </div>
    </article>
  );
}

function NotaTile({ nota }: { nota: Nota }) {
  return (
    <article className="reveal">
      <CoverImage nota={nota} aspect="aspect-[3/4]" sizes="(min-width: 640px) 47vw, 100vw" />
      <div className="mt-6 sm:px-6 lg:px-12">
        <NotaMeta nota={nota} />
        <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.12] font-normal">
          <Link href={notaPath(nota.slug)} className="decoration-1 underline-offset-[0.18em] hover:underline">
            {nota.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-soft">{nota.excerpt}</p>
        <div className="mt-5">
          <ReadMore nota={nota} />
        </div>
      </div>
    </article>
  );
}

export function NotasLanding({ notas }: { notas: Nota[] }) {
  return (
    <div className="wide space-y-20 sm:space-y-24 lg:space-y-32">
      {compose(notas).map((row, i) =>
        row.kind === "feature" ? (
          <NotaFeature key={row.nota.slug} nota={row.nota} reverse={row.reverse} first={i === 0} />
        ) : (
          <div key={row.notas[0].slug} className="grid gap-y-20 sm:grid-cols-2 sm:gap-x-1.5">
            {row.notas.map((nota) => (
              <NotaTile key={nota.slug} nota={nota} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Nota: /inspiracion/[slug]                                                    */
/* -------------------------------------------------------------------------- */

/** Ancho de lectura: imágenes y texto comparten la misma columna */
const column = "mx-auto w-full max-w-[47.5rem]";

function BodyImage({ nota, image, n, caption, preload }: { nota: Nota; image: NotaImage; n?: number; caption?: string; preload?: boolean }) {
  const img = (
    <Image
      src={image.src}
      alt={altFor(nota, image, n)}
      width={image.width}
      height={image.height}
      sizes="(min-width: 800px) 47.5rem, 100vw"
      preload={preload}
      className="h-auto w-full"
    />
  );
  if (!caption) return img;
  return (
    <figure>
      {img}
      <figcaption className={cn("mt-3 text-center text-[0.8rem] text-muted italic", prose)} dangerouslySetInnerHTML={{ __html: caption }} />
    </figure>
  );
}

export function NotaArticle({ nota }: { nota: Nota }) {
  // Número de cada foto dentro de la nota, para el texto alternativo
  const photoNumber = nota.body.map((_, i) => nota.body.slice(0, i + 1).filter((b) => b.type === "image").length);
  return (
    <article className="shell pt-12 pb-20 sm:pt-16 lg:pt-20">
      <header className="mx-auto max-w-4xl text-center">
        <NotaMeta nota={nota} className="justify-center" />
        <h1 className="mt-7 font-serif text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.06] font-normal text-balance">{nota.title}</h1>
      </header>

      <div className={cn(column, "mt-12 lg:mt-16")}>
        <BodyImage nota={nota} image={nota.cover} preload />
      </div>

      <div className={cn(column, "mt-12 space-y-6 text-[1.02rem] leading-[1.75] text-ink-soft lg:mt-14 lg:text-[1.0625rem]", prose)}>
        {nota.body.map((block, i) => {
          switch (block.type) {
            case "heading":
              return (
                <h2 key={i} className="pt-8 font-serif text-[clamp(1.55rem,2.2vw,2rem)] leading-[1.15] font-normal text-ink">
                  {block.text}
                </h2>
              );
            case "image":
              return (
                <div key={i} className="py-6 sm:py-8">
                  <BodyImage nota={nota} image={block} n={photoNumber[i]} caption={block.caption} />
                </div>
              );
            case "quote":
              return (
                <blockquote key={i} className="py-4 font-serif text-[1.5rem] leading-snug text-ink italic" dangerouslySetInnerHTML={{ __html: block.html }} />
              );
            default:
              return <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />;
          }
        })}
      </div>
    </article>
  );
}

export function MoreNotas({ notas }: { notas: Nota[] }) {
  return (
    <section aria-labelledby="mas-notas-title" className="wide border-t border-line pt-14 pb-4 lg:pt-20">
      <h2 id="mas-notas-title" className="font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal">
        <Link href={routes.inspiracion} className="group inline-flex items-baseline gap-3 decoration-1 underline-offset-[0.18em] hover:underline">
          {notasPage.more}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </h2>
      <ul className="mt-10 grid gap-y-14 sm:grid-cols-3 sm:gap-x-1.5">
        {notas.map((nota) => (
          <li key={nota.slug} className="reveal">
            <CoverImage nota={nota} aspect="aspect-[3/4]" sizes="(min-width: 640px) 31vw, 100vw" />
            <div className="mt-5 sm:px-4 lg:px-8">
              <NotaMeta nota={nota} />
              <h3 className="mt-4 font-serif text-[clamp(1.3rem,1.7vw,1.6rem)] leading-[1.15] font-normal">
                <Link href={notaPath(nota.slug)} className="decoration-1 underline-offset-[0.18em] hover:underline">
                  {nota.title}
                </Link>
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
