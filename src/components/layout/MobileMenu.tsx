"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { isActiveNav, mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { newTabProps } from "@/lib/links";

/**
 * Menú mobile sobre <dialog> nativo: foco atrapado, Escape y capa superior
 * resueltos por el navegador. Único componente cliente del layout.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="eyebrow -mr-2 flex min-h-11 items-center gap-3 px-2 text-ink"
      >
        <span>Menú</span>
        <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-2/3 self-end bg-current" />
        </span>
      </button>

      <dialog
        id="menu-mobile"
        ref={dialogRef}
        aria-label="Menú principal"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-ink/30"
      >
        <div className="shell flex min-h-full flex-col pb-10">
          <div className="flex h-16 items-center justify-between border-b border-line">
            <Link href="/" onClick={closeMenu} className="font-serif text-[1.05rem] font-medium uppercase tracking-[0.02em]">
              {site.wordmark}
            </Link>
            <button type="button" onClick={closeMenu} className="eyebrow -mr-2 min-h-11 px-2">
              Cerrar
            </button>
          </div>

          <nav aria-label="Principal" className="mt-10">
            <ul>
              {mainNav.map((item) => {
                const active = isActiveNav(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      {...newTabProps(item.href)}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                      className="flex items-baseline gap-5 py-4 transition-colors hover:text-clay"
                    >
                      <span className={active ? "display-md underline decoration-1 underline-offset-[0.2em]" : "display-md"}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="mt-auto pt-12 font-serif text-xl italic text-muted">{site.tagline}</p>
        </div>
      </dialog>
    </>
  );
}
