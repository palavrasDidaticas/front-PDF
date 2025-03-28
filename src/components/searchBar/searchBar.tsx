"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getAllProducts } from "@/pages/api/LIbraryApi";
import { FetchedProduct } from "@/interfaces/ProductData";
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<FetchedProduct[]>([]);
  const [allProducts, setAllProducts] = useState<FetchedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null); // Referência para o wrapper do componente

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleProductClick = (productId: number) => {
    router.push(`/page_Product?id=${productId}`);
    setIsDropdownOpen(false); // Fecha o dropdown ao selecionar um produto
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar os resultados com base no input do usuário
  useEffect(() => {
    if (query.trim() !== "") {
      const filtered = allProducts.filter((product) =>
        product.nome_produto.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsDropdownOpen(true); // Abre o dropdown ao digitar
    } else {
      setResults([]);
      setIsDropdownOpen(false); // Fecha o dropdown se a query estiver vazia
    }
  }, [query, allProducts]);

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        {/* Ícone SVG para o campo de busca */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L23.4142 22L22 23.4142L15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Faça sua pesquisa aqui..."
          className="w-full py-3 pl-10 border border-gray-300 rounded-lg text-sm bg-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400"
        />
      </div>

      {/* Feedback de Carregamento */}
      {isLoading && (
        <div className="absolute w-full bg-white p-4 rounded-lg mt-2 shadow-lg z-50 text-center">
          Carregando produtos...
        </div>
      )}

      {/* Resultados da Busca */}
      {!isLoading && isDropdownOpen && results.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-50">
          {results.map((product) => (
            <li
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <Image
                width={50}
                height={50}
                src={
                  product.fotos && product.fotos[0]
                    ? `data:image/png;base64,${product.fotos[0]}`
                    : "/fallback-image.png"
                }
                alt={product.nome_produto}
                className="w-10 h-10 object-cover mr-3"
              />
              <div>
                <p className="font-semibold">{product.nome_produto}</p>
                <p className="text-sm text-gray-600">
                  {truncateText(product.descricao, 100)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Nenhum Resultado Encontrado */}
      {!isLoading && query && results.length === 0 && (
        <div className="absolute w-full bg-white p-4 rounded-lg mt-2 shadow-lg z-50 text-center">
          Nenhum produto encontrado.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
