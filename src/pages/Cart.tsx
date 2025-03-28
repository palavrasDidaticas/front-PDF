import React, { useState, useEffect } from "react";
import { ProductData } from "@/interfaces/ProductData";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { payment } from "./api/cartApi"; // API de pagamento
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Importar os componentes do Dialog
import { EditAbout } from "@/pages/api/about"; // Serviço para atualizar os termos
import { format } from "date-fns";
import { DecodedToken } from "@/interfaces/decodeType";
import decryptJwt from "@/components/decripted/decript";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductData[]>([]);
  const [billingType, setBillingType] = useState("PIX");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); // Estado para abrir o modal
  const [isTermsAgreed, setIsTermsAgreed] = useState(false); // Estado para saber se o usuário concordou com os termos
  const [accountData, setAccountData] = useState<DecodedToken | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    const data = decryptJwt();
    setAccountData(data);
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);

    if (!token) {
      window.location.href = "Login";
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const removeItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handlePayment = async () => {
    if (!isTermsAgreed) {
      setIsTermsModalOpen(true); // Abre o modal se os termos não forem aceitos
      return;
    }

    const jwtToken = sessionStorage.getItem("jwt");
    if (!jwtToken) {
      toast.error("Usuário não autenticado!");
      return;
    }

    const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
    const userId = decodedToken.usuario.id;

    const data = {
      billingType,
      value: totalAmount,
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      description: "Pagamento de produtos",
      idProduto: cartItems.map((item) => item.id),
      idUsuario: userId,
    };

    sessionStorage.setItem(
      "paymentData",
      JSON.stringify({
        productIds: cartItems.map((item) => item.id),
        clientId: userId,
      })
    );

    try {
      const response = await payment(decodedToken.usuario.cpf, data);
      if (response && response.resultado && response.resultado.invoiceUrl) {
        window.open(response.resultado.invoiceUrl, "_blank");
      } else {
        toast.error("Erro ao obter o link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      toast.error("Erro ao processar o pagamento!");
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleTermsAgree = async () => {
    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"); // Data e hora atual

    try {
      await EditAbout({ termos: currentDate }, accountData!.usuario.id);
      setIsTermsAgreed(true);
      handlePayment();
      setIsTermsModalOpen(false);
      toast.success("Você concordou com os termos.");
    } catch (error) {
      toast.error("Erro ao salvar a aceitação dos termos.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-8">Carrinho</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FiBookOpen className="text-blue-600 w-40 h-40 mb-8" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Seu carrinho está vazio!
          </h2>
          <p className="text-gray-500 text-center text-lg mt-2">
            Parece que você ainda não adicionou nenhum eBook ao seu carrinho.
          </p>
          <button
            onClick={() => router.push("/categories")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Explorar eBooks
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2">Produto</th>
                    <th className="py-2">Valor</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div className="ml-4">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              Código: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">R${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-4">
              <div className="border p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">
                  Escolha a sua forma de pagamento
                </h2>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="pix"
                      name="billingType"
                      value="PIX"
                      checked={billingType === "PIX"}
                      onChange={() => setBillingType("PIX")}
                      className="mr-2"
                    />
                    <label htmlFor="pix">Pagamento via PIX</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="creditCard"
                      name="billingType"
                      value="CREDIT_CARD"
                      checked={billingType === "CREDIT_CARD"}
                      onChange={() => setBillingType("CREDIT_CARD")}
                      className="mr-2"
                    />
                    <label htmlFor="creditCard">
                      Pagamento via Cartão de Crédito
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <p>Subtotal: R${totalAmount.toFixed(2)}</p>
                  <p className="font-semibold">
                    Total: R${totalAmount.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Pagar Agora
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de Aviso de Termos */}
      <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
        <DialogContent className="p-4 bg-white rounded-lg shadow-xl max-w-lg w-full space-y-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              AVISO IMPORTANTE
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-sm text-gray-600 space-y-4">
            <p className="leading-relaxed">
              <strong className="font-semibold">
                USO EXCLUSIVO COM OS SEUS ALUNOS
              </strong>
              .
              <span className="block mt-2">
                É PROIBIDA A REPRODUÇÃO, VENDA E COMPARTILHAMENTO DESTE
                MATERIAL. TODAS AS APOSTILAS DO CAÇA ATIVIDADES ESCOLARES ESTÃO
                PROTEGIDAS COM SENHA, DE USO PESSOAL DO COMPRADOR.
              </span>
              <span className="block mt-2">
                ALÉM DISSO, EM TODAS AS PÁGINAS, ESTÃO O SEU NOME E UM CÓDIGO DE
                COMPRA PARA LOCALIZAR RAPIDAMENTE O <strong>DONO</strong> DO
                MATERIAL.
              </span>
              <span className="block mt-2">
                A VIOLAÇÃO DOS DIREITOS EXCLUSIVOS DO PRODUTOR SOBRE AS OBRAS É
                CRIME (ARTIGO 184 DO CÓDIGO PENAL). CASO SEJA FEITA A
                REPRODUÇÃO, VENDA OU COMPARTILHAMENTO, NOS RESERVAMOS O DIREITO
                DE ENTRAR COM PROCESSOS E AÇÕES LEGAIS PARA RESPONSABILIZÁ-LO
                POR PLÁGIO E DANOS AOS DIREITOS AUTORAIS.
              </span>
              <span className="block mt-2">
                AGRADECEMOS DESDE JÁ A SUA COLABORAÇÃO PARA QUE ESTE MATERIAL
                NÃO SEJA REPRODUZIDO. BOM USO!
              </span>
            </p>

            {/* Dados do Usuário */}
            <div className="mt-6 p-2 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-base text-gray-800 font-medium">
                Dados do Usuário:
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <strong className="font-semibold text-base">Nome:</strong>{" "}
                {accountData?.usuario.nome}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <strong className="font-semibold text-base">CPF:</strong>{" "}
                {accountData?.usuario.cpf}
              </p>
            </div>
          </DialogDescription>

          <DialogFooter className="flex justify-center mt-8">
            <button
              onClick={handleTermsAgree}
              className="px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-md shadow-md transition-transform transform hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Estou ciente e concordo
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
