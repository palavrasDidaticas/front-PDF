"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/images/logoAtualizadaFotter.png";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do menu e de fechamento
import decryptJwt from "../decripted/decript";
import SearchBar from "../searchBar/searchBar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado do menu sanduíche
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("jwt");
      if (token) {
        const decodedToken = decryptJwt();
        if (decodedToken) {
          setUserData(decodedToken);
          setAdmin(decodedToken.usuario.admin);
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Função para atualizar a contagem do carrinho
    const updateCartCount = () => {
      const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
      setCartCount(cartItems.length);
    };

    updateCartCount(); // Atualiza ao montar o componente

    // Adiciona um evento de escuta para mudanças no sessionStorage
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-blue-800">
      <nav className="flex items-center justify-between w-full px-4 py-2.5 md:py-4 lg:px-8 mx-auto max-w-screen-2xl">
        {/* Logo */}
        <div className="flex-initial w-[30%]">
          <Link href={"/"} className="flex items-center">
            <Image src={logo} alt="Logo" width={200} height={100} />
          </Link>
        </div>

        {/* Ícone do menu sanduíche para dispositivos móveis */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>

        {/* Menu completo - esconde em dispositivos móveis */}
        <div
          className={`w-[70%] md:flex ${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center justify-end`}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Form */}
            <div className="w-full min-w-96 md:flex items-center relative hidden">
              <SearchBar />
            </div>

            {/* Welcome Message */}
            <Link href={"/About"}>
              <div className="min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
                    fill="black"
                  />
                </svg>
                {userData && userData.usuario.nome !== null ? (
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    {userData.usuario.nome}
                  </span>
                ) : (
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    Seja Bem-vindo
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon */}
            <Link href={"/Cart"}>
              <div className="relative min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 1H5.82993L6.57993 5H23.443L19.693 15H8.45493L8.82993 17H19V19H7.17007L4.17007 3H1V1ZM8.07993 13H18.307L20.557 7H6.95493L8.07993 13Z"
                    fill="black"
                  />
                  <path
                    d="M8 21.5C8 20.6716 8.67157 20 9.5 20C10.3284 20 11 20.6716 11 21.5C11 22.3284 10.3284 23 9.5 23C8.67157 23 8 22.3284 8 21.5Z"
                    fill="black"
                  />
                  <path
                    d="M15 21.5C15 20.6716 15.6716 20 16.5 20C17.3284 20 18 20.6716 18 21.5C18 22.3284 17.3284 23 16.5 23C15.6716 23 15 22.3284 15 21.5Z"
                    fill="black"
                  />
                </svg>
                <span className="text-neutral-700 text-sm whitespace-nowrap">
                  Seu Carrinho
                </span>

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Admin Icon */}
            {admin && (
              <Link href={"/Admin"}>
                <div className="min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                  <svg
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
                      fill="black"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
                      fill="black"
                    />
                  </svg>
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    Admin
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
