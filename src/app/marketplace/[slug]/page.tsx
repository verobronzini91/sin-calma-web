import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketplaceHeader, ProductDetail } from "@/components/marketplace/MarketplaceSections";
import { getMarketplaceCapsule, getMarketplaceProduct, marketplaceProducts, productSummary } from "@/content/marketplace";
import { routes } from "@/content/navigation";
import { resolveProduct } from "@/lib/marketplace";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return marketplaceProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getMarketplaceProduct((await params).slug);
  if (!product) return {};
  const capsule = getMarketplaceCapsule(product.capsule);
  return buildMetadata({
    title: capsule ? `${product.name} · ${capsule.name}` : product.name,
    description: productSummary(product),
    path: `${routes.marketplace}/${product.slug}`,
  });
}

export default async function MarketplaceProductPage({ params }: Props) {
  const product = getMarketplaceProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <MarketplaceHeader active="shop" titleAs="link" />
      <ProductDetail product={await resolveProduct(product)} />
    </>
  );
}
