import { FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const Banners = () => {
  const [banners, setBanners] = useState<string[]>([
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
    "/images/banner5.jpg",
    "/images/banner6.jpg",
  ]);

  const handleAddBanner = () => {
    // Lógica para adicionar um novo banner (aqui você pode abrir um modal ou algo similar)
    const newBanner = "/images/new-banner.jpg";
    setBanners([...banners, newBanner]);
  };

  const handleRemoveBanner = (index: number) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Banner da loja</h1>
      <div className="bg-white p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Fotos Banner Principal</h2>
        <div className="flex space-x-4">
          <div
            onClick={handleAddBanner}
            className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
          >
            <FaPlus className="text-gray-500" />
            <span className="ml-2 text-sm text-gray-500">Adicionar foto</span>
          </div>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <Image
                width={100}
                height={100}
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-24 h-24 rounded-lg object-cover border p-1"
              />
              <button
                onClick={() => handleRemoveBanner(index)}
                className="absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banners;
