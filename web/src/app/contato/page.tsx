import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a equipe responsável pela plataforma MR.",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContactPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "contato@seudominio.com";

  return (
    <LegalPage
      eyebrow="Atendimento"
      title="Fale com a MR"
      description="Utilize o canal abaixo para assuntos institucionais, privacidade, correções de conteúdo ou funcionamento da plataforma."
      updatedAt="4 de agosto de 2026"
      sections={[
        {
          title: "Canal oficial",
          content: (
            <>
              <p>
                E-mail:{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
              <p>
                Ao entrar em contato, informe de forma objetiva o
                assunto e, quando necessário, a URL relacionada.
              </p>
            </>
          ),
        },
        {
          title: "Pedidos e compras",
          content: (
            <p>
              A MR não possui acesso aos sistemas de pedidos das lojas.
              Para entrega, troca, cancelamento, pagamento ou garantia,
              fale diretamente com o estabelecimento no qual a compra
              foi concluída.
            </p>
          ),
        },
        {
          title: "Privacidade",
          content: (
            <p>
              Solicitações relacionadas a dados pessoais devem
              identificar o assunto como “Privacidade”. Informações
              adicionais poderão ser solicitadas para confirmar a
              identidade e proteger o titular.
            </p>
          ),
        },
      ]}
    />
  );
}
