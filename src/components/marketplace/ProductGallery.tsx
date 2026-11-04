"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { cn } from "@/lib/cn";

/** Distancia mínima (px) de un deslizamiento para pasar de foto */
const SWIPE = 40;

/**
 * Galería de la ficha: una foto grande por vez. Las fotos están apiladas y sólo se ve
 * la actual (fundido corto); se cambia con las flechas, con ← → del teclado o
 * deslizando en mobile. Abajo, el contador. Las fotos llegan armadas desde el servidor.
 */
export function ProductGallery({
  slides,
  labels,
  frameClassName,
}: {
  slides: ReactNode[];
  labels: { prev: string; next: string };
  /** Proporción / alto del marco de la foto */
  frameClassName: string;
}) {
  const [current, setCurrent] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const total = slides.length;

  const go = (index: number) => setCurrent((index + total) % total);

  const onTouchStart = (event: TouchEvent) => {
    const t = event.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || total < 2) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    // Sólo deslizamientos horizontales: el scroll vertical de la página sigue igual
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(t.clientY - start.y)) go(current + (dx < 0 ? 1 : -1));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(current + 1);
    if (event.key === "ArrowLeft") go(current - 1);
  };

  return (
    <div className="rise" aria-roledescription="carrusel" onKeyDown={onKeyDown}>
      <div
        className={cn("relative touch-pan-y overflow-hidden select-none", frameClassName)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-roledescription="foto"
            aria-label={`${i + 1} / ${total}`}
            aria-hidden={i !== current}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              i === current ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {slide}
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p aria-live="polite" className="text-[0.7rem] font-medium tracking-[0.18em] text-muted tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label={labels.prev}
              className="grid size-11 place-items-center text-ink-soft transition-colors hover:text-ink"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label={labels.next}
              className="grid size-11 place-items-center text-ink-soft transition-colors hover:text-ink"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
