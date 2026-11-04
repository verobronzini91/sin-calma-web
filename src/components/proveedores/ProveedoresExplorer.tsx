"use client";

import { Fragment, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { normalizeSearch } from "@/lib/search";

type Item = { slug: string; category: string; search: string; node: ReactNode };

/**
 * Buscador + categorías + resultados. Las tarjetas llegan armadas desde el servidor (`node`);
 * acá sólo se elige cuáles se ven. Busca por nombre, categoría, zona y textos.
 */
export function ProveedoresExplorer({
  items,
  categories,
  labels,
}: {
  items: Item[];
  categories: { id: string; label: string }[];
  labels: { title: string; placeholder: string; label: string; all: string; filters: string; none: string; empty: string };
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const q = normalizeSearch(query);
  const visible = items.filter((item) => (active === "all" || item.category === active) && (!q || item.search.includes(q)));

  const chip = (value: string, label: string) => (
    <li key={value} className="shrink-0">
      <button
        type="button"
        aria-pressed={active === value}
        onClick={() => setActive(value)}
        className={cn(
          "min-h-11 border-b py-2 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors",
          active === value ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink",
        )}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label htmlFor={id} className="block text-center text-[0.72rem] font-medium tracking-[0.2em] uppercase">
          {labels.title}
        </label>
        <div className="relative mt-6 border-b border-ink/40 focus-within:border-ink">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-ink-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="8.5" cy="8.5" r="6" />
            <path d="M13 13l5 5" />
          </svg>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.label}
            className="h-12 w-full bg-transparent pr-2 pl-8 font-serif text-[1.15rem] outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:appearance-none"
          />
        </div>
      </div>

      {/* Mobile: tira horizontal que se desliza. Desktop: centradas en dos líneas. */}
      <ul
        aria-label={labels.filters}
        className="no-scrollbar -mx-4 mt-10 flex gap-6 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-auto lg:mt-12 lg:max-w-5xl lg:flex-wrap lg:justify-center lg:gap-x-7 lg:gap-y-1 lg:overflow-visible lg:px-0"
      >
        {chip("all", labels.all)}
        {categories.map((category) => chip(category.id, category.label))}
      </ul>

      <div aria-live="polite" className="mt-14 lg:mt-20">
        {items.length === 0 ? (
          <p className="py-10 text-center font-serif text-[1.2rem] text-ink-soft italic">{labels.none}</p>
        ) : visible.length === 0 ? (
          <p className="py-16 text-center font-serif text-[1.35rem] text-ink-soft italic">{labels.empty}</p>
        ) : (
          <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
            {visible.map((item) => (
              <Fragment key={item.slug}>{item.node}</Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
