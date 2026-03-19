"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { ContactInfo } from "@/lib/contact";

interface ContactEditorProps {
  initialData: ContactInfo;
}

export default function ContactEditor({ initialData }: ContactEditorProps) {
  const [data, setData] = useState<ContactInfo>(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setLogoError("El archivo debe ser una imagen");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("El logo no puede superar los 5 MB");
      return;
    }
    setLogoUploading(true);
    setLogoError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al subir");
      setData((d) => ({ ...d, logo_url: json.url }));
    } catch (err: unknown) {
      setLogoError(err instanceof Error ? err.message : "Error al subir el logo");
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const updateEmail = (i: number, val: string) =>
    setData((d) => ({ ...d, emails: d.emails.map((e, idx) => (idx === i ? val : e)) }));
  const removeEmail = (i: number) =>
    setData((d) => ({ ...d, emails: d.emails.filter((_, idx) => idx !== i) }));
  const addEmail = () =>
    setData((d) => ({ ...d, emails: [...d.emails, ""] }));

  const updatePhone = (i: number, val: string) =>
    setData((d) => ({ ...d, phones: d.phones.map((p, idx) => (idx === i ? val : p)) }));
  const removePhone = (i: number) =>
    setData((d) => ({ ...d, phones: d.phones.filter((_, idx) => idx !== i) }));
  const addPhone = () =>
    setData((d) => ({ ...d, phones: [...d.phones, ""] }));

  const updateSchedule = (i: number, val: string) =>
    setData((d) => ({ ...d, schedule: d.schedule.map((s, idx) => (idx === i ? val : s)) }));
  const removeSchedule = (i: number) =>
    setData((d) => ({ ...d, schedule: d.schedule.filter((_, idx) => idx !== i) }));
  const addSchedule = () =>
    setData((d) => ({ ...d, schedule: [...d.schedule, ""] }));

  const handleSave = async () => {
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <div className="space-y-8">

      {/* Logo */}
      <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
        <div className="mb-5">
          <h3 className="text-white font-semibold">Logo de la empresa</h3>
          <p className="text-steel-500 text-xs mt-0.5">
            Se muestra en la barra de navegación y el pie de página
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Preview */}
          <div className="w-48 h-24 bg-steel-800 border border-steel-600 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
            {data.logo_url ? (
              <Image
                src={data.logo_url}
                alt="Logo actual"
                width={192}
                height={96}
                className="max-h-full max-w-full object-contain p-2"
              />
            ) : (
              <ImageIcon className="w-10 h-10 text-steel-600" />
            )}
          </div>
          {/* Controls */}
          <div className="flex-1 space-y-3">
            <label className="inline-flex items-center gap-2 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-400 hover:text-brand-300 text-sm font-medium px-4 py-2.5 rounded-lg transition-all cursor-pointer">
              {logoUploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
              ) : (
                <><Upload className="w-4 h-4" /> Subir nuevo logo</>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                }}
                disabled={logoUploading}
              />
            </label>
            {data.logo_url && (
              <button
                onClick={() => setData((d) => ({ ...d, logo_url: "" }))}
                className="flex items-center gap-1.5 text-sm text-steel-400 hover:text-red-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Quitar logo (usar ícono por defecto)
              </button>
            )}
            {logoError && (
              <p className="text-red-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {logoError}
              </p>
            )}
            <p className="text-steel-600 text-xs">
              PNG, JPG, SVG o WebP · máximo 5 MB · se recomienda fondo transparente
            </p>
          </div>
        </div>
      </div>

      {/* 2-column grid for emails + phones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Emails */}
        <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Correos electrónicos</h3>
              <p className="text-steel-500 text-xs mt-0.5">Aparecen en la página de contacto</p>
            </div>
            <button
              onClick={addEmail}
              className="flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 hover:text-brand-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar
            </button>
          </div>
          <div className="space-y-2">
            {data.emails.map((email, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(i, e.target.value)}
                  placeholder="correo@galvazinc.com"
                  className="flex-1 bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                />
                <button
                  onClick={() => removeEmail(i)}
                  disabled={data.emails.length === 1}
                  className="p-2.5 text-steel-500 hover:text-red-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Phones */}
        <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Teléfonos</h3>
              <p className="text-steel-500 text-xs mt-0.5">Números de contacto visibles</p>
            </div>
            <button
              onClick={addPhone}
              className="flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 hover:text-brand-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar
            </button>
          </div>
          <div className="space-y-2">
            {data.phones.map((phone, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => updatePhone(i, e.target.value)}
                  placeholder="+53 5 123 4567"
                  className="flex-1 bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                />
                <button
                  onClick={() => removePhone(i)}
                  disabled={data.phones.length === 1}
                  className="p-2.5 text-steel-500 hover:text-red-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address + Schedule side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Address */}
        <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
          <div className="mb-4">
            <h3 className="text-white font-semibold">Dirección</h3>
            <p className="text-steel-500 text-xs mt-0.5">Ubicación física del negocio</p>
          </div>
          <input
            type="text"
            value={data.address}
            onChange={(e) => setData((d) => ({ ...d, address: e.target.value }))}
            placeholder="Calle Ejemplo #123, La Habana, Cuba"
            className="w-full bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
          />
        </div>

        {/* Schedule */}
        <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Horarios de atención</h3>
              <p className="text-steel-500 text-xs mt-0.5">Líneas de horario visibles</p>
            </div>
            <button
              onClick={addSchedule}
              className="flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 hover:text-brand-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar
            </button>
          </div>
          <div className="space-y-2">
            {data.schedule.map((line, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={line}
                  onChange={(e) => updateSchedule(i, e.target.value)}
                  placeholder="Lunes a Viernes: 8:00 – 18:00"
                  className="flex-1 bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
                />
                <button
                  onClick={() => removeSchedule(i)}
                  disabled={data.schedule.length === 1}
                  className="p-2.5 text-steel-500 hover:text-red-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
        <div className="mb-5">
          <h3 className="text-white font-semibold">Redes sociales</h3>
          <p className="text-steel-500 text-xs mt-0.5">
            Deja en blanco los que no uses — el icono aparecerá deshabilitado
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(
            [
              { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/galvazinc" },
              { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/galvazinc" },
              { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/galvazinc" },
            ] as const
          ).map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-steel-400 text-xs font-medium mb-1.5">{label}</label>
              <input
                type="url"
                value={data.social?.[key] ?? ""}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    social: { linkedin: "", facebook: "", instagram: "", ...d.social, [key]: e.target.value },
                  }))
                }
                placeholder={placeholder}
                className="w-full bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero / Portada */}
      <div className="bg-steel-700/40 border border-steel-600/50 rounded-xl p-6">
        <div className="mb-5">
          <h3 className="text-white font-semibold">Portada del sitio</h3>
          <p className="text-steel-500 text-xs mt-0.5">
            Textos del hero que se muestran en la página de inicio
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-steel-400 text-xs font-medium mb-1.5">
              Badge (texto pequeño sobre el título)
            </label>
            <input
              type="text"
              value={data.hero?.badge ?? ""}
              onChange={(e) =>
                setData((d) => ({ ...d, hero: { ...d.hero, badge: e.target.value } }))
              }
              placeholder="Estructuras metálicas con protección anticorrosión"
              className="w-full bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-steel-400 text-xs font-medium mb-1.5">
              Título principal
            </label>
            <input
              type="text"
              value={data.hero?.title ?? ""}
              onChange={(e) =>
                setData((d) => ({ ...d, hero: { ...d.hero, title: e.target.value } }))
              }
              placeholder="Estructuras galvanizadas a medida"
              className="w-full bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-steel-400 text-xs font-medium mb-1.5">
              Descripción
            </label>
            <textarea
              rows={3}
              value={data.hero?.subtitle ?? ""}
              onChange={(e) =>
                setData((d) => ({ ...d, hero: { ...d.hero, subtitle: e.target.value } }))
              }
              placeholder="Fabricamos y galvanizamos estantes, racks..."
              className="w-full bg-steel-800 border border-steel-600 rounded-lg px-3 py-2.5 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          Información de contacto actualizada correctamente
        </div>
      )}

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 disabled:bg-steel-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand-500/20"
      >
        {status === "saving" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Guardar cambios
          </>
        )}
      </button>
    </div>
  );
}
