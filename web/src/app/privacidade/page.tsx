import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Entenda quais dados técnicos a MR utiliza e como exercer seus direitos.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacyPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "contato@seudominio.com";

  return (
    <LegalPage
      eyebrow="Privacidade"
      title="Aviso de privacidade"
      description="Este aviso explica, de forma objetiva, quais informações técnicas podem ser tratadas durante o uso da MR."
      updatedAt="4 de agosto de 2026"
      sections={[
        {
          title: "Informações tratadas",
          content: (
            <>
              <p>
                Ao navegar pela plataforma, o servidor pode registrar
                informações técnicas necessárias à segurança e ao
                funcionamento, como data, rota acessada, navegador e
                registros operacionais.
              </p>
              <p>
                Ao utilizar um link afiliado, a MR pode registrar um
                identificador derivado do endereço IP, user agent,
                referência de origem e parâmetros de campanha. A
                finalidade é medir acessos, prevenir abuso e produzir
                estatísticas agregadas.
              </p>
            </>
          ),
        },
        {
          title: "Preferências no dispositivo",
          content: (
            <p>
              Recursos como tema visual e favoritos podem utilizar o
              armazenamento local do navegador. Essas preferências
              permanecem no dispositivo até serem removidas pelo
              próprio usuário ou pelo navegador.
            </p>
          ),
        },
        {
          title: "Finalidades",
          content: (
            <ul>
              <li>Entregar e proteger as funções da plataforma.</li>
              <li>Direcionar corretamente aos parceiros.</li>
              <li>Medir desempenho de links e campanhas.</li>
              <li>Diagnosticar erros e prevenir uso abusivo.</li>
            </ul>
          ),
        },
        {
          title: "Compartilhamento e lojas parceiras",
          content: (
            <p>
              Ao sair da MR, o usuário passa a acessar o ambiente da
              loja escolhida. A loja possui seus próprios termos,
              práticas de privacidade e tecnologias de rastreamento,
              que devem ser consultados antes da compra.
            </p>
          ),
        },
        {
          title: "Retenção e segurança",
          content: (
            <p>
              Os registros são mantidos somente pelo período necessário
              às finalidades descritas, obrigações legais, segurança e
              defesa de direitos. Medidas técnicas e organizacionais
              devem ser revisadas conforme a plataforma evoluir.
            </p>
          ),
        },
        {
          title: "Direitos do titular",
          content: (
            <>
              <p>
                O titular pode solicitar informações, acesso, correção,
                anonimização, bloqueio ou eliminação quando aplicável,
                conforme a legislação brasileira.
              </p>
              <p>
                Solicitações podem ser enviadas para{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                A identidade poderá ser confirmada para proteger os
                próprios dados do solicitante.
              </p>
              <p>
                Consulte também as orientações oficiais da{" "}
                <a
                  href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
                  rel="noreferrer"
                  target="_blank"
                >
                  Autoridade Nacional de Proteção de Dados
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
