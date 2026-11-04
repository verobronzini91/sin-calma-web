import Image, { getImageProps } from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { expectedFile, resolveImage } from "@/lib/images";

type EditorialImageProps = ImageAsset & {
  /** Clases de proporción de Tailwind, ej: "aspect-[4/5] lg:aspect-[5/4]". Evita layout shift. */
  aspect?: string;
  /** Atributo `sizes` de next/image para servir el tamaño justo. */
  sizes?: string;
  /** Sólo para la imagen principal sobre el pliegue (LCP). */
  preload?: boolean;
  caption?: string;
  className?: string;
  imageClassName?: string;
};

const MOBILE_QUERY = "(max-width: 639px)";

/**
 * Imagen editorial con proporción fija.
 * - Si existe el archivo de `src`: next/image (lazy, responsive, AVIF/WebP).
 * - Si además existe `mobileSrc`: <picture> con versión propia para mobile.
 * - Si no existe: placeholder tonal que indica qué archivo espera (u oculto si `optional`).
 */
export function EditorialImage({
  src,
  mobileSrc,
  alt,
  position,
  optional = false,
  tone = "stone",
  label,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
  caption,
  className,
  imageClassName,
}: EditorialImageProps) {
  const resolved = resolveImage(src);
  const resolvedMobile = resolved ? resolveImage(mobileSrc) : undefined;

  if (!resolved && optional) return null;

  const imgClass = cn(
    "object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]",
    imageClassName,
  );
  const imgStyle = position ? { objectPosition: position } : undefined;

  let media;
  if (resolved && resolvedMobile) {
    const common = { alt, fill: true, sizes, preload, fetchPriority: preload ? ("high" as const) : undefined };
    const {
      props: { srcSet: desktopSrcSet },
    } = getImageProps({ ...common, src: resolved });
    const {
      props: { srcSet: mobileSrcSet, ...rest },
    } = getImageProps({ ...common, sizes: "100vw", src: resolvedMobile });
    media = (
      <picture>
        <source media={MOBILE_QUERY} srcSet={mobileSrcSet} />
        <source srcSet={desktopSrcSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt viene de getImageProps */}
        <img {...rest} className={imgClass} style={{ ...rest.style, ...imgStyle }} />
      </picture>
    );
  } else if (resolved) {
    media = (
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        className={imgClass}
        style={imgStyle}
      />
    );
  } else {
    const file = expectedFile(src);
    media = (
      <div role="img" aria-label={alt} className="absolute inset-0">
        <span aria-hidden="true" className="absolute inset-3 border border-current opacity-15 sm:inset-4" />
        {(label || file) && (
          <span aria-hidden="true" className="absolute bottom-5 left-5 right-5 opacity-60 sm:bottom-6 sm:left-6">
            {label && <span className="eyebrow block">{label}</span>}
            {file && <span className="mt-1 block text-[0.68rem] tracking-wide break-all">{file}</span>}
          </span>
        )}
      </div>
    );
  }

  const frame = (
    <div className={cn("relative w-full overflow-hidden", aspect, !resolved && `ph ph-${tone}`)}>{media}</div>
  );

  if (!caption) return <div className={className}>{frame}</div>;

  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-3 text-[0.72rem] tracking-wide text-muted">{caption}</figcaption>
    </figure>
  );
}
