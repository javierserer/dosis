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
  title: "GRINTA — Cada hábito cuenta",
  description:
    "Trackea tus hábitos, gana puntos, compite con tu squad. Como Strava, pero para todo lo que te hace mejor.",
  openGraph: {
    title: "GRINTA — Cada hábito cuenta",
    description:
      "Trackea tus hábitos, gana puntos, compite con tu squad. Como Strava, pero para todo lo que te hace mejor.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRINTA — Cada hábito cuenta",
    description:
      "Trackea tus hábitos, gana puntos, compite con tu squad. Como Strava, pero para todo lo que te hace mejor.",
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
