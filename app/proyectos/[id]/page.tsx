import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getProjectById, getAllProjects } from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await getProjectById(Number(params.id));
    if (!project) return { title: "Proyecto no encontrado" };
    return {
      title: project.name,
      description: project.description,
      openGraph: {
        images: [project.image_url],
      },
    };
  } catch {
    return { title: "Proyecto" };
  }
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  let project = null;
  try {
    project = await getProjectById(Number(params.id));
  } catch {
    // DB might not be configured
  }

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-steel-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-steel-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a proyectos
        </Link>

        {/* Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-steel-700">
          <Image
            src={project.image_url}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-brand-500/10 text-brand-300 border border-brand-500/20 rounded-full px-3 py-1 text-sm">
            <Tag className="w-3.5 h-3.5" />
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-steel-500 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(project.created_at)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          {project.name}
        </h1>

        {/* Description */}
        {project.description && (
          <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
            <h2 className="text-white font-semibold mb-4 text-lg">
              Descripción del proyecto
            </h2>
            <p className="text-steel-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-brand-500/10 to-steel-800 border border-brand-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-3">
            ¿Tienes un proyecto similar?
          </h3>
          <p className="text-steel-400 mb-6">
            Contáctanos para recibir una cotización personalizada.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/25"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </div>
  );
}
