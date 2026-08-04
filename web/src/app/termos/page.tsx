import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Conheça as condições de utilização da plataforma MR.",
  alternates: {
    canonical: "/termos",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Condições de uso"
      title="Termos da plataforma"
      description="Ao utilizar a MR, você concorda com as condições abaixo e com a natureza informativa e afiliada do serviço."
      updatedAt="4 de agosto de 2026"
      sections={[
        {
          title: "O papel da MR",
          content: (
            <p>
              A MR organiza informações e apresenta produtos de lojas
              parceiras. A plataforma não realiza diretamente a venda,
              o pagamento, a entrega, a troca ou a garantia dos
              produtos apresentados.
            </p>
          ),
        },
        {
          title: "Preços e disponibilidade",
          content: (
            <p>
              Preços, estoque, frete, condições de pagamento e
              características podem mudar no ambiente da loja. Antes de
              concluir uma compra, confirme todas as informações
              diretamente no parceiro responsável pela oferta.
            </p>
          ),
        },
        {
          title: "Relacionamento com a loja",
          content: (
            <p>
              A contratação ocorre entre o consumidor e a loja
              escolhida. Dúvidas sobre pedidos, cancelamentos,
              arrependimento, entrega, troca ou garantia devem ser
              tratadas nos canais oficiais do respectivo fornecedor.
            </p>
          ),
        },
        {
          title: "Uso permitido",
          content: (
            <p>
              Não é permitido tentar interromper o serviço, explorar
              falhas, automatizar acessos abusivos, adulterar métricas
              ou utilizar a plataforma para finalidade ilícita.
            </p>
          ),
        },
        {
          title: "Propriedade intelectual",
          content: (
            <p>
              A identidade MR, o design e os componentes próprios da
              plataforma são protegidos. Marcas e imagens de produtos
              pertencem aos respectivos titulares e são apresentadas
              para identificação e divulgação das ofertas.
            </p>
          ),
        },
        {
          title: "Alterações",
          content: (
            <p>
              Estes termos podem ser atualizados para refletir mudanças
              técnicas, comerciais ou legais. A data de atualização
              será mantida nesta página.
            </p>
          ),
        },
      ]}
    />
  );
}
