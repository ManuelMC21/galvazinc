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
        onClick={() => setOpen((o) => !o)}
        className="md:hidden p-2 rounded-lg text-steel-400 hover:text-white hover:bg-steel-800 transition-all"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay — inline styles to avoid any Tailwind purge/class conflict */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0f172a",
            zIndex: 49,
            overflowY: "auto",
            borderTop: "1px solid rgba(51,65,85,0.5)",
          }}
          onClick={() => setOpen(false)}
        >
          <nav
            style={{ padding: "2rem 1.5rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
            </div>
            <div style={{ paddingTop: "1.5rem" }}>
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-brand-500 hover:bg-brand-400 text-white py-4 rounded-xl font-bold text-xl transition-all shadow-lg"
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
