import type { TitleLine } from "@/content/types";
import { cn } from "@/lib/cn";
import { DisplayTitle } from "./DisplayTitle";

type SectionHeadingProps = {
  eyebrow: string;
  title: TitleLine[];
  /** Numeración editorial opcional, ej: "02" */
  index?: string;
  id?: string;
  as?: "h1" | "h2";
  size?: "xl" | "lg" | "md";
  tone?: "dark" | "light";
  className?: string;
};

export function Eyebrow({ index, children, tone = "dark", className }: { index?: string; children: string; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tone === "dark" ? "text-muted" : "text-stone", className)}>
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({ eyebrow, title, index, id, as = "h2", size = "lg", tone = "dark", className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Eyebrow index={index} tone={tone}>
        {eyebrow}
      </Eyebrow>
      <DisplayTitle lines={title} as={as} size={size} id={id} className="mt-6 lg:mt-8" />
    </div>
  );
}
