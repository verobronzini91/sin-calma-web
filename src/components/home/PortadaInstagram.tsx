import { portadaInstagram } from "@/content/portada";
import { PortadaLink } from "./PortadaLink";

/** Novedades de Instagram: sólo el título y un enlace al perfil. */
export function PortadaInstagram() {
  const { title, cta } = portadaInstagram;

  return (
    <section aria-labelledby="instagram-title" className="wide mt-16 lg:mt-20">
      <h2 id="instagram-title" className="entry-title" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.3rem)" }}>
        {title}
      </h2>
      <PortadaLink cta={cta} newTab className="mt-3" />
    </section>
  );
}
