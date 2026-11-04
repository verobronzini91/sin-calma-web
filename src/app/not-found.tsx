import { CTA } from "@/components/ui/CTA";

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="shell">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="display-xl mt-6 uppercase">
          Esta página
          <span className="block italic normal-case">no existe (todavía).</span>
        </h1>
        <CTA href="/" variant="secondary" className="mt-12">
          Volver al inicio
        </CTA>
      </div>
    </section>
  );
}
