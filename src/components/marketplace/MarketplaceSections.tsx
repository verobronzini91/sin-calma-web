import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Paragraphs } from "@/components/sections/EditorialText";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { routes } from "@/content/navigation";
import {
  getMarketplaceCapsule,
  marketplaceCapsulesIntro,
  marketplaceGridScale,
  marketplaceHeader,
  marketplaceProductLabels,
  type MarketplaceCapsule,
} from "@/content/marketplace";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import type { ResolvedProduct } from "@/lib/marketplace";
import { ProductGallery } from "./ProductGallery";

export const productPath = (slug: string) => `${routes.marketplace}/${slug}`;
const capsulePath = (slug: string) => `${routes.marketplaceCapsulas}#${slug}`;

/** Fondo crema de la foto de la tienda en el bloque de cada cápsula: mientras carga, no se ve un hueco. */
const storeBg = "bg-[#f1f0ec]";

/**
 * La primera foto de cada producto de la tienda es el producto aislado sobre un fondo crema
 * (#f1f0ec, en algunos ya blanco). Se aclara apenas para que el fondo quede blanco y todas
 * se vean iguales sobre la página. Las fotos propias (en /public) se muestran tal cual.
 */
/** Nombre del producto debajo de la foto (Shop y Home): serif chica, peso normal, como un epígrafe */
export const productName =
  "portada-title font-normal! leading-[1.3]! tracking-[0.01em]! [--title-size:clamp(0.9rem,0.95vw,1rem)]";
/** Subrayado fino sólo en hover / foco de teclado, sin cambio de color */
export const productNameLink = "decoration-1 underline-offset-[0.3em] hover:underline focus-visible:underline";

export const isStorePhoto = (image: ImageAsset) => typeof image.src === "string" && /mitiendanube\.com/.test(image.src);
export const whiten = (image: ImageAsset) => (isStorePhoto(image) ? "brightness-[1.085]" : undefined);

/* -------------------------------------------------------------------------- */
/* Encabezado común: título contenido + SHOP / CÁPSULAS                         */
/* -------------------------------------------------------------------------- */

const navLink =
  "inline-flex min-h-11 items-center border-b text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors";

/**
 * Encabezado de todo el Marketplace. En el SHOP y en CÁPSULAS el título es el h1;
 * en las fichas de producto es un link de vuelta (el h1 es el nombre del producto).
 */
export function MarketplaceHeader({
  active,
  titleAs = "h1",
  titleHidden = false,
}: {
  active: "shop" | "capsulas";
  titleAs?: "h1" | "link";
  /** En el SHOP arriba sólo va el menú: el título queda para lectores de pantalla y buscadores */
  titleHidden?: boolean;
}) {
  const { title, nav } = marketplaceHeader;
  const items = [
    { id: "shop", label: nav.shop, href: routes.marketplace },
    { id: "capsulas", label: nav.capsulas, href: routes.marketplaceCapsulas },
  ] as const;

  return (
    <div className="shell pt-7 text-center sm:pt-9 lg:pt-10">
      {titleAs === "h1" ? (
        <h1 className={cn("portada-title [--title-size:clamp(1.9rem,3vw,2.75rem)]", titleHidden && "sr-only")}>{title}</h1>
      ) : (
        <p className="portada-title [--title-size:clamp(1.9rem,3vw,2.75rem)]">
          <Link href={routes.marketplace} className="transition-colors hover:text-ink-blue">
            {title}
          </Link>
        </p>
      )}
      <nav aria-label="Marketplace" className={titleHidden ? undefined : "mt-2 sm:mt-3"}>
        <ul className="flex justify-center gap-8 sm:gap-14">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(navLink, active === item.id ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink")}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* El ebook se vende en la tienda de Calma: link externo, sin página propia */}
          <li>
            <a
              href={nav.ebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(navLink, "border-transparent text-muted hover:text-ink")}
            >
              {nav.ebook.label}
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/** Nombre de la cápsula en versalitas chicas. */
function CapsuleLabel({ product, link = false, className }: { product: ResolvedProduct; link?: boolean; className?: string }) {
  const capsule = getMarketplaceCapsule(product.capsule);
  const label = capsule?.name ?? product.brand;
  return (
    <p className={cn("text-[0.64rem] font-medium tracking-[0.2em] text-muted uppercase", className)}>
      {link && capsule ? (
        <Link href={capsulePath(capsule.slug)} className="transition-colors hover:text-ink-blue">
          {label}
        </Link>
      ) : (
        label
      )}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* SHOP: /marketplace                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Producto de la grilla: foto del producto aislado y nombre. Nada más.
 * El producto flota chico en el centro de un módulo cuadrado blanco; su tamaño sale de
 * `gridScale` o, si no está, de `marketplaceGridScale` según la categoría.
 */
export function ProductTile({ product, preload }: { product: ResolvedProduct; preload?: boolean }) {
  const href = productPath(product.slug);

  return (
    <li className="text-center">
      {/* La foto repite el enlace del nombre: se saca del orden de tabulación */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group block"
        style={{ "--tile-scale": product.gridScale ?? marketplaceGridScale[product.category] } as CSSProperties}
      >
        <EditorialImage
          {...product.gallery[0]}
          alt=""
          aspect="aspect-square"
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 32vw, 48vw"
          preload={preload}
          imageClassName={cn(
            isStorePhoto(product.gallery[0]) && "scale-(--tile-scale)! group-hover:scale-[calc(var(--tile-scale)*1.03)]!",
            whiten(product.gallery[0]),
          )}
        />
      </Link>
      <h2 className={cn(productName, "mt-6 sm:mt-8")}>
        <Link href={href} className={productNameLink}>
          {product.name}
        </Link>
      </h2>
      {product.priceLabel && <p className="mt-1.5 text-[0.85rem] text-ink-soft">{product.priceLabel}</p>}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Ficha: /marketplace/[slug]                                                   */
/* -------------------------------------------------------------------------- */

/** Botón de compra externo: abre la tienda oficial en otra pestaña. */
function ShopLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-12 w-full items-center justify-center gap-3 bg-ink px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.18em] text-ivory uppercase transition-colors duration-300 hover:bg-ink-soft sm:w-auto sm:inline-flex"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
      <span className="sr-only">(se abre en otra pestaña)</span>
    </a>
  );
}

export function ProductDetail({ product }: { product: ResolvedProduct }) {
  const labels = marketplaceProductLabels;
  const [cover] = product.gallery;
  const details = [{ label: labels.brand, value: product.brand }, ...(product.details ?? [])];

  return (
    <section aria-labelledby="product-title" className="pt-8 pb-[clamp(4rem,8vw,7rem)] lg:pt-10">
      <div className="shell grid-editorial gap-y-10">
        {/* Izquierda: sólo fotos, en un marco vertical sobre blanco: las verticales casi llenan
            el marco y las horizontales quedan al centro. */}
        <div className="col-span-12 lg:col-span-6">
          <ProductGallery
            labels={labels.gallery}
            frameClassName="aspect-[4/5]"
            slides={product.gallery.map((image, i) => (
              <EditorialImage
                key={i}
                {...image}
                aspect="h-full"
                sizes="(min-width: 1024px) 46vw, 100vw"
                preload={i === 0}
                imageClassName={cn(
                  "group-hover:scale-100!",
                  // La foto del producto aislado es muy alta y casi toda fondo: se recorta sólo
                  // el fondo vacío de arriba y abajo. El resto entra completa, sin recorte.
                  i === 0 && isStorePhoto(image) ? whiten(image) : "object-contain!",
                )}
                className="h-full"
              />
            ))}
          />
        </div>

        {/* Derecha: producto, descripción y compra */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            {/* Miniatura editorial, centrada: el producto aislado sobre el blanco de la página */}
            <div className="mx-auto hidden w-40 lg:block">
              <EditorialImage
                {...cover}
                alt=""
                aspect="aspect-[4/3]"
                sizes="10rem"
                imageClassName={cn("group-hover:scale-100!", whiten(cover))}
              />
            </div>

            <CapsuleLabel product={product} link className="lg:mt-6" />
            <h1 id="product-title" className="portada-title mt-3 uppercase [--title-size:clamp(2rem,3.2vw,3.1rem)]">
              {product.name}
            </h1>
            {product.priceLabel && <p className="mt-3 text-base">{product.priceLabel}</p>}

            {product.externalUrl && (
              <div className="mt-6">
                <ShopLink href={product.externalUrl}>{product.externalCta}</ShopLink>
                <p className="mt-3 text-[0.8rem] text-muted">{labels.note}</p>
              </div>
            )}

            <Paragraphs items={product.description} className="mt-9 space-y-3! text-[0.92rem]! leading-relaxed!" />

            <dl className="mt-7 border-t border-line text-[0.85rem]">
              {details.map((detail) => (
                <div key={detail.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-2.5">
                  <dt className="pt-px text-[0.64rem] font-medium tracking-[0.18em] text-muted uppercase">{detail.label}</dt>
                  <dd className="text-ink-soft">{detail.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={routes.marketplace}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-ink-soft uppercase transition-colors hover:text-ink"
            >
              <span aria-hidden="true">←</span> {labels.back}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CÁPSULAS: /marketplace/capsulas                                              */
/* -------------------------------------------------------------------------- */

export function CapsulesIntro() {
  const { title, text } = marketplaceCapsulesIntro;
  return (
    <div className="shell pt-[clamp(3rem,6vw,5.5rem)] text-center">
      <h2 className="portada-title mx-auto max-w-2xl [--title-size:clamp(2rem,3.6vw,3.4rem)]">{title}</h2>
      <Paragraphs items={text} className="mx-auto mt-6 max-w-xl" />
    </div>
  );
}

/** Una cápsula: foto grande de un lado, texto del otro. `reverse` invierte los lados. */
export function CapsuleBlock({ capsule, index }: { capsule: MarketplaceCapsule; index: number }) {
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section id={capsule.slug} aria-labelledby={`${capsule.slug}-title`} className="scroll-mt-24 py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="shell grid-editorial items-center gap-y-10">
        <div className={cn("reveal col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-6", reverse ? "lg:order-2 lg:col-start-7" : "lg:col-start-1")}>
          <EditorialImage {...capsule.image} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 48vw, 90vw" className={storeBg} />
        </div>

        <div
          className={cn(
            "reveal col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-4",
            reverse ? "lg:order-1 lg:col-start-2 lg:row-start-1" : "lg:col-start-8",
          )}
        >
          <p className="text-[0.66rem] font-medium tracking-[0.22em] text-ink-blue uppercase">
            {marketplaceHeader.capsuleNumber} {number}
          </p>
          <h2 id={`${capsule.slug}-title`} className="portada-title mt-4 [--title-size:clamp(2.1rem,3.6vw,3.5rem)]">
            {capsule.title}
          </h2>
          <Paragraphs items={capsule.text} className="mt-7" />
          {capsule.statement && (
            <p className="display-sm mt-8 border-t border-line pt-6 text-[clamp(1.35rem,2vw,1.75rem)]! italic">{capsule.statement}</p>
          )}
          {capsule.externalUrl && (
            <a
              href={capsule.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-current py-1 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors hover:text-ink-blue"
            >
              <span>{capsule.externalCta}</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
