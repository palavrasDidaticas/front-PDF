import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-sm py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center w-full px-4 md:px-0">
        {/* Links da NavBar */}
        <div className="flex flex-wrap justify-center items-center gap-x-6">
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/"
            aria-current="page"
          >
            Home
          </Link>
          <span className="text-gray-300">|</span>
          {/* <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Categorias
          </Link> */}
          {/* <span className="text-gray-300">|</span> */}
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/AboutCompany"
            aria-current="page"
          >
            Sobre Nós
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/Free"
            aria-current="page"
          >
            Amostra Grátis
          </Link>
          {/* <span className="text-gray-300">|</span> */}
          {/* <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Ensino Fundamental
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Ensino Médio
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Eletivas
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
