import { closing } from "@/content/home";
import { cn } from "@/lib/cn";
import { CTA } from "@/components/ui/CTA";

export function Closing() {
  return (
    <section aria-labelledby="cierre-title" className="section-y overflow-hidden">
      <div className="shell">
        <h2 id="cierre-title" className="display-hero reveal uppercase leading-[0.98]">
          {closing.lines.map((line, i) => (
            <span
              key={line}
              className={cn("block", i === 1 && "pl-[18%] italic normal-case", i === 2 && "pl-[36%]")}
            >
              {line}{" "}
            </span>
          ))}
        </h2>

        <div className="reveal mt-14 flex flex-col gap-10 border-t border-line-strong pt-10 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <p className="lead max-w-md">{closing.subtext}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {closing.ctas.map((cta, i) => (
              <CTA key={cta.label} href={cta.href} variant={i === 0 ? "primary" : "secondary"}>
                {cta.label}
              </CTA>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
