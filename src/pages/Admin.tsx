import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SidebarAdmin from "@/components/Sidebar/SideBarAdmin"; // Use o novo SidebarAdmin
import { useRouter } from "next/navigation";

// Importar componentes específicos de administração
const Users = dynamic(() => import("@/components/AdminComponents/Users"));
const Products = dynamic(() => import("@/components/AdminComponents/Products"));
const Finance = dynamic(() => import("@/components/AdminComponents/Finance"));
const Banners = dynamic(() => import("@/components/AdminComponents/Banners"));

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Users");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (!token) {
      window.location.href = "Login";
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (activeComponent) {
      case "Users":
        return <Users />;
      case "Products":
        return <Products />;
      case "Finance":
        return <Finance />;
      case "Banners":
        return <Banners />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SidebarAdmin
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className="md:flex-grow p-6">{renderContent()}</div>
    </div>
  );
};

export default Admin;
