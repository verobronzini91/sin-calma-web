"use client";

import { Fragment, useId, useState, type ReactNode } from "react";

type Item = { slug: string; capsule: string; node: ReactNode };

/**
 * Filtro por cápsula + grilla del SHOP. Los productos llegan armados desde el servidor
 * (`node`); acá sólo se elige cuáles se ven. 3 columnas en desktop, 2 en mobile.
 * Las opciones del filtro salen de `marketplaceCapsules`.
 */
export function MarketplaceGrid({
  items,
  capsules,
  labels,
}: {
  items: Item[];
  capsules: { id: string; label: string }[];
  labels: { filter: string; all: string; empty: string };
}) {
  const id = useId();
  const [active, setActive] = useState("all");
  const visible = active === "all" ? items : items.filter((item) => item.capsule === active);

  return (
    <div className="mx-auto max-w-[64rem]">
      {/* Select nativo sin caja: se ve como una línea de texto y en mobile abre el selector del sistema */}
      <div className="flex items-center gap-2 text-[0.66rem] font-medium tracking-[0.2em] uppercase">
        <label htmlFor={id} className="text-muted">
          {labels.filter}
        </label>
        <div className="relative">
          <select
            id={id}
            value={active}
            onChange={(event) => setActive(event.target.value)}
            className="min-h-11 cursor-pointer appearance-none bg-transparent pr-5 [field-sizing:content] tracking-[0.2em] text-ink uppercase outline-offset-4 focus-visible:outline-1"
          >
            <option value="all">{labels.all}</option>
            {capsules.map((capsule) => (
              <option key={capsule.id} value={capsule.id}>
                {capsule.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 10 6"
            className="pointer-events-none absolute top-1/2 right-0 w-2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M1 1l4 4 4-4" />
          </svg>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 lg:mt-6">
        {visible.length === 0 ? (
          <p className="display-sm py-16 text-center text-ink-soft italic">{labels.empty}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-10 lg:gap-y-12">
            {visible.map((item) => (
              <Fragment key={item.slug}>{item.node}</Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
