import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";

type ComingSoonProps = {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
};

/** Bloque sobrio para funcionalidades que llegan en próximas fases. */
export function ComingSoon({ id, eyebrow, title, text, children }: ComingSoonProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="section-y border-t border-line">
      <div className="shell grid-editorial gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="eyebrow mt-3 text-clay">Próximamente</p>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <h2 id={id ? `${id}-title` : undefined} className="display-md">
            {title}
          </h2>
          <p className="body-copy mt-6 max-w-xl text-ink-soft">{text}</p>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
