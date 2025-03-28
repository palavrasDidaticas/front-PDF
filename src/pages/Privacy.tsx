import { NextPage } from "next";
import Head from "next/head";

const Privacy: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Política de Privacidade</title>
        <meta
          name="description"
          content="Política de Privacidade do site Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-left">
        <div className="w-full max-w-4xl p-8 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-start">
            POLÍTICA DE PRIVACIDADE
          </h1>

          <p className="text-lg leading-relaxed mb-4">
            A sua privacidade é extremamente importante para nós.
            Comprometemo-nos a respeitar sua privacidade e proteger qualquer
            informação pessoal que você possa fornecer através do nosso site,
            Caça Atividades Escolares, localizado em
            https://www.cacapalavrasescolares.com.br.
          </p>

          <h2 className="text-xl font-bold mb-4">Coleta de Informações</h2>
          <p className="text-lg leading-relaxed mb-4">
            Solicitamos suas informações pessoais apenas quando elas são
            estritamente necessárias para fornecer nossos serviços a você.
            Coletamos essas informações de maneira justa e legal, com seu
            conhecimento e consentimento explícito. Também informamos os motivos
            da coleta e como essas informações serão utilizadas.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Uso e Armazenamento de Informações
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Retemos as informações coletadas somente pelo tempo necessário para
            fornecer o serviço solicitado. Armazenamos dados protegidos por
            medidas de segurança tecnicamente adequadas para prevenir perda,
            roubo, acesso não autorizado, divulgação, cópia, uso ou alteração.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Compartilhamento de Informações
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Não compartilhamos suas informações pessoais publicamente nem com
            terceiros, exceto quando exigido por lei.
          </p>

          <h2 className="text-xl font-bold mb-4">Sites Externos</h2>
          <p className="text-lg leading-relaxed mb-4">
            Nosso site pode conter links para sites externos que não são
            operados por nós. Tenha em mente que não controlamos esses sites e
            não podemos assumir responsabilidade por suas políticas de
            privacidade.
          </p>

          <h2 className="text-xl font-bold mb-4">Recusa de Informações</h2>
          <p className="text-lg leading-relaxed mb-4">
            Você pode optar por não fornecer suas informações pessoais, com o
            entendimento de que isso pode impedir que lhe forneçamos
            determinados serviços.
          </p>

          <h2 className="text-xl font-bold mb-4">Aceitação desta Política</h2>
          <p className="text-lg leading-relaxed mb-4">
            O uso contínuo de nosso site indica a aceitação de nossa política de
            privacidade. Se você tiver dúvidas sobre como gerenciamos dados do
            usuário e informações pessoais, não hesite em nos contactar.
          </p>

          <h2 className="text-xl font-bold mb-4">Publicidade e Cookies</h2>
          <p className="text-lg leading-relaxed mb-4">
            Utilizamos o Google AdSense para veicular publicidade, que usa um
            cookie DoubleClick para servir anúncios relevantes e limitar a
            repetição de anúncios. Mais informações sobre as práticas de
            privacidade do Google AdSense podem ser obtidas diretamente em sua
            FAQ.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Os cookies de publicidade comportamental são empregados para
            garantir que os anúncios sejam relevantes para você, rastreando seus
            interesses de maneira anônima.
          </p>

          <h2 className="text-xl font-bold mb-4">Compromisso do Usuário</h2>
          <p className="text-lg leading-relaxed mb-4">
            Ao usar o site Caça Atividades Escolares, você se compromete a:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
            <li>
              Não realizar atividades ilegais ou contrárias à ética e à ordem
              pública;
            </li>
            <li>
              Não difundir conteúdo discriminatório, ilegal ou que promova
              atividades prejudiciais contra os direitos humanos;
            </li>
            <li>
              Não causar danos aos sistemas físicos e lógicos de Caça Atividades
              Escolares, seus fornecedores ou terceiros.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4">Mais Informações</h2>
          <p className="text-lg leading-relaxed mb-4">
            Esperamos que você esteja esclarecido sobre os cookies. Se não tiver
            certeza sobre algo, recomendamos deixar os cookies ativados para
            garantir que funcionalidades do nosso site operem conforme esperado.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
