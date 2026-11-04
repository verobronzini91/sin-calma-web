import type { MarketplaceProduct } from "@/content/marketplace";
import type { ImageAsset } from "@/content/types";
import { resolveImage } from "./images";
import { getOgImage } from "./og-image";

/** Producto con sus fotos ya resueltas (las cargadas o, si no hay, la de la tienda). */
export type ResolvedProduct = MarketplaceProduct & { gallery: ImageAsset[] };

/**
 * Fotos de un producto: las de `images` que existan (URLs de la tienda o archivos en
 * /public/images/marketplace/[slug]/); si no hay ninguna, la foto principal de su página
 * en la tienda (og:image). Corre en el servidor; la og:image se cachea un día.
 */
export async function resolveProduct(product: MarketplaceProduct): Promise<ResolvedProduct> {
  const loaded = product.images.filter((image) => resolveImage(image.src));
  if (loaded.length > 0) return { ...product, gallery: loaded };

  const og = product.externalUrl ? await getOgImage(product.externalUrl) : undefined;
  return { ...product, gallery: [{ src: og, alt: `${product.name}, ${product.brand}`, tone: "ivory", label: product.name }] };
}

export function resolveProducts(products: MarketplaceProduct[]) {
  return Promise.all(products.map(resolveProduct));
}
