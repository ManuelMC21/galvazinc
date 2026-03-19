import type { Metadata } from "next";
import { Shield, Zap, Award, Package, Layers, Wrench, Cog, Grid } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Estructuras metálicas galvanizadas a medida: estantes, racks, escaleras, mezzanines y más.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: Package,
      title: "Estantes y Racks Industriales",
      description:
        "Fabricamos y galvanizamos estantes y racks de acero para almacenamiento industrial. Alta resistencia a la corrosión, ideales para depósitos, galpones y plantas de producción.",
      features: ["Racks selectivos", "Estantes livianos y pesados", "Sistemas de almacenamiento", "Medidas a pedido"],
    },
    {
      icon: Layers,
      title: "Mezzanines y Entrepisos",
      description:
        "Estructuras metálicas galvanizadas para duplicar el espacio disponible en tu depósito o planta. Diseñadas y calculadas por nuestros ingenieros.",
      features: ["Entrepisos industriales", "Plataformas elevadas", "Escaleras de acceso", "Barandas de seguridad"],
    },
    {
      icon: Grid,
      title: "Portones y Rejas",
      description:
        "Portones corredizos y batientes, rejas de seguridad y cerramientos perimetrales con galvanizado en caliente para máxima durabilidad en exteriores.",
      features: ["Portones corredizos", "Portones batientes", "Rejas perimetrales", "Cerramientos industriales"],
    },
    {
      icon: Wrench,
      title: "Estructuras a Medida",
      description:
        "Desarrollamos cualquier tipo de estructura metálica galvanizada según los planos y requerimientos del cliente. Desde piezas simples hasta proyectos complejos.",
      features: ["Diseño personalizado", "Planos y cálculo estructural", "Cualquier escala", "Asesoramiento técnico"],
    },
    {
      icon: Cog,
      title: "Galvanizado de Piezas",
      description:
        "Servicio de galvanizado en caliente para piezas y componentes metálicos de terceros. Traé tus piezas y nosotros las galvanizamos con los más altos estándares de calidad.",
      features: ["Piezas sueltas", "Lotes industriales", "Galvanizado centrifugado", "Certificado de calidad"],
    },
    {
      icon: Award,
      title: "Asesoramiento Técnico",
      description:
        "Nuestro equipo te orienta sobre el mejor proceso y diseño para cada proyecto. Evaluamos materiales, dimensiones y ambiente de uso para garantizar la mayor durabilidad.",
      features: ["Consulta sin cargo", "Selección de materiales", "Diseño para galvanizado", "Normas ASTM e IRAM"],
    },
  ];

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-steel-800 to-steel-900 border-b border-steel-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-brand-400" />
            <span className="text-brand-300 text-sm font-medium">Lo que hacemos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Nuestros servicios
          </h1>
          <p className="text-steel-400 text-lg max-w-2xl mx-auto">
            Fabricación y galvanizado de estructuras metálicas a medida:
            estantes, racks, mezzanines, portones y mucho más
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-steel-800 border border-steel-700 hover:border-brand-500/40 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-steel-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-steel-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-steel-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Nuestro proceso</h2>
            <p className="text-steel-400 max-w-xl mx-auto">
              El proceso de galvanizado en caliente cumple con las normas ASTM A123 e IRAM
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Recepción", desc: "Recibimos y revisamos la estructura o pieza" },
              { step: "02", title: "Limpieza", desc: "Desengrase y decapado ácido" },
              { step: "03", title: "Flux", desc: "Aplicación de fundente" },
              { step: "04", title: "Inmersión", desc: "Sumergido en zinc a 450°C" },
              { step: "05", title: "Entrega", desc: "Inspección final y despacho" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-400 font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                <p className="text-steel-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas un presupuesto?
          </h2>
          <p className="text-steel-400 mb-8">
            Cuéntanos tu proyecto y te respondemos en menos de 24 horas, sin costo ni compromiso
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/25 hover:-translate-y-0.5"
            >
              Pedir cotización gratis
            </Link>
            <Link
              href="/proyectos"
              className="bg-steel-800 hover:bg-steel-700 border border-steel-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
