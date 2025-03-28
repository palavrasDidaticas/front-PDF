import { NextPage } from "next";
import Head from "next/head";

const AboutCompany: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Sobre</title>
        <meta
          name="description"
          content="Sobre a Empresa Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-left">
        <div className="w-full max-w-4xl p-8 bg-white  border-gray-300 rounded-md">
          <h1 className="text-3xl font-bold mb-6 text-start">
            Bem-vindo(a) ao Caça Atividades Escolares!
          </h1>
          <p className="text-lg leading-relaxed mb-4">
            Eu sou o Professor Eduardo Menandes, leciono Geografia na Rede
            Pública de Minas Gerais, na Região Metropolitana de Belo Horizonte
            há mais de 15 anos. Nós somos apaixonados por transformar o ensino
            em uma experiência enriquecedora tanto para professores quanto para
            alunos. Compreendemos os desafios do dia a dia na sala de aula e
            sabemos que materiais didáticos de qualidade podem fazer toda a
            diferença no aprendizado. Por isso, nossa missão é fornecer recursos
            educacionais que inspirem, motivem e facilitem o trabalho dos
            educadores.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Desde 2020, quando idealizamos o Caça-palavras Didáticos, temos o
            compromisso de oferecer produtos que atendam às necessidades
            específicas de cada disciplina, sempre com a preocupação de manter a
            excelência em conteúdo, praticidade e inovação. Nosso portfólio
            inclui uma ampla gama de materiais didáticos, alinhados à BNCC e aos
            Planos de Curso Estaduais. Prezamos por atividades criativas e
            recursos digitais que integram as mais recentes tecnologias
            educacionais.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Nosso time é formado por especialistas em educação, designers e
            pedagogos que, juntos, criam soluções práticas e eficazes para o
            ensino. Estamos sempre atentos às mudanças no cenário educacional e
            prontos para oferecer materiais que acompanhem as tendências e as
            exigências atuais.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Aqui no Caça Atividades Escolares, acreditamos que a educação é a
            chave para um futuro melhor, e estamos aqui para ajudar você,
            professor(a), a abrir as portas desse futuro para seus alunos. Seja
            para dinamizar suas aulas, inovar no uso de novas metodologias ou
            simplesmente ter mais tempo para o que realmente importa, nós temos
            a solução que você precisa.
          </p>
          <p className="text-lg leading-relaxed mb-4 font-semibold">
            Obrigado(a) por escolher o Caça Atividades Escolares. Juntos, vamos
            transformar a educação!
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutCompany;
