import type { ImageAsset, TitleLine } from "@/content/types";
import { cn } from "@/lib/cn";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Composición fija de la galería: pares asimétricos (máx. 2 fotos por fila)
 * y cierre panorámico. Cada posición define proporción y ancho.
 */
const slots = [
  { className: "col-span-12 lg:col-span-8", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 62vw, 100vw" },
  { className: "col-span-8 col-start-5 lg:col-span-4 lg:col-start-9 lg:self-end", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, 66vw" },
  { className: "col-span-8 lg:col-span-4 lg:col-start-2", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, 66vw" },
  { className: "col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-32", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 46vw, 100vw" },
  { className: "col-span-12 lg:col-span-7", aspect: "aspect-[3/2]", sizes: "(min-width: 1024px) 54vw, 100vw" },
  { className: "col-span-8 col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-24", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, 66vw" },
  { className: "col-span-12", aspect: "aspect-[4/3] sm:aspect-[2/1]", sizes: "100vw" },
];

type EditorialGalleryProps = {
  eyebrow: string;
  title: TitleLine[];
  images: ImageAsset[];
  id?: string;
};

export function EditorialGallery({ eyebrow, title, images, id = "galeria" }: EditorialGalleryProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow={eyebrow} title={title} id={`${id}-title`} className="reveal" />
        <div className="grid-editorial mt-14 items-start gap-y-10 lg:mt-20 lg:gap-y-16">
          {images.slice(0, slots.length).map((image, i) => {
            const slot = slots[i];
            return (
              <EditorialImage
                key={i}
                {...image}
                aspect={slot.aspect}
                sizes={slot.sizes}
                className={cn("reveal", slot.className)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
