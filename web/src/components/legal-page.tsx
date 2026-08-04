import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./legal.module.css";

interface LegalSection {
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <article className={styles.article}>
        <Link className={styles.backLink} href="/">
          ← Voltar para a MR
        </Link>

        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Última atualização: {updatedAt}</small>
        </header>

        <div className={styles.sections}>
          {sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              <div>{section.content}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
