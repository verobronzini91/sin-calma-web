import { ProveedoresExplorer } from "@/components/proveedores/ProveedoresExplorer";
import { ProveedorCard, ProveedoresIntro, proveedorMeta } from "@/components/proveedores/ProveedoresSections";
import { routes } from "@/content/navigation";
import { pages } from "@/content/pages";
import { proveedorCategories, proveedores, proveedoresPage } from "@/content/proveedores";
import { buildMetadata } from "@/lib/metadata";
import { normalizeSearch } from "@/lib/search";

export const metadata = buildMetadata({ ...pages.recomendados.meta, path: routes.recomendados });

export default function ProveedoresPage() {
  const { search, filters, none, empty } = proveedoresPage;
  const items = proveedores.map((proveedor, i) => ({
    slug: proveedor.slug,
    category: proveedor.category,
    search: normalizeSearch(
      [
        proveedor.name,
        proveedorMeta(proveedor),
        proveedor.location,
        proveedor.highlight,
        ...(proveedor.description ?? []),
        ...proveedor.whyWeChooseIt,
        ...(proveedor.ourView ?? []),
      ].join(" "),
    ),
    node: <ProveedorCard key={proveedor.slug} proveedor={proveedor} preload={i < 3} />,
  }));

  return (
    <div className="shell pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <ProveedoresIntro />
      <div className="mt-20 lg:mt-28">
        <ProveedoresExplorer
          items={items}
          categories={proveedorCategories.map(({ id, label }) => ({ id, label }))}
          labels={{ ...search, all: filters.all, filters: filters.label, none, empty }}
        />
      </div>
    </div>
  );
}
