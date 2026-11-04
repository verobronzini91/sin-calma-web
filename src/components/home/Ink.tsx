import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Ilustraciones a mano, en el lenguaje de la referencia `manuscrito-ilustracion`:
 * trazo único y muy fino (birome), objetos apenas sugeridos, líneas que no cierran.
 * El filtro `#ink-rough` (ver <InkDefs />) suma un temblor mínimo.
 * `pathLength=1` permite trazarlos con `.ink-draw` (scroll) o `.ink-draw-load` (al cargar).
 * Color: `currentColor` — azul tinta sobre blanco, blanco sobre foto.
 */

/** `onPhoto`: trazo blanco para ir sobre fotografía. `still`: sin animación de trazo, siempre visible. */
type InkProps = { className?: string; onLoad?: boolean; onPhoto?: boolean; still?: boolean };

/** Filtro compartido: se monta una sola vez por página. */
export function InkDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export function Drawing({
  paths,
  viewBox,
  className,
  onLoad,
  onPhoto,
  still,
  strokeWidth = 0.85,
}: InkProps & { paths: string[]; viewBox: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      className={cn(
        "ink-sketch overflow-visible",
        onPhoto ? "text-white" : "text-ink-blue",
        !still && (onLoad ? "ink-draw-load" : "ink-draw"),
        className,
      )}
    >
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, i) => (
          <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" style={{ "--i": i } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}

/** Jarrón angosto con dos flores caídas y la línea de una mesa, sin cerrar. */
export function VaseSketch(props: InkProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 200 250"
      paths={[
        "M72 140 C82 135 104 135 113 140",
        "M76 141 C73 162 74 192 78 216 C85 221 101 221 106 216 C109 192 108 162 106 142",
        "M90 139 C86 104 66 80 42 86",
        "M42 86 C32 79 25 92 33 99 C39 106 53 100 49 90",
        "M97 139 C103 100 126 76 147 84",
        "M147 84 C159 78 166 92 158 100 C151 106 141 99 144 91 C139 101 132 104 129 96",
        "M93 118 C85 112 80 114 77 120",
        "M8 226 C70 220 130 214 196 205",
        "M14 231 L12 249",
      ]}
    />
  );
}

/** Una sola flor con tallo largo y una hoja, apenas sugerida. */
export function FlowerSketch(props: InkProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 80 200"
      paths={[
        "M42 198 C40 160 36 110 44 52",
        "M44 52 C34 46 28 58 35 64 C40 70 52 66 49 56",
        "M44 52 C50 40 62 44 58 54 C55 62 46 60 46 54",
        "M41 128 C30 118 22 120 18 128 C26 132 34 132 41 128",
      ]}
    />
  );
}

/** Flecha de un gesto. */
export function Arrow(props: InkProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 120 60"
      strokeWidth={1}
      paths={["M4 34 C30 24 66 40 112 30", "M99 23 C104 26 109 28 113 30 C108 34 104 38 101 44"]}
    />
  );
}

/** Subrayado en dos pasadas. */
export function Underline(props: InkProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 240 16"
      strokeWidth={1.1}
      paths={["M2 9 C44 4 92 12 140 7 C176 4 212 5 237 8", "M14 13 C64 9 128 14 204 10"]}
    />
  );
}
