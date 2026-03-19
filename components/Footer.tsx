import Link from "next/link";
import { Zap, Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { getContactInfo } from "@/lib/contact";

export default async function Footer() {
  let logoUrl = "";
  let social = { linkedin: "", facebook: "", instagram: "" };
  try {
    const info = await getContactInfo();
    logoUrl = info.logo_url ?? "";
    social = { ...social, ...info.social };
  } catch {
    // use default
  }

  return (
    <footer className="bg-steel-900 border-t border-steel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="GalvaZinc logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-bold text-xl tracking-tight">
                    Galva<span className="text-brand-400">Zinc</span>
                  </span>
                </>
              )}
            </Link>
            <p className="text-steel-400 text-sm leading-relaxed max-w-sm">
              Fabricamos y galvanizamos estructuras metálicas a medida: estantes, racks,
              portones, rejas y mezzanines. Más de 20 años protegiendo el acero en Cuba.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {([
                { icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: social.facebook, label: "Facebook" },
                { icon: Instagram, href: social.instagram, label: "Instagram" },
              ] as const).map(({ icon: Icon, href, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-steel-800 hover:bg-brand-500 flex items-center justify-center text-steel-400 hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={`${label} no configurado`}
                    className="w-9 h-9 rounded-lg bg-steel-800/40 flex items-center justify-center text-steel-700 cursor-not-allowed"
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/servicios", label: "Servicios" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-steel-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-steel-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                +54 11 1234-5678
              </li>
              <li className="flex items-start gap-3 text-steel-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                info@galvazinc.com.ar
              </li>
              <li className="flex items-start gap-3 text-steel-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                Av. Industrial 1234, Buenos Aires
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-steel-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel-500 text-sm">
            © {new Date().getFullYear()} GalvaZinc. Todos los derechos reservados.
          </p>
          <Link
            href="/admin"
            className="text-steel-600 hover:text-steel-400 text-xs transition-colors"
          >
            Panel de administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
