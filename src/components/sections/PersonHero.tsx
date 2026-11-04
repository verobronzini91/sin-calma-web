import type { ImageAsset } from "@/content/types";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PersonHeroProps = {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  image: ImageAsset;
};

/** Hero personal: retrato vertical protagonista + nombre en gran escala. */
export function PersonHero({ eyebrow, name, title, intro, image }: PersonHeroProps) {
  return (
    <section aria-labelledby="page-title" className="pt-8 pb-20 lg:pt-14 lg:pb-28">
      <div className="shell grid-editorial gap-y-10">
        <EditorialImage
          {...image}
          aspect="aspect-[4/5]"
          sizes="(min-width: 1024px) 40vw, 100vw"
          preload
          className="rise col-span-12 -mx-4 sm:col-span-8 sm:col-start-3 sm:mx-0 lg:order-2 lg:col-span-5 lg:col-start-8"
        />
        <div className="rise col-span-12 flex flex-col justify-end [--delay:150ms] lg:order-1 lg:col-span-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="page-title" className="mt-6 lg:mt-8">
            <span className="display-hero block">{name}</span>
            <span className="display-md mt-5 block italic">{title}</span>
          </h1>
          <p className="body-copy mt-8 max-w-lg text-ink-soft lg:mt-10">{intro}</p>
        </div>
      </div>
    </section>
  );
}
