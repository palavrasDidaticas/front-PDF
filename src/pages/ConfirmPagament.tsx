import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { paymentOK } from "./api/cartApi"; // Seu método de envio para o backend
import { toast } from "react-toastify";

const ConfirmPayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // Pega os dados do sessionStorage
        const paymentData = JSON.parse(
          sessionStorage.getItem("paymentData") || "{}"
        );

        if (!paymentData.productIds || !paymentData.clientId) {
          toast.error("Dados de pagamento inválidos.");
          router.push("/Cart");
          return;
        }

        // Chama a API para confirmar o pagamento
        await paymentOK({
          productIds: paymentData.productIds,
          clientId: paymentData.clientId,
        });

        // Atualize o status do pagamento com sucesso
        toast.success("Pagamento confirmado!");

        // Limpa o carrinho
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("paymentData");

        // Redireciona para a página desejada
        router.push("/About");
      } catch (error) {
        console.error("Erro ao confirmar o pagamento:", error);
        toast.error("Erro ao confirmar o pagamento.");
        router.push("/Cart");
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [router]);

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Confirmando o pagamento...</p>
      </div>
    );
  }

  return null;
};

export default ConfirmPayment;
