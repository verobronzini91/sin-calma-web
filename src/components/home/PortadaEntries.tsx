import type { ReactNode } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { portadaEntries, type PortadaEntry } from "@/content/portada";
import { cn } from "@/lib/cn";
import { TextLink } from "./PortadaLink";

function EntryText({ entry, accent, className }: { entry: PortadaEntry; accent?: ReactNode; className?: string }) {
  return (
    <div className={cn("reveal relative flex flex-col justify-center py-2", className)}>
      <h3 className="entry-title">
        <TextLink href={entry.href}>
          {entry.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </TextLink>
      </h3>
      <p className="caps-copy mt-4 max-w-[17.5rem] text-ink-soft lg:mt-5">{entry.text}</p>
      {accent}
    </div>
  );
}

function EntryPhoto({ entry, className }: { entry: PortadaEntry; className?: string }) {
  return (
    <EditorialImage
      {...entry.image}
      aspect="aspect-[4/5] lg:aspect-auto lg:h-full"
      className={cn("reveal lg:h-full", className)}
      sizes="(min-width: 1024px) 34vw, 50vw"
    />
  );
}

/** Alto de fila: las fotos llenan el alto y los textos se centran en él. */
const row = "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:h-[min(34vw,38rem)] lg:gap-x-6";

/**
 * Grilla editorial compacta, reproducida de la maqueta aprobada:
 *   [foto 01][texto 01][foto 02][texto 02]
 *   [texto 03][foto 03][foto 04][texto 04]
 * Las columnas 3 y 4 coinciden en ambas filas; la 1 y la 2 alternan su ancho.
 */
export function PortadaEntries() {
  const [diario, planning, asesorias, proveedores] = portadaEntries;

  return (
    <section id="entradas" aria-labelledby="entradas-title" className="wide pt-6 lg:pt-8">
      <h2 id="entradas-title" className="sr-only">
        Por dónde empezar
      </h2>

      <div className="space-y-10 lg:space-y-6">
        <div className={cn(row, "lg:grid-cols-[400fr_290fr_340fr_252fr]")}>
          <EntryPhoto entry={diario} />
          <EntryText entry={diario} className="lg:pl-2" />
          <EntryPhoto entry={planning} />
          <EntryText entry={planning} />
        </div>

        <div className={cn(row, "lg:grid-cols-[250fr_440fr_340fr_252fr]")}>
          <EntryText entry={asesorias} className="lg:pl-3" />
          <EntryPhoto entry={asesorias} />
          <EntryPhoto entry={proveedores} />
          <EntryText entry={proveedores} />
        </div>
      </div>
    </section>
  );
}
