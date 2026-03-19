"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, Send } from "lucide-react";

const inputClass =
  "w-full bg-steel-700 border border-steel-600 rounded-xl px-4 py-3 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("nombre"),
          company: fd.get("empresa"),
          email: fd.get("email"),
          subject: fd.get("asunto"),
          message: fd.get("mensaje"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al enviar");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">¡Mensaje recibido!</h3>
        <p className="text-steel-400 text-sm max-w-xs">
          Lo revisaremos y te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-steel-300 mb-1.5">
            Nombre <span className="text-brand-400">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-steel-300 mb-1.5">
            Empresa
          </label>
          <input
            type="text"
            name="empresa"
            placeholder="Tu empresa"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Email <span className="text-brand-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="tu@email.com"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Asunto
        </label>
        <input
          type="text"
          name="asunto"
          placeholder="¿En qué podemos ayudarte?"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-steel-300 mb-1.5">
          Mensaje <span className="text-brand-400">*</span>
        </label>
        <textarea
          name="mensaje"
          rows={5}
          placeholder="Describe tu proyecto o consulta..."
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 disabled:bg-steel-700 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/20"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}
