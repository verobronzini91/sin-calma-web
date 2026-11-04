import Link from "next/link";
import { MainNav } from "@/components/layout/MainNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { site } from "@/content/site";

export function PortadaHeader() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-sm">
      <div className="shell flex h-14 items-center justify-between gap-6 lg:h-16">
        <Link
          href="/"
          aria-label={`${site.wordmark} — inicio`}
          className="shrink-0 font-serif text-[1.05rem] font-medium uppercase tracking-[0.02em] sm:text-[1.3rem]"
        >
          {site.wordmark}
        </Link>

        <MainNav />

        <div className="xl:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
