import { ComingSoon } from "@/components/sections/ComingSoon";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { routes } from "@/content/navigation";
import { experienceTypes, pages } from "@/content/pages";
import { buildMetadata } from "@/lib/metadata";

const page = pages.experiencias;

export const metadata = buildMetadata({ ...page.meta, path: routes.experiencias });

export default function ExperienciasPage() {
  return (
    <>
      <PageHero {...page.hero} />

      <section aria-labelledby="tipos-title" className="section-y border-t border-line">
        <div className="shell grid-editorial gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Lo que diseñamos</Eyebrow>
            <h2 id="tipos-title" className="display-lg mt-6 uppercase">
              No todo empieza en <span className="italic normal-case">una boda.</span>
            </h2>
          </div>
          <ol className="col-span-12 border-t border-line-strong lg:col-span-7 lg:col-start-6">
            {experienceTypes.map((type, i) => (
              <li key={type} className="reveal flex items-baseline gap-6 border-b border-line py-6">
                <span aria-hidden="true" className="eyebrow w-8 text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display-md">{type}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ComingSoon
        id="crear"
        eyebrow="Crear una experiencia"
        title="¿Tenés algo en mente que no es una boda?"
        text="Celebraciones, viajes, encuentros o proyectos especiales: muy pronto vas a poder contarnos tu idea desde acá."
      />
    </>
  );
}
