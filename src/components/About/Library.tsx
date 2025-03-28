"use client";
import { useEffect, useState } from "react";
import { ProductData } from "@/interfaces/ProductData";
import { toast } from "react-toastify";
import decryptJwt from "../decripted/decript";
import { GetAbout } from "@/pages/api/about";
import { getProductById } from "@/pages/api/LIbraryApi";
import PdfCardComponent from "../card/PdfCardComponent";
import { useRouter } from "next/navigation";

const Library = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameUser, setNameUser] = useState<string>("");
  const [cpfUser, setCpfUser] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Obtém o token decodificado (dados do usuário) usando decryptJwt
        const data = decryptJwt();
        // Chama GetAbout para obter os dados da conta e as compras
        const response = await GetAbout(data!.usuario.id);
        const compras: string[] = response.data.usuario.compras;
        setNameUser(response.data.usuario.nome);
        setCpfUser(response.data.usuario.cpf);

        if (!compras || compras.length === 0) {
          setCards([]);
          setLoading(false);
          return;
        }

        // Para cada ID de compra, chama getProductById para obter os detalhes do produto
        const productPromises = compras.map((id) =>
          getProductById(parseInt(id))
        );
        // Utiliza Promise.allSettled para processar todas as requisições, mesmo se alguma falhar
        const results = await Promise.allSettled(productPromises);
        const successfulProducts = results
          .filter((result) => result.status === "fulfilled")
          .map((result: any) => result.value);

        // Mapeia os dados recebidos para o formato esperado pelo ProductData
        const mappedProducts: ProductData[] = successfulProducts.map(
          (product: any) => ({
            id: product.id.toString(),
            title: product.nome_produto,
            description: product.descricao,
            price: parseFloat(product.valor),
            link: product.link || "/categories",
            imageSrc:
              product.fotos && product.fotos.length > 0
                ? `data:image/png;base64,${product.fotos[0]}`
                : "/path/to/default-image.png",
            imageAlt: product.nome_produto,
            category: product.categoria,
            nivelEnsino: product.nivel_ensino,
            url: product.url || "",
          })
        );

        // Exibe mensagem de erro via toast se alguma requisição falhar (opcional)
        const rejectedCount = results.filter(
          (result) => result.status === "rejected"
        ).length;
        if (rejectedCount > 0) {
          toast.info(`${rejectedCount} produto(s) não puderam ser carregados.`);
        }

        setCards(mappedProducts);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar suas compras.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Biblioteca</h2>
      <div className="bg-white p-6 ">
        {loading ? (
          <div className="text-center p-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-gray-500 mb-4">
              Você não possui nenhum produto adquirido.
            </p>
            <button
              onClick={() => router.push("/categories")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <PdfCardComponent
                userCPF={cpfUser}
                key={index}
                category={card.category}
                description={card.description}
                link={card.link}
                nivelEnsino={card.nivelEnsino}
                price={card.price}
                url={card.url}
                id={card.id}
                title={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                userName={nameUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
