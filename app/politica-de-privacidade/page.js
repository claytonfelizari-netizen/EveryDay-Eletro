import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | EveryDay-Eletro",
  description:
    "Saiba como a EveryDay-Eletro trata e protege dados pessoais em seu site e integrações.",
};

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <article className="privacy-card">
        <Link className="privacy-back" href="/">
          ← Voltar para a loja
        </Link>

        <header className="privacy-header">
          <p className="privacy-kicker">EveryDay-Eletro</p>
          <h1>Política de Privacidade</h1>
          <p>Última atualização: 24 de julho de 2026</p>
        </header>

        <section>
          <h2>1. Quem somos</h2>
          <p>
            Esta Política de Privacidade descreve como a EveryDay-Eletro,
            inscrita no CNPJ nº 63.280.662/0001-82, trata dados pessoais
            relacionados ao uso deste site, aos contatos comerciais e às
            integrações autorizadas pelo usuário.
          </p>
          <p>
            Para assuntos de privacidade, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@everydayeletro.com.br">
              contato@everydayeletro.com.br
            </a>
            .
          </p>
        </section>

        <section>
          <h2>2. Dados que podemos tratar</h2>
          <p>Conforme a forma de interação com a EveryDay-Eletro, podemos tratar:</p>
          <ul>
            <li>
              dados fornecidos voluntariamente em contatos, como nome, telefone,
              e-mail e conteúdo da mensagem;
            </li>
            <li>
              dados técnicos de acesso, como endereço IP, data, horário, tipo de
              dispositivo, navegador e registros de segurança;
            </li>
            <li>
              informações necessárias para atender pedidos, dúvidas, suporte e
              comunicações comerciais solicitadas;
            </li>
            <li>
              quando houver autorização pela Amazon, identificadores de perfil
              publicitário, permissões, tokens de autorização e dados de
              campanhas, relatórios e desempenho disponibilizados pela Amazon
              Ads API.
            </li>
          </ul>
          <p>
            Este site não solicita cadastro nem recebe pagamentos diretamente.
            Ao escolher falar conosco pelo WhatsApp, o tratamento realizado
            nessa plataforma também está sujeito às políticas da Meta e do
            WhatsApp.
          </p>
        </section>

        <section>
          <h2>3. Para que usamos os dados</h2>
          <p>Os dados podem ser utilizados para:</p>
          <ul>
            <li>responder dúvidas e prestar atendimento;</li>
            <li>apresentar produtos e dar andamento a solicitações do cliente;</li>
            <li>proteger o site, prevenir fraudes e manter registros técnicos;</li>
            <li>cumprir obrigações legais, regulatórias e contratuais;</li>
            <li>
              mediante autorização, acessar e gerenciar recursos publicitários,
              campanhas e relatórios da Amazon Ads;
            </li>
            <li>exercer direitos em processos administrativos ou judiciais.</li>
          </ul>
        </section>

        <section>
          <h2>4. Bases legais</h2>
          <p>
            O tratamento é realizado de acordo com a Lei Geral de Proteção de
            Dados Pessoais (Lei nº 13.709/2018), conforme a finalidade aplicável,
            com base no consentimento, na execução de contrato ou de
            procedimentos preliminares, no cumprimento de obrigação legal ou
            regulatória, no legítimo interesse e no exercício regular de
            direitos.
          </p>
        </section>

        <section>
          <h2>5. Compartilhamento de dados</h2>
          <p>
            Podemos compartilhar dados somente quando necessário com provedores
            de hospedagem e tecnologia, serviços de comunicação, consultores,
            autoridades públicas e plataformas escolhidas pelo usuário. Em
            integrações com a Amazon Ads, os dados são tratados conforme as
            permissões concedidas e as regras da Amazon.
          </p>
          <p>
            Não vendemos dados pessoais. Exigimos dos prestadores medidas
            compatíveis de segurança e proteção de dados.
          </p>
        </section>

        <section>
          <h2>6. Armazenamento e segurança</h2>
          <p>
            Mantemos os dados pelo período necessário para cumprir as finalidades
            informadas, obrigações legais e regulatórias ou para o exercício de
            direitos. Adotamos medidas técnicas e administrativas razoáveis para
            proteger os dados contra acessos não autorizados, perda, alteração
            ou divulgação indevida.
          </p>
          <p>
            Nenhum ambiente digital é totalmente isento de riscos. Caso seja
            identificado um incidente relevante, serão adotadas as providências
            cabíveis nos termos da legislação.
          </p>
        </section>

        <section>
          <h2>7. Transferências internacionais</h2>
          <p>
            Alguns provedores, incluindo plataformas de hospedagem, comunicação e
            a Amazon, podem tratar dados em outros países. Nessas situações,
            adotamos medidas compatíveis com a LGPD e buscamos utilizar
            fornecedores com padrões adequados de proteção.
          </p>
        </section>

        <section>
          <h2>8. Seus direitos</h2>
          <p>
            O titular pode solicitar, quando aplicável, confirmação e acesso,
            correção, anonimização, bloqueio ou eliminação, portabilidade,
            informação sobre compartilhamentos, revogação do consentimento e
            revisão de decisões automatizadas.
          </p>
          <p>
            Para exercer seus direitos, escreva para{" "}
            <a href="mailto:contato@everydayeletro.com.br">
              contato@everydayeletro.com.br
            </a>
            . Poderemos solicitar informações para confirmar a identidade do
            solicitante.
          </p>
        </section>

        <section>
          <h2>9. Links externos</h2>
          <p>
            O site pode direcionar para serviços de terceiros, como WhatsApp e
            Amazon. A EveryDay-Eletro não controla as práticas desses sites e
            recomenda a leitura de suas respectivas políticas de privacidade.
          </p>
        </section>

        <section>
          <h2>10. Atualizações desta política</h2>
          <p>
            Esta Política poderá ser atualizada para refletir mudanças no site,
            nos serviços, nas integrações ou na legislação. A versão vigente
            estará sempre disponível nesta página, com a data da última
            atualização.
          </p>
        </section>
      </article>
    </main>
  );
}
