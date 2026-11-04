import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternal, newTabProps } from "@/lib/links";

type CTAProps = {
  href: string;
  children: ReactNode;
  /** primary: sólido · secondary: borde fino · link: texto subrayado con flecha */
  variant?: "primary" | "secondary" | "link";
  /** `light` para usar sobre fondos oscuros */
  tone?: "dark" | "light";
  /** Abre en otra pestaña (los enlaces al Diario ya lo hacen solos) */
  newTab?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300";

const styles = {
  primary: {
    dark: "min-h-12 px-7 py-3.5 bg-ink text-ivory hover:bg-ink-soft",
    light: "min-h-12 px-7 py-3.5 bg-white text-ink hover:bg-stone-light",
  },
  secondary: {
    dark: "min-h-12 px-7 py-3.5 border border-ink text-ink hover:bg-ink hover:text-ivory",
    light: "min-h-12 px-7 py-3.5 border border-ivory/60 text-ivory hover:bg-white hover:text-ink",
  },
  link: {
    dark: "justify-start py-1 border-b border-current text-ink hover:text-clay",
    light: "justify-start py-1 border-b border-current text-ivory hover:text-stone",
  },
};

export function CTA({ href, children, variant = "primary", tone = "dark", newTab = false, className }: CTAProps) {
  const classes = cn(base, styles[variant][tone], className);
  const content = (
    <>
      <span>{children}</span>
      {variant === "link" && (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : newTabProps(href))}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
