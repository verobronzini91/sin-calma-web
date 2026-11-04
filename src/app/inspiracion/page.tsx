import { NotasLanding } from "@/components/notas/NotasSections";
import { routes } from "@/content/navigation";
import { notas, notasPage } from "@/content/notas";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ ...pages.inspiracion.meta, path: routes.inspiracion });

export default function NotasPage() {
  return (
    <div className="pt-10 pb-8 sm:pt-14 lg:pb-12">
      <h1 className="portada-title text-center [--title-size:clamp(1.9rem,3vw,2.75rem)]">{notasPage.title}</h1>
      <div className="mt-10 sm:mt-14">
        <NotasLanding notas={notas} />
      </div>
    </div>
  );
}
