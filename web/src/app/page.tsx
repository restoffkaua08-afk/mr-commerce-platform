import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />

        <Image
          src="/brand/mr-shield.svg"
          alt=""
          width={520}
          height={520}
          priority
          className="hero-shield"
          aria-hidden="true"
        />

        <div className="site-container hero-content">
          <p className="eyebrow">
            Uma nova forma de descobrir
          </p>

          <h1>
            A visão de hoje
            <span> constrói o amanhã.</span>
          </h1>

          <p className="hero-description">
            Encontre produtos selecionados, conheça marcas
            e acesse ofertas diretamente em lojas confiáveis.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" href="/explorar">
              Explorar produtos
            </Link>

            <Link className="button button-secondary" href="/sobre">
              Conhecer a MR
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="site-container trust-grid">
          <div>
            <strong>Curadoria</strong>
            <span>Produtos selecionados com propósito</span>
          </div>

          <div>
            <strong>Transparência</strong>
            <span>Ofertas direcionadas às lojas responsáveis</span>
          </div>

          <div>
            <strong>Liberdade</strong>
            <span>Explore sem precisar criar uma conta</span>
          </div>
        </div>
      </section>
    </>
  );
}
