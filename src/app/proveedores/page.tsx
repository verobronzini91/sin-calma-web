import { ComingSoon } from "@/components/sections/ComingSoon";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PageHero } from "@/components/sections/PageHero";
import { ProvidersSection } from "@/components/sections/ProvidersSection";
import { routes } from "@/content/navigation";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/metadata";

const page = pages.proveedores;

export const metadata = buildMetadata({ ...page.meta, path: routes.proveedores });

export default function ProveedoresPage() {
  return (
    <>
      <PageHero {...page.hero} />
      <ProvidersSection showCta={false} />
      <HowItWorks />
      <ComingSoon
        id="sumate"
        eyebrow="Sumate"
        title="Muy pronto vas a poder presentar tu propuesta."
        text="Estamos preparando el espacio para que proveedores, espacios y experiencias puedan postularse. Cada propuesta se revisa por afinidad, identidad y calidad."
      />
    </>
  );
}
