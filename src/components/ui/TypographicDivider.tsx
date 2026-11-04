import { cn } from "@/lib/cn";

/** Separador tipográfico: línea fina + palabra en serif itálica. Decorativo. */
export function TypographicDivider({ text, className }: { text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-5 text-muted", className)}>
      <span className="h-px flex-1 bg-line-strong" />
      <span className="font-serif text-xl italic">{text}</span>
      <span className="h-px flex-1 bg-line-strong" />
    </div>
  );
}
