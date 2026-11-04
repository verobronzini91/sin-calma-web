import type { ImageAsset, TitleLine } from "@/content/types";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Eyebrow } from "@/components/ui/SectionHeading";

type WideHeroProps = {
  eyebrow: string;
  title: TitleLine[];
  lead: string;
  image: ImageAsset;
};

/** Hero con foto grande a todo el ancho del contenido (ej: /nosotras). */
export function WideHero({ eyebrow, title, lead, image }: WideHeroProps) {
  return (
    <section aria-labelledby="page-title" className="pt-10 pb-16 lg:pt-14 lg:pb-24">
      <div className="shell">
        <div className="rise grid-editorial items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayTitle as="h1" id="page-title" lines={title} size="hero" className="mt-6 lg:mt-8" />
          </div>
          <p className="lead col-span-12 text-ink-soft sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:pb-3">{lead}</p>
        </div>
        <EditorialImage
          {...image}
          aspect="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[2/1]"
          sizes="100vw"
          preload
          className="rise mt-10 -mx-4 [--delay:150ms] sm:mx-0 lg:mt-14"
        />
      </div>
    </section>
  );
}
