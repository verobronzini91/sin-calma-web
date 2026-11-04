import Link from "next/link";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { EditorialImage } from "./EditorialImage";

type EditorialCardProps = {
  href: string;
  title: string;
  kicker?: string;
  excerpt?: string;
  image?: ImageAsset;
  /** Numeración tipo revista, ej: "N.º 03" */
  index?: string;
  /**
   * cover: mini portada (recomendados) · feature: nota destacada
   * default: imagen + título · text: índice tipográfico sin imagen
   */
  variant?: "cover" | "feature" | "default" | "text";
  aspect?: string;
  sizes?: string;
  className?: string;
};

/** Pieza editorial enlazada. Sin sombras ni bordes redondeados: imagen, tipografía y aire. */
export function EditorialCard({
  href,
  title,
  kicker,
  excerpt,
  image,
  index,
  variant = "default",
  aspect,
  sizes,
  className,
}: EditorialCardProps) {
  if (variant === "text") {
    return (
      <article className={cn("group border-t border-line-strong pt-5", className)}>
        <Link href={href} className="block">
          {kicker && <p className="eyebrow text-clay">{kicker}</p>}
          <h3 className="display-sm mt-3 transition-colors duration-300 group-hover:text-clay">{title}</h3>
          <span aria-hidden="true" className="eyebrow mt-5 inline-block text-muted transition-transform duration-300 group-hover:translate-x-1">
            Leer →
          </span>
        </Link>
      </article>
    );
  }

  const isCover = variant === "cover";
  const isFeature = variant === "feature";

  return (
    <article className={cn("group", className)}>
      <Link href={href} className="block">
        {isCover && (
          <div aria-hidden="true" className="eyebrow mb-3 flex items-center gap-3 text-muted">
            <span className="tabular-nums">{index}</span>
            <span className="h-px flex-1 bg-line-strong" />
            <span>Sin Calma</span>
          </div>
        )}
        {image && (
          <div className="overflow-hidden">
            <EditorialImage
              {...image}
              aspect={aspect ?? (isFeature ? "aspect-[4/5]" : "aspect-[3/4]")}
              sizes={sizes}
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className={cn(isFeature ? "mt-6" : "mt-4")}>
          {kicker && !isCover && <p className="eyebrow text-clay">{kicker}</p>}
          <h3
            className={cn(
              "transition-colors duration-300 group-hover:text-clay",
              isFeature ? "display-md mt-3" : isCover ? "display-sm" : "display-sm mt-2",
            )}
          >
            {title}
          </h3>
          {excerpt && <p className="body-copy mt-3 max-w-md text-muted">{excerpt}</p>}
        </div>
      </Link>
    </article>
  );
}
