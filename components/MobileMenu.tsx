"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg text-steel-400 hover:text-white hover:bg-steel-800 transition-all"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-steel-900 z-40 border-t border-steel-700/50 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <nav
            className="px-6 py-8 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-4 text-steel-200 hover:text-white hover:bg-steel-800 rounded-xl font-medium text-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-brand-500 hover:bg-brand-400 text-white py-4 rounded-xl font-bold text-xl transition-all shadow-lg shadow-brand-500/30"
              >
                Pedir cotización
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
