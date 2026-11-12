import { buildFeed } from "@/lib/recomendados-feed";

/**
 * GET /api/recomendados: feed público de solo lectura con los proveedores publicados en /recomendados.
 * Lo consume el Diario de Boda (una sola fuente de proveedores). Se genera en el build, como las páginas: al editar
 * src/content/proveedores.ts y publicar, el feed se actualiza solo.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildFeed(), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
