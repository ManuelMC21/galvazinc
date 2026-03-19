"use client";

import { useState } from "react";
import {
  PlusCircle,
  Trash2,
  LogOut,
  Loader2,
  AlertCircle,
  FolderOpen,
  Zap,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { ContactInfo } from "@/lib/contact";
import { Message } from "@/lib/messages";
import UploadForm from "@/components/UploadForm";
import ContactEditor from "@/components/ContactEditor";
import MessagesViewer from "@/components/MessagesViewer";
import { formatDate } from "@/lib/utils";

interface AdminDashboardProps {
  initialProjects: Project[];
  initialContactInfo: ContactInfo;
  initialMessages: Message[];
  onLogout: () => void;
}

export default function AdminDashboard({
  initialProjects,
  initialContactInfo,
  initialMessages,
  onLogout,
}: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"list" | "new" | "contact" | "messages">("list");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const unreadCount = initialMessages.filter((m) => !m.read).length;

  const refreshProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      // silent
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;
    setDeletingId(id);
    setDeleteError("");
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Top bar */}
      <div className="bg-steel-800/80 backdrop-blur-md border-b border-steel-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-semibold">
              Galva<span className="text-brand-400">Zinc</span>
              <span className="text-steel-400 font-normal ml-2 text-sm">Admin</span>
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-steel-400 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-steel-700"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "list"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "bg-steel-800 text-steel-400 hover:text-white border border-steel-700"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Proyectos ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "new"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "bg-steel-800 text-steel-400 hover:text-white border border-steel-700"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Nuevo proyecto
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "contact"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "bg-steel-800 text-steel-400 hover:text-white border border-steel-700"
            }`}
          >
            <Phone className="w-4 h-4" />
            Info de contacto
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "messages"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "bg-steel-800 text-steel-400 hover:text-white border border-steel-700"
            }`}
          >
            <Mail className="w-4 h-4" />
            Mensajes
            {unreadCount > 0 && (
              <span className="bg-brand-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Project List */}
        {activeTab === "list" && (
          <div>
            {deleteError && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm mb-6">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {deleteError}
              </div>
            )}

            {projects.length === 0 ? (
              <div className="text-center py-24 bg-steel-800/50 rounded-2xl border border-steel-700">
                <FolderOpen className="w-12 h-12 text-steel-600 mx-auto mb-4" />
                <p className="text-steel-400 font-medium mb-2">No hay proyectos todavía</p>
                <button
                  onClick={() => setActiveTab("new")}
                  className="text-brand-400 hover:text-brand-300 text-sm transition-colors"
                >
                  Crear el primero →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-steel-800 border border-steel-700 rounded-2xl overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={project.image_url}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-900/60 to-transparent" />
                      <span className="absolute top-3 left-3 bg-brand-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-semibold mb-1 line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-steel-400 text-xs mb-4">
                        {formatDate(project.created_at)}
                      </p>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 disabled:opacity-50 text-sm transition-colors"
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New Project Form */}
        {activeTab === "new" && (
          <div className="max-w-2xl">
            <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
              <h2 className="text-white font-bold text-xl mb-6">
                Nuevo proyecto
              </h2>
              <UploadForm
                onSuccess={() => {
                  refreshProjects();
                  setActiveTab("list");
                }}
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        {activeTab === "contact" && (
          <div>
            <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-bold text-xl">Información de contacto</h2>
              </div>
              <p className="text-steel-400 text-sm mb-8">
                Los cambios se reflejarán automáticamente en la página de contacto del sitio.
              </p>
              <ContactEditor initialData={initialContactInfo} />
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div>
            <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
              <h2 className="text-white font-bold text-xl mb-2">Mensajes recibidos</h2>
              <p className="text-steel-400 text-sm mb-8">
                Mensajes enviados desde el formulario de contacto del sitio.
              </p>
              <MessagesViewer initialMessages={initialMessages} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
