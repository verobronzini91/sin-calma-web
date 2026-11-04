import type { MetadataRoute } from "next";
import { marketplaceProducts } from "@/content/marketplace";
import { routes, sitemapRoutes } from "@/content/navigation";
import { notas } from "@/content/notas";
import { proveedores } from "@/content/proveedores";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const products = marketplaceProducts.map((product) => ({ path: `${routes.marketplace}/${product.slug}`, priority: 0.5 }));
  const providers = proveedores.map((proveedor) => ({ path: `${routes.recomendados}/${proveedor.slug}`, priority: 0.6 }));
  const pages = [...sitemapRoutes, ...products, ...providers].map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
  // Notas: con su fecha de publicación
  const articles = notas.map((nota) => ({
    url: `${site.url}${routes.inspiracion}/${nota.slug}`,
    lastModified: new Date(nota.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
