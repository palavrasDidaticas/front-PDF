import Link from "next/link";
import {
  FaUser,
  FaProductHunt,
  FaDollarSign,
  FaImage,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

const SidebarAdmin: React.FC<SidebarProps> = ({
  setActiveComponent,
  activeComponent,
}) => {
  const handleLogout = () => {
    // Remove o token do sessionStorage
    sessionStorage.removeItem("jwt");
    // Redireciona para a página inicial
    window.location.href = "/";
  };

  return (
    <div className="md:w-1/5 md:h-screen mt-8 bg-white">
      <nav className="mt-4 mx-4">
        <ul className="flex flex-col gap-4">
          <li
            className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition ${
              activeComponent === "Users"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Users")}
          >
            <FaUser className="mr-2" />
            <span>Usuários</span>
          </li>
          <li
            className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition ${
              activeComponent === "Products"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Products")}
          >
            <FaProductHunt className="mr-2" />
            <span>Produtos</span>
          </li>
          <li
            className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition ${
              activeComponent === "Finance"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Finance")}
          >
            <FaDollarSign className="mr-2" />
            <span>Financeiro</span>
          </li>
          {/* <li
            className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition ${
              activeComponent === "Banners"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Banners")}
          >
            <FaImage className="mr-2" />
            <span>Banners Loja</span>
          </li> */}
          <li
            onClick={handleLogout}
            className="flex items-center p-4 border-b-2 border-black text-black hover:bg-blue-200 transition"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
