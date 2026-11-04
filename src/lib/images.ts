import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png", ".avif"];

function fileExists(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}

/**
 * Devuelve la primera ruta de `/public` que existe.
 * Acepta una o varias rutas (la primera que exista gana) y prueba
 * extensiones alternativas: si el contenido pide `home-hero.jpg`
 * también sirve `home-hero.webp`, `.jpeg`, `.png` o `.avif`.
 * Se evalúa en el servidor (en build para páginas estáticas).
 */
export function resolveImage(src?: string | string[]): string | undefined {
  if (!src) return undefined;
  const candidates = Array.isArray(src) ? src : [src];

  for (const candidate of candidates) {
    if (/^https?:\/\//.test(candidate)) return candidate;
    if (fileExists(candidate)) return candidate;
    const base = candidate.replace(/\.[a-z0-9]+$/i, "");
    for (const ext of EXTENSIONS) {
      if (fileExists(base + ext)) return base + ext;
    }
  }
  return undefined;
}

/** Ruta esperada (la primera), sin `/images/`, para mostrarla en el placeholder. */
export function expectedFile(src?: string | string[]) {
  const first = Array.isArray(src) ? src[0] : src;
  return first?.replace(/^\/images\//, "");
}
