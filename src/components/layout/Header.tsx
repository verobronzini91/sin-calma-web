import Link from "next/link";
import { site } from "@/content/site";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/80">
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
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
