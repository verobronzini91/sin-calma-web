import { JsonLd } from "@/components/seo/JsonLd";

type FaqItem = { question: string; answer: string };

/**
 * Preguntas frecuentes en acordeón con <details>: las respuestas quedan en el
 * HTML aunque estén cerradas, funciona sin JS y se acompaña de FAQPage.
 */
export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.replace(/\n\n/g, " ") },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="section-y">
      <JsonLd data={jsonLd} />
      <div className="shell grid-editorial gap-y-10">
        <h2 id="faq-title" className="display-md col-span-12 lg:col-span-4">
          {title}
        </h2>
        <div className="col-span-12 border-t border-line lg:col-span-7 lg:col-start-6">
          {items.map((item) => (
            <details key={item.question} className="faq-item group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 transition-colors hover:text-ink-blue lg:py-9">
                <h3 className="display-sm">{item.question}</h3>
                {/* + que se convierte en – al abrir */}
                <span aria-hidden="true" className="relative size-3 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              {/* Un párrafo por bloque separado con "\n\n" */}
              <div className="body-copy max-w-xl space-y-4 pb-9 text-ink-soft lg:pb-11">
                {item.answer.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
