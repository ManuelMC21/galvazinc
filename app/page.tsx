import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  Award,
  Package,
  Layers,
  Grid,
} from "lucide-react";
import { getAllProjects } from "@/lib/db";
import { getContactInfo } from "@/lib/contact";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 60;

export default async function HomePage() {
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let hero = {
    badge: "Estructuras metálicas con protección anticorrosión",
    title: "Estructuras galvanizadas a medida",
    subtitle:
      "Fabricamos y galvanizamos estantes, racks, mezzanines, portones y estructuras metálicas a medida. Más de 20 años de experiencia protegiendo el acero con zinc.",
  };
  try {
    const [fetchedProjects, contactInfo] = await Promise.all([
      getAllProjects(),
      getContactInfo(),
    ]);
    projects = fetchedProjects.slice(0, 3);
    if (contactInfo.hero) hero = { ...hero, ...contactInfo.hero };
  } catch {
    // DB might not be set up yet
  }

  const stats = [
    { value: "20+", label: "Años de experiencia" },
    { value: "500+", label: "Obras entregadas" },
    { value: "100%", label: "Trabajos a medida" },
    { value: "99%", label: "Clientes satisfechos" },
  ];

  const services = [
    {
      icon: Package,
      title: "Estantes y Racks",
      description:
        "Diseñamos y fabricamos estantes y racks de acero galvanizado para almacenes, talleres y depósitos. Resistentes, duraderos y completamente a tu medida.",
    },
    {
      icon: Layers,
      title: "Mezzanines y Entrepisos",
      description:
        "Aprovecha al máximo el espacio vertical de tu negocio con plataformas y entrepisos metálicos galvanizados, diseñados según tus necesidades.",
    },
    {
      icon: Grid,
      title: "Portones y Rejas",
      description:
        "Portones corredizos, batientes y rejas de seguridad construidas en acero galvanizado. Protección real para tu negocio, hogar o instalación.",
    },
  ];


  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-steel-800 to-steel-900" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)",
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-brand-500 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl animate-fade-in">
            {hero.badge && (
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-4 h-4 text-brand-400" />
                <span className="text-brand-300 text-sm font-medium">
                  {hero.badge}
                </span>
              </div>
            )}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              {hero.title}
            </h1>

            <p className="text-xl text-steel-400 leading-relaxed max-w-2xl mb-10">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/proyectos"
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-7 py-3.5 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-brand-500/30 hover:shadow-brand-400/40 hover:-translate-y-0.5"
              >
                Ver proyectos <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contacto"
                className="flex items-center gap-2 bg-steel-800 hover:bg-steel-700 border border-steel-600 hover:border-steel-500 text-white px-7 py-3.5 rounded-xl font-semibold text-lg transition-all"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-steel-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-steel-500 to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-brand-600/5 border-y border-brand-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-extrabold text-brand-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-steel-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-steel-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Lo que fabricamos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Soluciones para tu negocio
            </h2>
            <p className="text-steel-400 text-lg max-w-xl mx-auto">
              Todo en acero galvanizado, todo a tu medida, todo con garantía real
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative bg-steel-800 hover:bg-steel-750 border border-steel-700 hover:border-brand-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-500/10 transition-colors" />
                <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-steel-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/servicios" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors text-sm">
              Ver todos nuestros servicios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-steel-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                ¿Por qué elegir{" "}
                <span className="text-brand-400">GalvaZinc</span>?
              </h2>
              <p className="text-steel-400 text-lg leading-relaxed mb-8">
                Somos fabricantes de estructuras metálicas galvanizadas en caliente.
                Nuestras piezas se distinguen por su resistencia superior a la corrosión
                y por estar completamente hechas a medida según tu proyecto.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Protección garantizada",
                    desc: "Hasta 70 años de vida útil en ambientes agresivos",
                  },
                  {
                    icon: Award,
                    title: "Certificaciones internacionales",
                    desc: "Cumplimos con normas ASTM, ISO y IRAM",
                  },
                  {
                    icon: Zap,
                    title: "Fabricación y entrega rápida",
                    desc: "Producción ágil y tiempos de entrega cumplidos",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{title}</p>
                      <p className="text-steel-400 text-sm">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-500/20 to-steel-800 border border-brand-500/20 flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="w-20 h-20 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-brand-400" strokeWidth={1.5} />
                  </div>
                  <p className="text-brand-300 font-bold text-5xl mb-2">70+</p>
                  <p className="text-steel-400">años de vida útil garantizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      {projects.length > 0 && (
        <section className="py-24 bg-steel-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-2 block">Portafolio</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Trabajos recientes
                </h2>
                <p className="text-steel-400">
                  Esto es lo que hacemos. Júzganos por nuestras obras.
                </p>
              </div>
              <Link
                href="/proyectos"
                className="hidden md:flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors text-sm"
              >
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                Ver todos los proyectos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/30 via-steel-900 to-steel-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
            Empieza hoy
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-steel-300 text-lg mb-10 max-w-xl mx-auto">
            Cuéntanos lo que necesitas y te damos presupuesto sin costo ni compromiso.
            Respondemos en menos de 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-brand-500/40 hover:-translate-y-0.5"
            >
              Pedir cotización gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
