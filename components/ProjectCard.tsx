import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-steel-800 rounded-2xl overflow-hidden border border-steel-700 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-brand-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {project.name}
        </h3>
        <p className="text-steel-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-steel-500 text-xs">
            {formatDate(project.created_at)}
          </span>
          <Link
            href={`/proyectos/${project.id}`}
            className="flex items-center gap-1 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
          >
            Ver más <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
