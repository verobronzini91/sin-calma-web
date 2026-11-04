import { cn } from "@/lib/cn";

/** Bloque de párrafos de cuerpo con el aire de las páginas editoriales. */
export function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("body-copy space-y-5 text-ink-soft", className)}>
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** Titular de sección (h2) en la serif de la Home, una escala por debajo de los títulos de portada. */
export function SectionTitle({ id, children, className }: { id: string; children: string; className?: string }) {
  return (
    <h2 id={id} className={cn("entry-title", className)} style={{ fontSize: "clamp(1.85rem, 3.5vw, 3.4rem)" }}>
      {children}
    </h2>
  );
}
