import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-steel-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[10rem] font-extrabold text-steel-800 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-brand-500/10 rounded-2xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-brand-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          Página no encontrada
        </h1>
        <p className="text-steel-400 mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Volvé al inicio para
          seguir navegando.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/25"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 bg-steel-800 hover:bg-steel-700 border border-steel-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Contactarnos
          </Link>
        </div>
      </div>
    </div>
  );
}
