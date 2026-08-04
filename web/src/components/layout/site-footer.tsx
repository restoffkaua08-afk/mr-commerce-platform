import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/mr-logo.svg"
            alt="MR"
            width={110}
            height={58}
          />
          <p className="footer-slogan">
            A visão de hoje constrói o amanhã.
          </p>
        </div>

        <div>
          <h2>Explore</h2>
          <Link href="/explorar">Produtos</Link>
          <Link href="/categorias">Categorias</Link>
          <Link href="/marcas">Marcas</Link>
        </div>

        <div>
          <h2>MR</h2>
          <Link href="/sobre">Sobre nós</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
        </div>

        <div>
          <h2>Transparência</h2>
          <p>
            A MR não realiza vendas. A compra é concluída
            diretamente na loja responsável.
          </p>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <p>© {year} MR. Todos os direitos reservados.</p>
        <p>
          Alguns links podem gerar comissão para a MR,
          sem custo adicional para você.
        </p>
      </div>
    </footer>
  );
}
