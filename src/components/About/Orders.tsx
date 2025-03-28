// src/pages/about/orders.tsx
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { OrderData } from "@/interfaces/OrderData";
import { fetchOrderDataBycpf } from "@/pages/api/OrderApi";
import decryptJwt from "../decripted/decript";
import { useRouter } from "next/navigation";

const Orders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cpf, setCpf] = useState<string>("");
  const router = useRouter();

  // Função para traduzir o tipo de pagamento
  const translatePaymentType = (billingType: string) => {
    switch (billingType) {
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "PIX":
        return "PIX";
      case "BOLETO":
        return "Boleto";
      default:
        return "Outro";
    }
  };

  // Função para traduzir o status
  const translateStatus = (status: string) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const correctedDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return correctedDate.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verifica se o código está sendo executado no lado do cliente
      setTimeout(() => {
        const token = sessionStorage.getItem("jwt");
        if (token) {
          const decodedToken = decryptJwt();
          if (decodedToken) {
            setCpf(decodedToken.usuario.cpf);
          }
        }
      }, 4000);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!cpf) return;
      try {
        const response = await fetchOrderDataBycpf(cpf);
        const formattedData = response.map((order: any) => ({
          id: order.id,
          dataHora: formatDate(order.clientPaymentDate || order.confirmedDate),
          pagamento: translatePaymentType(order.billingType),
          status: translateStatus(order.status),
          valor: `R$ ${order.value.toFixed(2)}`,
        }));

        setOrders(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cpf]);

  const columns = [
    {
      name: "Pedido",
      selector: (row: OrderData) => row.id,
      sortable: true,
    },
    {
      name: "Data/Hora",
      selector: (row: OrderData) => row.dataHora,
      sortable: true,
    },
    {
      name: "Pagamento",
      selector: (row: OrderData) => row.pagamento,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: OrderData) => row.status,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row: OrderData) => row.valor,
      sortable: true,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Pedidos por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Meus Pedidos</h2>
      {loading ? (
        <div className="text-center p-6">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p className="mt-2 text-gray-500">Carregando...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center p-6">
          <p className="mb-4 text-gray-500">Você não possui nenhum pedido.</p>
          <button
            onClick={() => router.push("/categories")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ver Produtos
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 border-2 rounded-xl">
          <DataTable
            columns={columns}
            data={orders}
            progressPending={loading}
            noDataComponent="Nenhum pedido encontrado"
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[6, 10, 16, 20]}
            paginationPerPage={6}
            pagination
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
