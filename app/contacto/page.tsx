import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getContactInfo, DEFAULT_CONTACT } from "@/lib/contact";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para solicitar una cotización de estructuras metálicas galvanizadas.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let contact = DEFAULT_CONTACT;
  try {
    contact = await getContactInfo();
  } catch {
    // use defaults
  }

  const infoItems = [
    { icon: Phone, title: "Teléfonos", lines: contact.phones },
    { icon: Mail, title: "Correos electrónicos", lines: contact.emails },
    { icon: MapPin, title: "Dirección", lines: [contact.address] },
    { icon: Clock, title: "Horario de atención", lines: contact.schedule },
  ];

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-gradient-to-b from-steel-800 to-steel-900 border-b border-steel-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-steel-400 text-lg max-w-xl mx-auto">
            ¿Tenés un proyecto? Escribinos y te respondemos en menos de 24 horas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">
              Información de contacto
            </h2>
            <div className="space-y-6">
              {infoItems.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{title}</p>
                    {lines.map((line, i) => (
                      <p key={i} className="text-steel-400 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-steel-800 border border-steel-700 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
