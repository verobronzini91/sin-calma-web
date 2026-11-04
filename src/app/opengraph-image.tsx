import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen social genérica. Reemplazable por una foto editorial (opengraph-image.jpg). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#1b1a17",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: "#5a5248" }}>
          Bodas · Eventos · Experiencias
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.95, textTransform: "uppercase" }}>
          <span>Sin calma</span>
          <span style={{ paddingLeft: 140 }}>no hay boda</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5a5248", borderTop: "1px solid #1b1a1740", paddingTop: 24 }}>
          <span>Cómo funciona. Cómo se ve. Cómo se siente.</span>
          <span>Vero & Clari</span>
        </div>
      </div>
    ),
    size,
  );
}
