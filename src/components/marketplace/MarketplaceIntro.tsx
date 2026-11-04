"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { marketplaceIntro } from "@/content/marketplace";

const STORAGE_KEY = "sincalma:marketplace-intro";
/** Respaldo si el navegador bloquea el almacenamiento: no se repite durante la misma navegación. */
let shownThisVisit = false;

function alreadySeen() {
  if (shownThisVisit) return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

function markSeen() {
  shownThisVisit = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, "seen");
  } catch {
    /* sin almacenamiento: alcanza con el respaldo en memoria */
  }
}

/**
 * Nota editorial de bienvenida al Marketplace. Aparece sólo la primera vez
 * (queda recordado en el navegador). Sin mail, sin descuentos.
 * Se cierra con la X, con el botón, con Escape o tocando fuera de la nota.
 * Para revisarlo otra vez: /marketplace?intro (lo muestra aunque ya se haya visto).
 */
export function MarketplaceIntro({ image }: { image?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { note, title, text, closing, cta } = marketplaceIntro;

  useEffect(() => {
    const dialog = ref.current;
    const forced = new URLSearchParams(window.location.search).has("intro");
    if (!dialog || (!forced && alreadySeen())) return;
    const timer = window.setTimeout(() => {
      markSeen();
      dialog.showModal();
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="marketplace-intro-title"
      onClick={(event) => event.target === event.currentTarget && close()}
      className="intro-dialog m-auto max-h-[86dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto bg-canvas p-0 text-ink backdrop:bg-ink/35"
    >
      <div className="relative px-6 pt-12 pb-9 sm:px-12 sm:pt-14 sm:pb-12">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-2 right-2 grid size-11 place-items-center text-ink-soft transition-colors hover:text-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <p className="script" style={{ "--script-size": "clamp(1.5rem,4.5vw,1.9rem)" } as CSSProperties}>
          {note}
        </p>
        <h2 id="marketplace-intro-title" className="portada-title mt-5 [--title-size:clamp(2rem,6vw,2.9rem)]">
          {title}
        </h2>
        <div className="body-copy mt-6 space-y-4 text-ink-soft">
          {text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {image && <div className="mt-8">{image}</div>}
        <div className="display-sm mt-7 border-t border-line pt-6 text-[clamp(1.2rem,3.6vw,1.45rem)]!">
          <p>{closing[0]}</p>
          <p className="italic">{closing[1]}</p>
        </div>
        <button
          type="button"
          onClick={close}
          className="group mt-8 inline-flex items-center gap-3 border-b border-current py-1 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors hover:text-ink-blue"
        >
          <span>{cta}</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </dialog>
  );
}
