import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/explorar", label: "Explorar" },
  { href: "/categorias", label: "Categorias" },
  { href: "/marcas", label: "Marcas" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-content">
        <Link
          href="/"
          className="brand-link"
          aria-label="MR — Página inicial"
        >
          <Image
            src="/brand/mr-logo.svg"
            alt="MR"
            width={92}
            height={48}
            priority
            className="brand-logo"
          />
        </Link>

        <nav
          className="desktop-navigation"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
