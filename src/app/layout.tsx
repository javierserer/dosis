import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOSIS — Gánate tus vicios",
  description:
    "Gana puntos por ser disciplinado. Gástalos en vicios reales. Reta a tus amigos o calla para siempre.",
  openGraph: {
    title: "DOSIS — Gánate tus vicios",
    description:
      "La app que convierte tu disciplina en recompensas reales. Squads, duelos y vergüenza pública incluidos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOSIS — Gánate tus vicios",
    description:
      "La app que convierte tu disciplina en recompensas reales. Squads, duelos y vergüenza pública incluidos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
