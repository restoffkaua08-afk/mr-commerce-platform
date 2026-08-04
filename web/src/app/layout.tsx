import type {
  Metadata,
  Viewport,
} from "next";
import {
  Cormorant_Garamond,
  Geist,
} from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
      ?? "http://localhost:3000",
  ),
  title: {
    default: "MR — A visão de hoje constrói o amanhã",
    template: "%s | MR",
  },
  description:
    "Descubra produtos selecionados e acesse ofertas de lojas confiáveis.",
  applicationName: "MR",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "MR",
    title: "MR — A visão de hoje constrói o amanhã",
    description:
      "Descubra produtos selecionados e acesse ofertas de lojas confiáveis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MR — A visão de hoje constrói o amanhã",
    description:
      "Descubra produtos selecionados e acesse ofertas de lojas confiáveis.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geist.variable} ${cormorant.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a className="skip-link" href="#conteudo">
            Pular para o conteúdo
          </a>

          <div className="site-shell">
            <SiteHeader />

            <main id="conteudo">
              {children}
            </main>

            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
