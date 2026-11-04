import { howItWorks } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks({ index }: { index?: string }) {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="section-y">
      <div className="shell">
        <div className="grid-editorial gap-y-14">
          <SectionHeading
            index={index}
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            id="como-funciona-title"
            className="reveal col-span-12 lg:col-span-4"
          />

          <ol className="col-span-12 grid gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {howItWorks.steps.map((step, i) => (
              <li key={step} className="reveal flex gap-6 border-t border-line-strong py-7 sm:block sm:pb-12">
                <span aria-hidden="true" className="font-serif text-4xl font-light text-clay tabular-nums sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="lead sm:mt-6">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="display-lg reveal mt-20 border-y border-line py-14 text-center lg:mt-28 lg:py-20">
          <span className="block">{howItWorks.highlight[0]} </span>
          <span className="block italic">{howItWorks.highlight[1]}</span>
        </p>
      </div>
    </section>
  );
}
