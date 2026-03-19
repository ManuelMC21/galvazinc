import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { getContactInfo } from "@/lib/contact";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  let logoUrl = "";
  try {
    const info = await getContactInfo();
    logoUrl = info.logo_url ?? "";
  } catch {
    // use default
  }

  return (
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

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Inicio" },
              { href: "/proyectos", label: "Proyectos" },
              { href: "/servicios", label: "Servicios" },
              { href: "/contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-steel-300 hover:text-white hover:bg-steel-800 rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contacto"
            className="hidden md:flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-400/30"
          >
            Pedir cotización
          </Link>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
