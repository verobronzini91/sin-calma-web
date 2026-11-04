import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EditorialGridProps = {
  children: ReactNode;
  as?: "div" | "ul" | "ol";
  className?: string;
  "aria-label"?: string;
};

/** Grilla editorial de 12 columnas. Los hijos definen su `col-span` / `col-start`. */
export function EditorialGrid({ children, as: Tag = "div", className, ...rest }: EditorialGridProps) {
  return (
    <Tag className={cn("grid-editorial", className)} {...rest}>
      {children}
    </Tag>
  );
}
