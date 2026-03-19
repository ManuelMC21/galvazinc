"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function NavbarClient({ logoUrl }: { logoUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-steel-900/95 backdrop-blur-md border-b border-steel-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="GalvaZinc logo"
                  width={120}
                  height={36}
                  className="h-9 w-auto object-contain"
                  priority
                />
              ) : (
                <>
                  <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-brand-400 transition-colors">
                    <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-bold text-xl tracking-tight">
                    Galva<span className="text-brand-400">Zinc</span>
                  </span>
                </>
              )}
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-steel-300 hover:text-white hover:bg-steel-800 rounded-lg text-sm font-medium transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <Link
              href="/contacto"
              className="hidden md:flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-500/25"
            >
              Pedir cotización
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-steel-400 hover:text-white hover:bg-steel-800 transition-all"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — sibling of nav, NOT nested inside it */}
      {open && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-0 bg-steel-900 z-40"
          style={{ top: "64px" }}
        >
          <div className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-4 py-4 text-steel-200 hover:text-white hover:bg-steel-800 rounded-xl font-medium text-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-brand-500 hover:bg-brand-400 text-white py-4 rounded-xl font-bold text-xl transition-all"
              >
                Pedir cotización
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
