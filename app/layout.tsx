import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GalvaZinc – Galvanizado Industrial",
    template: "%s | GalvaZinc",
  },
  description:
    "Empresa especializada en galvanizado en caliente para industria, construcción, infraestructura y más. Más de 20 años de experiencia.",
  keywords: ["galvanizado", "galvanizado en caliente", "protección anticorrosión", "acero", "galvazinc"],
  openGraph: {
    title: "GalvaZinc – Galvanizado Industrial",
    description: "Especialistas en galvanizado en caliente.",
    url: "https://galvazinc.vercel.app",
    siteName: "GalvaZinc",
    locale: "es",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-steel-900 text-white antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
