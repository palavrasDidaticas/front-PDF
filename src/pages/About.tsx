import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar/SideBarAbout";
import { useRouter } from "next/navigation";

const Account = dynamic(() => import("@/components/About/Account"));
const Orders = dynamic(() => import("@/components/About/Orders"));
const Library = dynamic(() => import("@/components/About/Library"));

const About = () => {
  const [activeComponent, setActiveComponent] = useState("Account");
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
      case "Account":
        return <Account />;
      case "Orders":
        return <Orders />;
      case "Library":
        return <Library />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row ">
      <Sidebar
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      <div className="md:flex-grow p-6">{renderContent()}</div>
    </div>
  );
};

export default About;
