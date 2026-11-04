/**
 * Obtiene la imagen principal de una página externa leyendo su metadata
 * Open Graph (`og:image:secure_url` → `og:image` → `twitter:image`).
 * Corre en el servidor; el resultado se cachea un día.
 *
 * Sólo devuelve imágenes de hosts habilitados en `images.remotePatterns`
 * (next.config.ts); si no hay imagen o falla la red, devuelve `undefined`
 * y quien la usa muestra su fallback.
 */

const REVALIDATE_SECONDS = 60 * 60 * 24;

/** Debe coincidir con `images.remotePatterns` en next.config.ts. */
const ALLOWED_HOSTS = [/(^|\.)mitiendanube\.com$/, /(^|\.)calmashoes\.com$/];

const META_KEYS = ["og:image:secure_url", "og:image", "twitter:image"];

function readMeta(html: string, key: string) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const name = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (name?.toLowerCase() !== key) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1];
    if (content) return content.replace(/&amp;/g, "&");
  }
  return undefined;
}

/** Tiendanube sirve la og:image a 640px; pide la versión de 1024 si existe. */
async function largerTiendanube(url: URL) {
  if (!/mitiendanube\.com$/.test(url.hostname)) return url;
  const bigger = new URL(url);
  bigger.pathname = url.pathname.replace(/-\d+-0(\.\w+)$/, "-1024-1024$1");
  if (bigger.pathname === url.pathname) return url;
  try {
    const res = await fetch(bigger, { method: "HEAD", next: { revalidate: REVALIDATE_SECONDS } });
    return res.ok ? bigger : url;
  } catch {
    return url;
  }
}

export async function getOgImage(pageUrl: string): Promise<string | undefined> {
  try {
    const res = await fetch(pageUrl, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; SinCalmaBot/1.0; +https://sincalmanohayboda.com)" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return undefined;
    const html = await res.text();

    const raw = META_KEYS.map((key) => readMeta(html, key)).find(Boolean);
    if (!raw) return undefined;

    const url = new URL(raw, pageUrl);
    url.protocol = "https:";
    if (!ALLOWED_HOSTS.some((host) => host.test(url.hostname))) return undefined;

    return (await largerTiendanube(url)).toString();
  } catch {
    return undefined;
  }
}
