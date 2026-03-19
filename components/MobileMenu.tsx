"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const overlay =
    open && mounted
      ? createPortal(
          <div
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#0f172a",
              zIndex: 9999,
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "1rem",
                      color: "#e2e8f0",
                      borderRadius: "0.75rem",
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div style={{ paddingTop: "1.5rem" }}>
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    textDecoration: "none",
                  }}
                >
                  Pedir cotización
                </Link>
              </div>
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden p-2 rounded-lg text-steel-400 hover:text-white hover:bg-steel-800 transition-all"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {overlay}
    </>
  );
}
