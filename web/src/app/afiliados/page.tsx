import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Transparência sobre links afiliados",
  description:
    "Entenda como os links afiliados contribuem para a operação da MR.",
  alternates: {
    canonical: "/afiliados",
  },
};

export default function AffiliatePage() {
  return (
    <LegalPage
      eyebrow="Transparência"
      title="Como funcionam os links afiliados"
      description="Alguns acessos da MR levam a lojas parceiras por links que permitem identificar a origem da visita."
      updatedAt="4 de agosto de 2026"
      sections={[
        {
          title: "Possível remuneração",
          content: (
            <p>
              Quando uma compra elegível ocorre após o acesso por um
              link afiliado, a MR pode receber uma comissão da loja ou
              da rede de afiliados.
            </p>
          ),
        },
        {
          title: "Preço para o consumidor",
          content: (
            <p>
              A existência de um link afiliado não deve adicionar uma
              cobrança da MR ao consumidor. O preço e todas as condições
              válidas são aqueles exibidos pela loja no momento da
              compra.
            </p>
          ),
        },
        {
          title: "Identificação",
          content: (
            <p>
              A plataforma informa a natureza afiliada dos links para
              que o usuário compreenda a relação comercial antes de
              sair da MR.
            </p>
          ),
        },
        {
          title: "Responsabilidade da loja",
          content: (
            <p>
              Estoque, preço, pagamento, entrega, devolução, garantia e
              atendimento são definidos e executados pelo fornecedor
              responsável pela oferta.
            </p>
          ),
        },
        {
          title: "Medição de acessos",
          content: (
            <p>
              O redirecionamento pode registrar informações técnicas e
              parâmetros de campanha para mensuração, segurança e
              prevenção de fraude, conforme explicado no Aviso de
              Privacidade.
            </p>
          ),
        },
      ]}
    />
  );
}
