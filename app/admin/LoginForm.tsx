"use client";

import { useState } from "react";
import { Zap, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error de autenticación");
      }

      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-steel-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/30">
            <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white font-bold text-2xl mb-1">
            Galva<span className="text-brand-400">Zinc</span>
          </h1>
          <p className="text-steel-400 text-sm">Panel de administración</p>
        </div>

        {/* Form */}
        <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-steel-700 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-steel-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Acceso restringido</p>
              <p className="text-steel-500 text-xs">Ingresa tu contraseña de administrador</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de administrador"
                className="w-full bg-steel-700 border border-steel-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-steel-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-500 hover:text-steel-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-brand-500 hover:bg-brand-400 disabled:bg-steel-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
