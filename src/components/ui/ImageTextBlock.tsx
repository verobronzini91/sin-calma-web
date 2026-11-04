import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { EditorialImage } from "./EditorialImage";

type ImageTextBlockProps = {
  image: ImageAsset;
  /** Imagen secundaria opcional que se superpone en desktop. */
  detail?: ImageAsset;
  children: ReactNode;
  /** Ubicación de la imagen en desktop. */
  imageSide?: "left" | "right";
  aspect?: string;
  className?: string;
};

/** Bloque asimétrico imagen grande + texto. En mobile la imagen va primero. */
export function ImageTextBlock({
  image,
  detail,
  children,
  imageSide = "left",
  aspect = "aspect-[4/5] sm:aspect-[4/3]",
  className,
}: ImageTextBlockProps) {
  const imageLeft = imageSide === "left";

  return (
    <div className={cn("grid-editorial gap-y-12", className)}>
      <div
        className={cn(
          "relative col-span-12 lg:col-span-7",
          imageLeft ? "lg:col-start-1" : "lg:order-2 lg:col-start-6",
        )}
      >
        <EditorialImage {...image} aspect={aspect} sizes="(min-width: 1024px) 58vw, 100vw" />
        {detail && (
          <EditorialImage
            {...detail}
            aspect="aspect-[3/4]"
            sizes="(min-width: 1024px) 18vw, 40vw"
            className={cn(
              "absolute -bottom-10 w-[38%] border-[6px] border-canvas sm:w-[30%] sm:border-[10px] lg:-bottom-16",
              imageLeft ? "right-4 lg:-right-14" : "left-4 lg:-left-14",
            )}
          />
        )}
      </div>
      <div
        className={cn(
          "col-span-12 flex flex-col justify-end sm:col-span-10 lg:col-span-4",
          detail && "pt-6 lg:pt-0",
          imageLeft ? "lg:col-start-9" : "lg:order-1 lg:col-start-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
