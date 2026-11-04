import Link from "next/link";
import { legalPlaceholders, mainNav } from "@/content/navigation";
import { instagramUrl, portadaFooter } from "@/content/portada";
import { site } from "@/content/site";
import { isExternal, newTabProps } from "@/lib/links";
import { NewsletterForm } from "./NewsletterForm";

const linkClass = "text-[0.62rem] font-medium uppercase tracking-[0.16em] transition-colors hover:text-ink-blue";

/** Footer del sitio (el mismo en todas las páginas): una línea con la navegación global y, debajo, la newsletter y los legales. */
export function PortadaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell mt-14 lg:mt-16">
      <div className="flex flex-col gap-6 border-t border-ink py-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="font-serif text-lg font-medium uppercase tracking-[0.02em]">
          {site.wordmark}
        </Link>

        <nav aria-label="Pie de página" className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {mainNav.map((link) =>
            isExternal(link.href) ? (
              <a key={link.href} href={link.href} {...newTabProps(link.href)} className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ),
          )}
          <span aria-hidden="true" className="hidden h-5 w-px bg-ink/40 lg:block" />
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-ink-blue">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
        </nav>
      </div>

      <div className="flex flex-col gap-5 border-t border-line py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <p className="caps-copy">{portadaFooter.newsletter}</p>
          <NewsletterForm className="w-full sm:w-80" />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.68rem] text-muted">
          <span>
            © {year} {site.name}
          </span>
          {legalPlaceholders.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
