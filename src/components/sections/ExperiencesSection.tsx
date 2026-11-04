import { experiences } from "@/content/home";
import { CTA } from "@/components/ui/CTA";
import { ImageTextBlock } from "@/components/ui/ImageTextBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperiencesSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="experiencias-title" className="section-y">
      <div className="shell">
        <ImageTextBlock image={experiences.image} detail={experiences.detail} imageSide="left" className="reveal">
          <SectionHeading
            index={index}
            eyebrow={experiences.eyebrow}
            title={experiences.title}
            id="experiencias-title"
          />
          <p className="body-copy mt-8 max-w-sm text-ink-soft">{experiences.text}</p>
          <div className="mt-10 flex flex-col items-start gap-6">
            <CTA href={experiences.primary.href} variant="secondary">
              {experiences.primary.label}
            </CTA>
            <CTA href={experiences.secondary.href} variant="link">
              {experiences.secondary.label}
            </CTA>
          </div>
        </ImageTextBlock>
      </div>
    </section>
  );
}
