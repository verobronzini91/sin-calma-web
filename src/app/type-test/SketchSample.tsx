/**
 * Ilustración de prueba en el estilo de la referencia `manuscrito-ilustracion`:
 * trazo único y muy fino, objetos apenas sugeridos, líneas que no cierran.
 */
export function SketchSample({ className }: { className?: string }) {
  const paths = [
    // lámpara colgante
    "M233 0 C233 24 232 48 233 72",
    "M228 72 C228 80 238 81 238 72",
    "M190 106 C200 89 263 87 277 106 C262 113 205 114 190 106",
    "M222 111 C221 124 244 125 244 111",
    // jarrón
    "M106 151 C116 146 136 146 145 151",
    "M110 152 C107 172 108 200 112 222 C119 227 135 227 140 222 C143 200 142 172 140 153",
    // flores caídas
    "M124 150 C120 120 104 99 84 104",
    "M84 104 C75 98 69 109 76 115 C81 121 93 116 90 107",
    "M131 150 C136 118 156 97 173 104",
    "M173 104 C183 99 189 111 182 117 C176 122 167 116 170 109 C166 118 160 120 157 113",
    "M127 132 C120 127 116 128 113 133",
    // mesa (incompleta)
    "M20 231 C120 222 220 211 316 196",
    "M316 196 L320 207",
    "M26 236 L23 258",
    // respaldo de silla
    "M252 196 C250 160 262 146 280 146 C298 146 309 160 308 194",
    "M263 190 L263 161",
    "M296 188 L296 160",
  ];

  return (
    <svg viewBox="0 0 320 260" aria-hidden="true" className={`ink-sketch ${className ?? ""}`}>
      <g fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
