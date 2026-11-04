import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MoreNotas, NotaArticle, notaPath } from "@/components/notas/NotasSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNota, notas, relatedNotas } from "@/content/notas";
import { articleJsonLd } from "@/lib/article-jsonld";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return notas.map((nota) => ({ slug: nota.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nota = getNota((await params).slug);
  if (!nota) return {};
  const base = buildMetadata({ title: nota.title, description: nota.excerpt, path: notaPath(nota.slug) });
  const images = [{ url: nota.cover.src, width: nota.cover.width, height: nota.cover.height, alt: nota.title }];
  return {
    ...base,
    authors: nota.author ? [{ name: nota.author }] : undefined,
    openGraph: { ...base.openGraph, type: "article", publishedTime: nota.date, section: nota.category, images },
    twitter: { ...base.twitter, images },
  };
}

export default async function NotaPage({ params }: Props) {
  const nota = getNota((await params).slug);
  if (!nota) notFound();

  return (
    <>
      <NotaArticle nota={nota} />
      <MoreNotas notas={relatedNotas(nota)} />
      <JsonLd data={articleJsonLd(nota, notaPath(nota.slug))} />
    </>
  );
}
