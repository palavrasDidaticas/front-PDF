import { NextPage } from "next";
import Head from "next/head";

const TermosUso: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Termos de Uso</title>
        <meta
          name="description"
          content="Termos de Uso do site Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-left">
        <div className="w-full max-w-4xl p-8 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-start">TERMOS DE USO</h1>
          
          <p className="text-lg leading-relaxed mb-4">
            Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>
          
          <h2 className="text-xl font-bold mb-4">2. Uso de Licença</h2>
          <p className="text-lg leading-relaxed mb-4">
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Caça Atividades Escolares, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
            <li>Modificar ou copiar os materiais;</li>
            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Caça Atividades Escolares;</li>
            <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>Transferir os materiais para outra pessoa ou {'espelhar'} os materiais em qualquer outro servidor.</li>
          </ul>
          <p className="text-lg leading-relaxed mb-4">
            Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Caça Atividades Escolares a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
          </p>
          
          <h2 className="text-xl font-bold mb-4">3. Isenção de responsabilidade</h2>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
            <li>Os materiais no site da Caça Atividades Escolares são fornecidos {'como estão'}. Caça Atividades Escolares não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
            <li>Além disso, o Caça Atividades Escolares não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
          </ul>
          
          <h2 className="text-xl font-bold mb-4">4. Limitações</h2>
          <p className="text-lg leading-relaxed mb-4">
            Em nenhum caso o Caça Atividades Escolares ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Caça Atividades Escolares, mesmo que Caça Atividades Escolares ou um representante autorizado da Caça Atividades Escolares tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
          </p>
          
          <h2 className="text-xl font-bold mb-4">5. Precisão dos materiais</h2>
          <p className="text-lg leading-relaxed mb-4">
            Os materiais exibidos no site da Caça Atividades Escolares podem incluir erros técnicos, tipográficos ou fotográficos. Caça Atividades Escolares não garante que qualquer material em seu site seja preciso, completo ou atual. Caça Atividades Escolares pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Caça Atividades Escolares não se compromete a atualizar os materiais.
          </p>
          
          <h2 className="text-xl font-bold mb-4">6. Links</h2>
          <p className="text-lg leading-relaxed mb-4">
            O Caça Atividades Escolares não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Caça Atividades Escolares do site. O uso de qualquer site vinculado é por conta e risco do usuário.
          </p>
          
          <h2 className="text-xl font-bold mb-4">Modificações</h2>
          <p className="text-lg leading-relaxed mb-4">
            O Caça Atividades Escolares pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>
          
          <h2 className="text-xl font-bold mb-4">Lei aplicável</h2>
          <p className="text-lg leading-relaxed mb-4">
            Estes termos e condições são regidos e interpretados de acordo com as leis do Caça Atividades Escolares e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermosUso;
