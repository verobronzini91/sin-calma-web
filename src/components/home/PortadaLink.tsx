import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { isExternal, newTabProps } from "@/lib/links";

/**
 * CTA de la Home: texto en versalitas subrayado + flecha larga y fina.
 * `newTab` abre enlaces externos en otra pestaña.
 */
export function PortadaLink({ cta, className, newTab = false }: { cta: NavLink; className?: string; newTab?: boolean }) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-ink-blue",
    className,
  );
  const content = (
    <>
      <span className="border-b border-current pb-0.5">{cta.label}</span>
      <span
        aria-hidden="true"
        className="relative h-px w-12 bg-current transition-[width] duration-300 group-hover:w-16 after:absolute after:-top-[3px] after:right-0 after:size-[7px] after:rotate-45 after:border-t after:border-r after:border-current"
      />
    </>
  );

  return isExternal(cta.href) || cta.href.startsWith("#") ? (
    <a
      href={cta.href}
      className={classes}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : newTabProps(cta.href))}
    >
      {content}
    </a>
  ) : (
    <Link href={cta.href} className={classes}>
      {content}
    </Link>
  );
}

/**
 * Enlace que se lee como texto editorial (títulos): sin subrayado ni fondo,
 * sólo un leve cambio de color al pasar el mouse.
 */
export function TextLink({
  href,
  children,
  className,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
}) {
  const classes = cn("transition-colors duration-300 hover:text-ink-blue", className);
  return isExternal(href) || href.startsWith("#") ? (
    <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : newTabProps(href))}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
