import Link from "next/link";
import styles from "./legal.module.css";

const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/afiliados", label: "Links afiliados" },
  { href: "/contato", label: "Contato" },
] as const;

export function LegalFooter() {
  return (
    <footer className={styles.legalFooter}>
      <p>
        A MR realiza curadoria e pode receber comissão por links
        afiliados.
      </p>

      <nav aria-label="Informações legais">
        {legalLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
