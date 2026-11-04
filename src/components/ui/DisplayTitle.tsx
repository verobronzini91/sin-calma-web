import type { TitleLine } from "@/content/types";
import { cn } from "@/lib/cn";

type DisplayTitleProps = {
  lines: TitleLine[];
  as?: "h1" | "h2" | "h3" | "p";
  size?: "hero" | "xl" | "lg" | "md";
  id?: string;
  className?: string;
};

const sizes = {
  hero: "display-hero",
  xl: "display-xl",
  lg: "display-lg",
  md: "display-md",
};

/** Titular editorial en líneas, con acento en itálica. */
export function DisplayTitle({ lines, as: Tag = "h2", size = "lg", id, className }: DisplayTitleProps) {
  return (
    <Tag id={id} className={cn(sizes[size], "uppercase", className)}>
      {lines.map((line, i) => {
        const { text, italic } = typeof line === "string" ? { text: line, italic: false } : line;
        return (
          <span key={i} className={cn("block", italic && "italic normal-case")}>
            {text}
            {i < lines.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}
