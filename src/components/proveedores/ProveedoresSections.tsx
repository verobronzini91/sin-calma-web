import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ProductGallery } from "@/components/marketplace/ProductGallery";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { routes } from "@/content/navigation";
import { proveedorCategoryLabel, proveedoresPage, type Proveedor, type ProveedorReel } from "@/content/proveedores";

export const proveedorPath = (slug: string) => `${routes.recomendados}/${slug}`;

/** Categoría · zona ("Lugar · Open Door"): de la ubicación se muestra lo anterior a la coma */
export const proveedorMeta = (p: Proveedor) =>
  [proveedorCategoryLabel(p.category), p.location?.split(",")[0].trim()].filter(Boolean).join(" · ");

/* -------------------------------------------------------------------------- */
/* Intro de /recomendados                                                       */
/* -------------------------------------------------------------------------- */

export function ProveedoresIntro() {
  const { title, intro } = proveedoresPage;
  const last = intro.paragraphs.length - 1;

  return (
    <header className="mx-auto max-w-3xl text-center">
      <h1 className="portada-title uppercase [--title-size:clamp(2.1rem,4.4vw,3.9rem)]">{title}</h1>
      <div className="mt-10 space-y-5 lg:mt-12">
        {intro.paragraphs.map((parts, i) => (
          <p
            key={i}
            className={
              i === last
                ? "mx-auto max-w-xl pt-3 text-[0.92rem] leading-relaxed text-muted"
                : "font-serif text-[clamp(1.3rem,1.9vw,1.65rem)] leading-[1.3]"
            }
          >
            {parts.map((part, j) =>
              part.hand ? (
                <span
                  key={j}
                  className="script mx-1 align-[-0.05em]"
                  style={{ "--script-size": "1.45em", "--script-rotate": "-3deg" } as CSSProperties}
                >
                  {part.text}
                </span>
              ) : part.accent ? (
                <em key={j} className="text-ink-blue">
                  {part.text}
                </em>
              ) : (
                <span key={j}>{part.text}</span>
              ),
            )}
          </p>
        ))}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Tarjeta de la grilla                                                         */
/* -------------------------------------------------------------------------- */

export function ProveedorCard({ proveedor, preload }: { proveedor: Proveedor; preload?: boolean }) {
  const href = proveedorPath(proveedor.slug);
  return (
    <li className="reveal">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="group block">
        <EditorialImage {...proveedor.coverImage} alt="" aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" preload={preload} />
      </Link>
      <p className="mt-5 text-[0.62rem] font-medium tracking-[0.2em] text-ink-blue uppercase">{proveedoresPage.badge}</p>
      <h2 className="mt-3 font-serif text-[clamp(1.1rem,1.35vw,1.3rem)] leading-[1.2] font-normal tracking-[0.02em] uppercase">
        <Link href={href} className="decoration-1 underline-offset-[0.18em] hover:underline">
          {proveedor.name}
        </Link>
      </h2>
      <p className="mt-2 text-[0.66rem] tracking-[0.14em] text-muted uppercase">{proveedorMeta(proveedor)}</p>
      <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-ink-soft">{proveedor.highlight}</p>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Ficha: /recomendados/[slug]                                                  */
/* -------------------------------------------------------------------------- */

/** ID de un link de YouTube (watch?v=, youtu.be/, shorts/, embed/) */
function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{11})/);
  return m?.[1];
}

/** URL lista para mostrar, o nada si el Reel todavía no está cargado (o el archivo no existe) */
function reelSource(reel?: ProveedorReel) {
  const src = reel?.src.trim();
  if (!reel || !src) return undefined;
  if (reel.type === "youtube") {
    const id = youtubeId(src);
    return id ? { kind: "embed" as const, src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1` } : undefined;
  }
  if (reel.type === "video") {
    if (src.startsWith("/") && !existsSync(path.join(process.cwd(), "public", src))) return undefined;
    return { kind: "video" as const, src };
  }
  return { kind: "embed" as const, src };
}

/** Reel vertical 9:16 */
function Reel({ source, poster, title }: { source: NonNullable<ReturnType<typeof reelSource>>; poster?: string; title: string }) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
      {source.kind === "video" ? (
        <video src={source.src} poster={poster} controls playsInline loop preload="metadata" aria-label={title} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <iframe
          src={source.src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

function ContactLink({ href, children }: { href: string; children: string }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex min-h-11 items-center gap-3 border-b border-current py-1 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors hover:text-ink-blue"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

const sectionLabel = "text-[0.72rem] font-medium tracking-[0.2em] uppercase";

/** Ficha: nombre, categoría · zona, Reel + fotos, descripción, por qué lo elegimos, nuestra mirada, contacto */
export function ProveedorDetail({ proveedor }: { proveedor: Proveedor }) {
  const labels = proveedoresPage.detail;
  const reel = reelSource(proveedor.reel);
  const description = proveedor.description?.length ? proveedor.description : [proveedor.highlight];
  const contacts = [
    proveedor.instagram && { href: proveedor.instagram, label: labels.instagram },
    proveedor.website && { href: proveedor.website, label: labels.website },
    proveedor.whatsapp && { href: `https://wa.me/${proveedor.whatsapp}`, label: labels.whatsapp },
    proveedor.email && { href: `mailto:${proveedor.email}`, label: labels.email },
  ].filter((c): c is { href: string; label: string } => Boolean(c));

  // Fotos completas (sin recorte) sobre blanco: verticales y horizontales conviven en el mismo marco
  const slides = proveedor.gallery.map((image, i) => (
    <EditorialImage
      key={i}
      {...image}
      aspect="h-full"
      className="h-full"
      imageClassName="object-contain! group-hover:scale-100!"
      sizes={reel ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 80vw, 100vw"}
      preload={i === 0}
    />
  ));

  return (
    <article className="shell pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <header className="text-center">
        <h1 className="portada-title uppercase [--title-size:clamp(2.2rem,4.6vw,4.2rem)]">{proveedor.name}</h1>
        <p className="mt-5 text-[0.72rem] tracking-[0.16em] text-muted uppercase">{proveedorMeta(proveedor)}</p>
      </header>

      {/* Desktop: Reel 9:16 + galería. Mobile: Reel y después la galería. Sin Reel: sólo la galería. */}
      <div className="mt-12 grid gap-y-10 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        {reel && (
          <div className="mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
            <Reel source={reel} poster={proveedor.reel?.poster} title={`${labels.reel} · ${proveedor.name}`} />
          </div>
        )}
        {slides.length > 0 && (
          <div className={reel ? "lg:col-span-8" : "lg:col-span-8 lg:col-start-3"}>
            <ProductGallery slides={slides} labels={labels.gallery} frameClassName={reel ? "aspect-[4/5] lg:aspect-[9/10]" : "aspect-[4/5] sm:aspect-[3/2]"} />
          </div>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl lg:mt-24">
        <div className="space-y-4 text-center font-serif text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.28] text-balance">
          {description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-16 grid gap-y-14 lg:mt-20 lg:grid-cols-2 lg:gap-x-16">
          <section aria-labelledby="por-que-title">
            <h2 id="por-que-title" className={sectionLabel}>
              {labels.why}
            </h2>
            <div className="mt-6 space-y-4 text-[1rem] leading-[1.75] text-ink-soft">
              {proveedor.whyWeChooseIt.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          {proveedor.ourView?.length ? (
            <section aria-labelledby="mirada-title">
              <h2 id="mirada-title" className={sectionLabel}>
                {labels.ourView}
              </h2>
              <div className="mt-6 space-y-3 font-serif text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.35] italic">
                {proveedor.ourView.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {contacts.length > 0 && (
          <div className="mt-16 text-center lg:mt-20">
            <h2 className="sr-only">{labels.contact}</h2>
            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3">
              {contacts.map((c) => (
                <li key={c.label}>
                  <ContactLink href={c.href}>{c.label}</ContactLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
