"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/types";

interface UploadFormProps {
  onSuccess?: () => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setErrorMsg("Solo se permiten archivos de imagen.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErrorMsg("");
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      setErrorMsg("El nombre y la imagen son obligatorios.");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Error subiendo imagen");
      }

      const { url } = await uploadRes.json();

      // 2. Create project
      const projectRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image_url: url, category }),
      });

      if (!projectRes.ok) {
        const err = await projectRes.json();
        throw new Error(err.error || "Error creando proyecto");
      }

      setStatus("success");
      setName("");
      setDescription("");
      setCategory("General");
      setFile(null);
      setPreview(null);
      onSuccess?.();

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Nombre del proyecto <span className="text-brand-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Estructura Puente Norte"
          className="w-full bg-steel-800 border border-steel-600 rounded-xl px-4 py-3 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Categoría
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-steel-800 border border-steel-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe los detalles del proyecto..."
          rows={4}
          className="w-full bg-steel-800 border border-steel-600 rounded-xl px-4 py-3 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Imagen <span className="text-brand-400">*</span>
        </label>
        {preview ? (
          <div className="relative rounded-xl overflow-hidden border border-steel-600">
            <Image
              src={preview}
              alt="Preview"
              width={800}
              height={400}
              className="w-full h-56 object-cover"
            />
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-3 right-3 bg-steel-900/80 hover:bg-red-500 text-white rounded-lg p-1.5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
              isDragging
                ? "border-brand-400 bg-brand-500/10"
                : "border-steel-600 hover:border-brand-500/60 hover:bg-steel-800/50"
            )}
          >
            <Upload className="w-8 h-8 text-steel-500 mx-auto mb-3" />
            <p className="text-steel-400 text-sm">
              <span className="text-brand-400 font-medium">Haz clic</span> o arrastra una imagen
            </p>
            <p className="text-steel-500 text-xs mt-1">JPG, PNG, WEBP · Máx. 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        )}
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          ¡Proyecto creado correctamente!
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "uploading"}
        className="w-full bg-brand-500 hover:bg-brand-400 disabled:bg-steel-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
      >
        {status === "uploading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Subiendo proyecto...
          </>
        ) : (
          "Publicar proyecto"
        )}
      </button>
    </form>
  );
}
