import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LegalFooter } from "@/components/legal-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "MR",
  title: {
    default: "MR — Curadoria inteligente de produtos",
    template: "%s | MR",
  },
  description:
    "Descubra produtos selecionados, compare opções e acesse ofertas de lojas parceiras com uma experiência clara e elegante.",
  keywords: [
    "MR",
    "curadoria de produtos",
    "comparador de produtos",
    "ofertas online",
    "produtos selecionados",
    "moda",
    "tênis",
    "compras online",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "MR",
    title: "MR — Curadoria inteligente de produtos",
    description:
      "Produtos selecionados e ofertas de lojas parceiras em uma experiência clara, moderna e elegante.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MR — A visão de hoje constrói o amanhã",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MR — Curadoria inteligente de produtos",
    description:
      "Produtos selecionados e ofertas de lojas parceiras em uma experiência clara, moderna e elegante.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
              <LegalFooter />
      </body>
    </html>
  );
}
