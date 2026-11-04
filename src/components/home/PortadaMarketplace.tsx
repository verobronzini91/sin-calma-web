import type { CSSProperties } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import Link from "next/link";
import { productName, productNameLink, productPath, whiten } from "@/components/marketplace/MarketplaceSections";
import { getMarketplaceProduct } from "@/content/marketplace";
import { portadaMarketplace } from "@/content/portada";
import { cn } from "@/lib/cn";
import { resolveProducts } from "@/lib/marketplace";
import { PortadaLink } from "./PortadaLink";

/**
 * El marketplace de la novia: 3 productos: foto y nombre, ambos llevan a su ficha en /marketplace.
 * La foto es la misma del Marketplace (propia o la og:image de la tienda, cacheada un día).
 */
export async function PortadaMarketplace() {
  const { title, note, cta } = portadaMarketplace;
  const products = await resolveProducts(
    portadaMarketplace.products.map(getMarketplaceProduct).filter((product) => product !== undefined),
  );

  return (
    <section aria-labelledby="marketplace-title" className="wide mt-16 lg:mt-20">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 id="marketplace-title" className="entry-title" style={{ fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}>
            {title}
          </h2>
          <p
            className="script"
            style={{ "--script-size": "clamp(1.5rem, 1.9vw, 1.9rem)", "--script-rotate": "-4deg" } as CSSProperties}
          >
            {note}
          </p>
        </div>
        <PortadaLink cta={cta} className="shrink-0" />
      </div>

      <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:mt-8">
        {products.map((product) => (
          <li key={product.slug} className="reveal w-[78vw] shrink-0 snap-start sm:w-auto">
            {/* La foto repite el enlace del nombre: se saca del orden de tabulación */}
            <Link href={productPath(product.slug)} tabIndex={-1} aria-hidden="true" className="group block bg-canvas">
              {/* Ficha de catálogo: producto completo, sin recorte ni zoom. Las fotos de la
                  tienda se aclaran como en el Shop para que su fondo crema quede blanco */}
              <EditorialImage
                src={product.gallery[0].src}
                alt=""
                tone="ivory"
                label={product.name}
                aspect="aspect-[2/3]"
                imageClassName={cn("object-contain! group-hover:scale-100!", whiten(product.gallery[0]))}
                sizes="(min-width: 640px) 32vw, 78vw"
              />
            </Link>
            <h3 className={cn(productName, "mt-4")}>
              <Link href={productPath(product.slug)} className={productNameLink}>
                {product.name}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
