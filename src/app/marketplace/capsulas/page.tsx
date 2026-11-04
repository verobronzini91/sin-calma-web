import { CapsuleBlock, CapsulesIntro, MarketplaceHeader } from "@/components/marketplace/MarketplaceSections";
import { marketplaceCapsules, marketplaceCapsulesIntro, marketplaceHeader } from "@/content/marketplace";
import { routes } from "@/content/navigation";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `${marketplaceHeader.nav.capsulas} · ${marketplaceHeader.title}`,
  description: marketplaceCapsulesIntro.text.join(" "),
  path: routes.marketplaceCapsulas,
});

/** CÁPSULAS: por qué nos unimos con cada marca. Una cápsula por bloque, alternando lados. */
export default function MarketplaceCapsulesPage() {
  return (
    <>
      <MarketplaceHeader active="capsulas" />
      <CapsulesIntro />
      {marketplaceCapsules.map((capsule, i) => (
        <CapsuleBlock key={capsule.slug} capsule={capsule} index={i} />
      ))}
    </>
  );
}
