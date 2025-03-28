import { useState, useEffect } from "react";
import { fetchOrderData } from "@/pages/api/OrderApi";

// Definindo a interface para as transações
interface Transaction {
  client: string;
  order: string;
  value: string; // Valor formatado como string
  status: string;
  date: string; // Data como string para exibir e comparar
}

// Função para filtrar transações pelo período selecionado
const filterByPeriod = (
  transactions: Transaction[],
  start: string,
  end: string
) => {
  if (!start || !end) return transactions;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

const Finance = () => {
  const [startDate, setStartDate] = useState<string>(""); // Data de início
  const [endDate, setEndDate] = useState<string>(""); // Data de fim
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Função para traduzir o status
  const translateStatus = (status: string): string => {
    switch (status) {
      case "CONFIRMED":
        return "Confirmado";
      case "PENDING":
        return "Pendente";
      case "CANCELLED":
        return "Cancelado";
      default:
        return "Outro";
    }
  };

  // Formata o valor monetário para o padrão brasileiro
  const formatValue = (value: number): string => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  // Função para validar e formatar a data
  const formatDate = (dateString: string | null | undefined): string => {
    const date = new Date(dateString || "");
    // Verifica se a data é válida
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0]; // Retorna no formato 'YYYY-MM-DD'
    } else {
      return ""; // Retorna uma string vazia se a data for inválida
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetchOrderData();
        const formattedData: Transaction[] = response.map((order: any) => ({
          client: order.customer,
          order: order.invoiceNumber,
          value: formatValue(order.value),
          status: translateStatus(order.status),
          date: formatDate(order.clientPaymentDate || order.confirmedDate), // Usa a função de validação de data
        }));
        setTransactions(formattedData);
        setFilteredTransactions(formattedData); // Inicialmente exibe todas
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = filterByPeriod(transactions, startDate, endDate);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Exibir todas se as datas não estiverem definidas
    }
  }, [startDate, endDate, transactions]);

  const stats = {
    transactions: filteredTransactions.length,
    averageTicket: formatValue(
      filteredTransactions.reduce(
        (acc, curr) =>
          acc + parseFloat(curr.value.replace("R$", "").replace(",", ".")),
        0
      ) / filteredTransactions.length || 0
    ),
    totalGross: formatValue(
      filteredTransactions.reduce(
        (acc, curr) =>
          acc + parseFloat(curr.value.replace("R$", "").replace(",", ".")),
        0
      )
    ),
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-end mb-4">
        <div className="mb-4 md:mb-0 md:mr-4">
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Início
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Fim
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">
            Quantidade de transações
          </h3>
          <p className="mt-2 text-2xl font-semibold">{stats.transactions}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
          <p className="mt-2 text-2xl font-semibold">{stats.averageTicket}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Bruto</h3>
          <p className="mt-2 text-2xl font-semibold">{stats.totalGross}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4">
                  <p className="text-gray-500">Carregando...</p>
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.client}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm text-gray-500">
                      {transaction.order}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm text-gray-500">
                      {transaction.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm text-gray-500">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Nenhuma transação encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
