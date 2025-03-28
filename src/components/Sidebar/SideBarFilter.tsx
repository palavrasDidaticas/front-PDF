import React, { useState } from "react";
import { TbRectangle } from "react-icons/tb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Ícones para expandir/recolher

interface FiltersProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRange: string;
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Estado do acordeão no mobile
  const [openSection, setOpenSection] = useState<string | null>(null); // Estado para abrir seção específica

  const categories = [
    "Novo Ensino Médio",
    "Alfabetização",
    "Arte",
    "Biologia",
    "Ciências",
    "Datas comemorativas e Apostila das cores",
    "Educação Física",
    "Ensino Religioso",
    "Filosofia",
    "Física",
    "Geografia",
    "História",
    "Inglês",
    "Língua Portuguesa",
    "Matemática",
    "Eletiva",
    "Química",
    "Sociologia",
  ];

  const priceRanges = [
    { range: "0-25", label: "de R$0,00 a R$25,00" },
    { range: "25-50", label: "de R$25,00 a R$50,00" },
    { range: "50-100", label: "de R$50,00 a R$100,00" },
    { range: "100-250", label: "de R$100,00 a R$250,00" },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRange(priceRange);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full md:w-auto bg-white p-4 border md:border-none">
      {/* Botão para abrir/fechar filtros no mobile */}
      <button
        onClick={toggleAccordion}
        className="md:hidden flex items-center justify-between w-full bg-blue-600 text-white px-4 py-3 rounded-md font-semibold"
      >
        Filtros
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </button>

      {/* Conteúdo do acordeão no mobile */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Filtro por Categoria */}
        <div className="mt-4 md:mt-0 border-b pb-4">
          <button
            onClick={() => toggleSection("categorias")}
            className="flex justify-between items-center w-full text-lg font-semibold py-2 text-gray-800"
          >
            Categorias
            {openSection === "categorias" ? (
              <FiChevronUp size={20} />
            ) : (
              <FiChevronDown size={20} />
            )}
          </button>
          {openSection === "categorias" && (
            <ul className="flex flex-col gap-2 mt-2">
              {categories.map((name) => (
                <li
                  key={name}
                  className={`flex items-center p-2 border-b cursor-pointer transition-colors ${
                    selectedCategories.includes(name)
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 hover:bg-blue-100"
                  }`}
                  onClick={() => handleCategoryChange(name)}
                >
                  <span className="font-medium">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filtro por Preço */}
        <div className="mt-4 border-b pb-4">
          <button
            onClick={() => toggleSection("preco")}
            className="flex justify-between items-center w-full text-lg font-semibold py-2 text-gray-800"
          >
            Filtrar por Preço
            {openSection === "preco" ? (
              <FiChevronUp size={20} />
            ) : (
              <FiChevronDown size={20} />
            )}
          </button>
          {openSection === "preco" && (
            <ul className="flex flex-col gap-2 mt-2">
              {priceRanges.map(({ range, label }) => (
                <li
                  key={range}
                  className={`flex items-center p-2 border-b cursor-pointer transition-colors ${
                    selectedPriceRange === range
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 hover:bg-blue-100"
                  }`}
                  onClick={() => handlePriceRangeChange(range)}
                >
                  <TbRectangle className="mr-2 text-xl" />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
