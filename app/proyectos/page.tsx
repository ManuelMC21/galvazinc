import type { Metadata } from "next";
import { getAllProjects } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES } from "@/lib/types";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Explora todos los proyectos de galvanizado realizados por GalvaZinc.",
};

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { categoria?: string; page?: string };
}) {
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  try {
    projects = await getAllProjects();
  } catch {
    // DB might not be configured yet
  }

  const ITEMS_PER_PAGE = 9;
  const activeCategory = searchParams.categoria ?? "Todos";
  const currentPage = Math.max(1, parseInt(searchParams.page ?? "1"));

  const filtered =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  function buildUrl(page: number, cat: string) {
    const p = new URLSearchParams();
    if (cat !== "Todos") p.set("categoria", cat);
    if (page > 1) p.set("page", page.toString());
    return `/proyectos${p.toString() ? "?" + p.toString() : ""}`;
  }

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-steel-800 to-steel-900 border-b border-steel-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6">
            <Layers className="w-4 h-4 text-brand-400" />
            <span className="text-brand-300 text-sm font-medium">Portafolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Nuestros proyectos
          </h1>
          <p className="text-steel-400 text-lg max-w-xl mx-auto">
            Más de 500 proyectos completados en diversas industrias y sectores
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["Todos", ...CATEGORIES].map((cat) => (
            <a
              key={cat}
              href={cat === "Todos" ? "/proyectos" : `/proyectos?categoria=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "bg-steel-800 text-steel-400 hover:text-white hover:bg-steel-700 border border-steel-700"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Count */}
        <p className="text-steel-500 text-sm mb-8">
          Mostrando{" "}
          <span className="text-brand-400 font-semibold">{filtered.length}</span>{" "}
          proyecto{filtered.length !== 1 ? "s" : ""}
          {totalPages > 1 && (
            <span className="text-steel-600">
              {" "}· página {safePage} de {totalPages}
            </span>
          )}
        </p>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-steel-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-steel-600" />
            </div>
            <p className="text-steel-400 text-lg font-medium mb-2">
              No hay proyectos en esta categoría
            </p>
            <p className="text-steel-600 text-sm">
              Pronto agregaremos más proyectos aquí.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <a
              href={buildUrl(safePage - 1, activeCategory)}
              aria-disabled={safePage <= 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                safePage <= 1
                  ? "bg-steel-800/40 text-steel-600 pointer-events-none"
                  : "bg-steel-800 text-steel-300 hover:text-white hover:bg-steel-700 border border-steel-700"
              }`}
            >
              ← Anterior
            </a>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={buildUrl(p, activeCategory)}
                className={`w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-all ${
                  p === safePage
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "bg-steel-800 text-steel-400 hover:text-white hover:bg-steel-700 border border-steel-700"
                }`}
              >
                {p}
              </a>
            ))}
            <a
              href={buildUrl(safePage + 1, activeCategory)}
              aria-disabled={safePage >= totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                safePage >= totalPages
                  ? "bg-steel-800/40 text-steel-600 pointer-events-none"
                  : "bg-steel-800 text-steel-300 hover:text-white hover:bg-steel-700 border border-steel-700"
              }`}
            >
              Siguiente →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
