import { InkDefs } from "@/components/home/Ink";
import { PortadaEntries } from "@/components/home/PortadaEntries";
import { PortadaFooter } from "@/components/home/PortadaFooter";
import { PortadaHeader } from "@/components/home/PortadaHeader";
import { PortadaHero } from "@/components/home/PortadaHero";
import { PortadaInstagram } from "@/components/home/PortadaInstagram";
import { PortadaMarketplace } from "@/components/home/PortadaMarketplace";
import { PortadaNosotras } from "@/components/home/PortadaNosotras";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ path: "/" });

/** Home editorial: header y footer propios (los globales se ocultan en `/`). */
export default function HomePage() {
  return (
    <>
      <InkDefs />
      <PortadaHeader />
      <PortadaHero />
      <PortadaEntries />
      <PortadaMarketplace />
      <PortadaNosotras />
      <PortadaInstagram />
      <PortadaFooter />
    </>
  );
}
