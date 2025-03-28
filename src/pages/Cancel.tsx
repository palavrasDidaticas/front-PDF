import { NextPage } from "next";
import Head from "next/head";

const CancelPolitic: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Política de Cancelamento e Reembolso</title>
        <meta
          name="description"
          content="Política de Cancelamento e Reembolso do site Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-left">
        <div className="w-full max-w-4xl p-8 bg-white ">
          <h1 className="text-3xl font-bold mb-6 text-start">
            POLÍTICA DE CANCELAMENTO E REEMBOLSO
          </h1>

          <p className="text-lg leading-relaxed mb-4">
            A Caça atividades Escolares valoriza a satisfação de seus clientes,
            em especial dos profissionais da educação. Por isso, oferecemos uma
            política de cancelamento transparente e justa para a compra de
            nossas apostilas digitais.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Prazo para Solicitação de Cancelamento:
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            O cliente possui o direito de solicitar o cancelamento de sua compra
            e o reembolso do valor pago dentro de 7 dias corridos a partir da
            data da compra.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Condições para Cancelamento:
          </h2>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
            <li>
              Acesso ao Material: Para que o reembolso seja concedido, o cliente
              não deve ter copiado, distribuído ou compartilhado o conteúdo da
              apostila.
            </li>
            <li>
              Erros no Material: Caso haja erros significativos no material
              (como informações incorretas, erros de digitação que comprometam a
              compreensão do conteúdo), o cliente poderá solicitar a correção ou
              a substituição do material.
            </li>
            <li>
              Problemas Técnicos: Em caso de problemas técnicos que impeçam o
              acesso ao material, a Caça atividades Escolares se compromete a
              solucionar o problema o mais breve possível. Caso a solução não
              seja encontrada, o cliente poderá solicitar o reembolso.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4">Processo de Cancelamento:</h2>
          <p className="text-lg leading-relaxed mb-4">
            Para solicitar o cancelamento ou informar sobre algum problema com o
            material, o cliente deve entrar em contato conosco através do
            WhatsApp (31) 994716920 informando o número do pedido e descrevendo
            detalhadamente a ocorrência.
          </p>

          <h2 className="text-xl font-bold mb-4">Reembolso:</h2>
          <p className="text-lg leading-relaxed mb-4">
            O valor pago será reembolsado na mesma forma de pagamento utilizada
            na compra, no prazo máximo de 20 dias úteis após a confirmação do
            cancelamento.
          </p>

          <h2 className="text-xl font-bold mb-4">Observações:</h2>
          <p className="text-lg leading-relaxed mb-4">
            A presente política de cancelamento não se aplica a apostilas
            personalizadas ou sob demanda. A Caça Atividades Escolares se
            reserva o direito de alterar esta política a qualquer momento.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Justificativa para a Alteração:
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            A inclusão do prazo de 7 dias para solicitação de cancelamento
            demonstra ainda mais o compromisso da empresa com a satisfação do
            cliente. Ao oferecer esse período, você permite que o cliente avalie
            o material e verifique se ele atende às suas expectativas antes de
            se comprometer com a compra.
          </p>

          <h2 className="text-xl font-bold mb-4">Informações Adicionais:</h2>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
            <li>
              Garantia de Qualidade: Nossas apostilas são elaboradas por uma
              equipe de profissionais experientes e passam por um rigoroso
              processo de revisão.
            </li>
            <li>
              Suporte Técnico: Oferecemos suporte técnico via WhatsApp para
              auxiliar nossos clientes em caso de dúvidas ou problemas.
            </li>
            <li>
              Atualizações: Nossas apostilas são constantemente atualizadas para
              garantir que o conteúdo seja sempre relevante e preciso.
            </li>
          </ul>

          <p className="text-lg leading-relaxed mb-4">
            Ao oferecer uma política de cancelamento clara e justa, o Caça
            Atividades Escolares demonstra seu compromisso com a satisfação do
            cliente e fortalece a confiança na nossa marca. Para qualquer
            dúvida, entre em contato conosco através do nosso WhatsApp.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Caso ainda tenha dúvidas e deseja esclarecer de forma rápida,
            confira a nossa sessão de FAQ:{" "}
            <a
              href="https://www.cacaatividadesescolares.com.br"
              className="text-blue-600 underline"
            >
              www.cacaatividadesescolares.com.br
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CancelPolitic;
