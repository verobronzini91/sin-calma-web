"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveNav, mainNav } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { newTabProps } from "@/lib/links";

/** Subrayado fino que aparece en hover y queda fijo en la sección actual */
const navLink =
  "relative whitespace-nowrap py-2 text-[0.64rem] font-medium uppercase tracking-[0.15em] after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

/** Menú principal de desktop: el mismo en la Home y en el resto del sitio. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className="hidden xl:block">
      <ul className="flex items-center gap-5 min-[1400px]:gap-7 2xl:gap-9">
        {mainNav.map((item) => {
          const active = isActiveNav(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(navLink, active ? "after:scale-x-100" : "after:scale-x-0")}
                {...newTabProps(item.href)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
