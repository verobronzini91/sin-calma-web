import type { Metadata } from "next";
import { MarketplaceGrid } from "@/components/marketplace/MarketplaceGrid";
import { MarketplaceHeader, ProductTile } from "@/components/marketplace/MarketplaceSections";
import { marketplaceCapsules, marketplaceFilters, marketplaceMeta, marketplaceProducts } from "@/content/marketplace";
import { routes } from "@/content/navigation";
import { resolveProducts } from "@/lib/marketplace";
import { buildMetadata } from "@/lib/metadata";

const base = buildMetadata({ ...marketplaceMeta, path: routes.marketplace });

/** Título completo pedido para esta página, sin la plantilla del sitio. */
export const metadata: Metadata = {
  ...base,
  title: { absolute: marketplaceMeta.title },
  openGraph: { ...base.openGraph, title: marketplaceMeta.title },
  twitter: { ...base.twitter, title: marketplaceMeta.title },
};

/** SHOP: SHOP / CÁPSULAS / EBOOK, el filtro por cápsula y enseguida los productos. */
export default async function MarketplacePage() {
  const products = await resolveProducts(marketplaceProducts);

  return (
    <>
      <MarketplaceHeader active="shop" titleHidden />

      <section aria-label="Productos" className="pt-10 pb-[clamp(4rem,8vw,7rem)] sm:pt-14">
        <div className="shell">
          <MarketplaceGrid
            capsules={marketplaceCapsules.map((capsule) => ({ id: capsule.slug, label: capsule.brand }))}
            labels={marketplaceFilters}
            items={products.map((product, i) => ({
              slug: product.slug,
              capsule: product.capsule,
              node: <ProductTile key={product.slug} product={product} preload={i < 3} />,
            }))}
          />
        </div>
      </section>
    </>
  );
}
