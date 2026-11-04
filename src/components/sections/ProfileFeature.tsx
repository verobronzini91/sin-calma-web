import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { CTA } from "@/components/ui/CTA";
import { EditorialImage } from "@/components/ui/EditorialImage";

type ProfileFeatureProps = {
  name: string;
  role: string;
  text: string;
  cta: { label: string; href: string };
  image: ImageAsset;
  /** Lado del retrato en desktop */
  imageSide?: "left" | "right";
};

/** Presentación breve de una persona: retrato vertical + rol + texto corto + CTA. */
export function ProfileFeature({ name, role, text, cta, image, imageSide = "left" }: ProfileFeatureProps) {
  const left = imageSide === "left";
  const id = `perfil-${name.toLowerCase()}`;

  return (
    <article aria-labelledby={id} className="grid-editorial reveal items-center gap-y-10">
      <EditorialImage
        {...image}
        aspect="aspect-[4/5]"
        sizes="(min-width: 1024px) 38vw, 90vw"
        className={cn(
          "col-span-11 sm:col-span-8 lg:col-span-5",
          left ? "lg:col-start-1" : "col-start-2 sm:col-start-5 lg:order-2 lg:col-start-8",
        )}
      />
      <div className={cn("col-span-12 sm:col-span-9 lg:col-span-5", left ? "lg:col-start-8" : "lg:order-1 lg:col-start-2")}>
        <h2 id={id}>
          <span className="display-xl block">{name}</span>
          <span className="eyebrow mt-6 block text-clay">{role}</span>
        </h2>
        <p className="body-copy mt-6 max-w-md text-ink-soft">{text}</p>
        <CTA href={cta.href} variant="link" className="mt-9">
          {cta.label}
        </CTA>
      </div>
    </article>
  );
}
