"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Oculta el header/footer globales en `/`: la Home los monta dentro de su página. */
export function HideOnHome({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : children;
}
