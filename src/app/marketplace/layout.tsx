import type { ReactNode } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { MarketplaceIntro } from "@/components/marketplace/MarketplaceIntro";
import { marketplaceIntro } from "@/content/marketplace";

/** El pop-up vive en el layout: no se vuelve a montar al pasar entre fichas del marketplace. */
export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MarketplaceIntro
        image={<EditorialImage {...marketplaceIntro.image} aspect="aspect-[16/9]" sizes="(min-width: 640px) 480px, 92vw" />}
      />
    </>
  );
}
