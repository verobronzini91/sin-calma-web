"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Newsletter visual: todavía no hay servicio conectado, sólo confirma el gesto. */
export function NewsletterForm({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className={cn("script", className)}>
        Gracias. Muy pronto vas a recibir noticias nuestras.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={cn("flex items-end gap-4 border-b border-ink", className)}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Tu email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Tu email"
        className="min-h-10 w-full bg-transparent py-1.5 text-[0.85rem] placeholder:text-muted focus:outline-none"
      />
      <button type="submit" className="eyebrow min-h-10 shrink-0 transition-colors hover:text-ink-blue">
        Suscribirme →
      </button>
    </form>
  );
}
