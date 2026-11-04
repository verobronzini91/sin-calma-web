import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProveedorDetail, proveedorMeta, proveedorPath } from "@/components/proveedores/ProveedoresSections";
import { getProveedor, proveedores } from "@/content/proveedores";
import { resolveImage } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return proveedores.map((proveedor) => ({ slug: proveedor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const proveedor = getProveedor((await params).slug);
  if (!proveedor) return {};
  const base = buildMetadata({
    title: `${proveedor.name} · ${proveedorMeta(proveedor)}`,
    description: proveedor.highlight,
    path: proveedorPath(proveedor.slug),
  });
  // La portada es la imagen al compartir el link
  const cover = resolveImage(proveedor.coverImage.src);
  if (!cover) return base;
  const images = [{ url: cover, alt: proveedor.coverImage.alt }];
  return { ...base, openGraph: { ...base.openGraph, images }, twitter: { ...base.twitter, images } };
}

export default async function ProveedorPage({ params }: Props) {
  const proveedor = getProveedor((await params).slug);
  if (!proveedor) notFound();
  return <ProveedorDetail proveedor={proveedor} />;
}
