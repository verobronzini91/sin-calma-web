import { InkDefs } from "@/components/home/Ink";
import {
  NosCierre,
  NosCreamos,
  NosHero,
  NosHistoria,
  NosMantra,
  NosMiradas,
  NosMujerCalma,
  NosNumeros,
  NosVinculo,
} from "@/components/nosotras/NosotrasSections";
import { routes } from "@/content/navigation";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...pages.nosotras.meta, path: routes.nosotras });

export default function NosotrasPage() {
  return (
    <>
      <InkDefs />
      <NosHero />
      <NosHistoria />
      <NosNumeros />
      <NosCreamos />
      <NosMujerCalma />
      <NosMantra />
      <NosVinculo />
      <NosMiradas />
      <NosCierre />
    </>
  );
}
