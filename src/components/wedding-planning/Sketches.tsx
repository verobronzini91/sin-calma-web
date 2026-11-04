import type { ComponentProps } from "react";
import { Drawing } from "@/components/home/Ink";

/**
 * Dibujos del recorrido de Wedding Planning, en el mismo trazo de birome que la Home:
 * objetos apenas sugeridos, líneas que no cierran.
 */
type SketchProps = Omit<ComponentProps<typeof Drawing>, "paths" | "viewBox">;

/** Un plano sobre papel y un lápiz apoyado. */
export function PlanSketch(props: SketchProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 200 170"
      paths={[
        "M28 34 C72 30 122 29 164 33 C166 66 167 100 170 130 C126 135 78 137 34 134 C32 101 30 68 29 38",
        "M48 54 C80 52 112 52 146 55",
        "M48 55 C48 76 49 98 51 116",
        "M98 54 C99 72 99 94 98 116",
        "M66 84 C66 78 78 77 79 84 C80 91 67 92 66 85",
        "M114 80 C114 74 126 74 127 80 C128 87 115 88 114 81",
        "M112 104 C120 101 132 101 142 104",
        "M118 158 L188 110",
        "M126 164 L194 117",
        "M118 158 C113 162 114 166 117 167 C120 167 123 166 126 164",
        "M188 110 C191 111 193 114 194 117",
      ]}
    />
  );
}

/** Una casa al costado del camino, con un árbol. */
export function HouseSketch(props: SketchProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 200 170"
      paths={[
        "M8 104 C62 101 138 101 196 106",
        "M38 102 C38 90 39 76 40 66",
        "M30 70 C46 58 60 48 73 38 C86 48 100 58 114 69",
        "M106 64 C106 78 106 90 105 102",
        "M64 102 C64 94 64 88 65 83 C68 78 76 78 78 83 C79 89 79 95 79 102",
        "M48 74 C52 73 56 73 59 74 C59 78 59 82 58 85",
        "M88 73 C92 72 95 72 98 73",
        "M66 106 C58 122 42 140 22 162",
        "M78 106 C94 124 118 142 146 162",
        "M152 102 C151 88 152 76 151 64",
        "M151 64 C134 62 129 44 142 37 C145 23 165 24 167 37 C181 43 175 62 154 63",
      ]}
    />
  );
}

/** Una mesa puesta bajo una lámpara colgante. */
export function TableSketch(props: SketchProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 200 170"
      paths={[
        "M100 2 C100 12 101 22 100 30",
        "M86 31 C94 27 108 27 115 31 C119 38 122 44 125 50 C108 54 92 54 76 50 C79 43 82 37 85 33",
        "M96 60 C98 62 102 62 104 60",
        "M16 114 C74 109 132 109 188 114",
        "M32 116 C31 132 30 146 28 162",
        "M172 116 C173 132 175 146 177 162",
        "M46 108 C48 100 84 99 88 107",
        "M58 106 C62 103 74 103 78 106",
        "M120 107 C119 98 118 90 118 84 C124 82 131 82 136 84 C135 92 134 100 133 107",
        "M118 92 C124 91 130 91 135 92",
        "M154 108 C151 98 152 92 156 88 C159 92 162 98 160 108",
        "M156 88 C154 76 148 68 141 63",
        "M150 74 C144 72 141 76 140 80 C145 80 149 78 150 74",
      ]}
    />
  );
}

/** Un clipboard con la lista del día. */
export function ClipboardSketch(props: SketchProps) {
  return (
    <Drawing
      {...props}
      viewBox="0 0 200 170"
      paths={[
        "M52 26 C82 24 120 24 150 27 C152 66 152 110 151 156 C116 158 82 158 50 156 C48 112 49 68 51 30",
        "M82 27 C82 22 84 18 86 16 C96 12 106 12 115 16 C117 19 118 23 118 27",
        "M94 16 C96 13 104 13 106 16",
        "M66 58 C68 61 70 63 72 65 C76 59 80 53 84 48",
        "M94 58 C108 56 122 57 136 59",
        "M66 88 C68 91 70 93 72 95 C76 89 80 83 84 78",
        "M94 88 C106 86 118 87 132 89",
        "M66 118 C71 116 77 116 82 118",
        "M94 118 C104 116 116 117 128 119",
        "M168 150 C172 132 176 112 182 90",
        "M182 90 C176 84 184 76 188 84 C192 92 182 96 182 90",
      ]}
    />
  );
}
