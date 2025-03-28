import { useState } from "react";
import Select from "react-select";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/pages/api/api";
import { ProductAdmin } from "@/interfaces/ProductData";

export interface OptionType {
  label: string;
  value: string;
}

interface CombosProductsProps {
  triggerUpdate: () => void;
  products: ProductAdmin[];
}

const CombosProducts: React.FC<CombosProductsProps> = ({
  triggerUpdate,
  products,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivelEnsino, setNivelEnsino] = useState("");
  const [valor, setValor] = useState("");
  const [componenteCurricular, setComponenteCurricular] = useState("");
  const [url, setUrl] = useState(""); // Novo estado para a URL
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [fotoFiles, setFotoFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categorias = [
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
    "Química",
    "Sociologia",
    "Eletivas",
  ];

  // Converte os produtos em opções para o react-select
  const options: OptionType[] = products.map((product) => ({
    label: product.nome_produto,
    value: product.id.toString(),
  }));

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const isValid = Array.from(files).every((file) => {
        if (file.size > 1024 * 1024) {
          toast.error(
            `A imagem ${file.name} excede o limite de 1 MB. Por favor, escolha outra imagem.`
          );
          return false;
        }
        return true;
      });
      if (isValid) {
        setFotoFiles(files);
      } else {
        setFotoFiles(null);
      }
    }
  };

  // Formata o valor para moeda brasileira
  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = (Number(cleanValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    return formattedValue.replace(/\./g, "");
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatCurrency(e.target.value));
  };

  // Função para fazer upload de uma imagem em partes (chunks)
  const uploadImageInParts = async (
    file: File,
    fileIndex: number,
    totalFiles: number,
    selectedProductIds: string[]
  ) => {
    const partSize = 1024 * 1024 * 2; // 2 MB por parte
    const totalParts = Math.ceil(file.size / partSize);
    const nomeArquivo = file.name;

    for (let i = 0; i < totalParts; i++) {
      const start = i * partSize;
      const end = Math.min(start + partSize, file.size);
      const part = file.slice(start, end);

      const formData = new FormData();
      formData.append("part", part);
      formData.append("partIndex", i.toString());
      formData.append("totalParts", totalParts.toString());
      formData.append("nomeArquivo", nomeArquivo);
      formData.append("nome_produto", nomeProduto);
      formData.append("descricao", descricao);
      formData.append("categoria", categoria);
      formData.append("nivel_ensino", nivelEnsino);
      formData.append("valor", valor.replace("R$", "").trim());
      formData.append("componente_curricular", componenteCurricular);
      formData.append("url", url); 
      formData.append("selectedProducts", JSON.stringify(selectedProductIds));

      try {
        await api.post("/adicionar-produto-v2", formData, {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              // Calcula um progresso geral considerando o índice do arquivo e a parte atual
              setUploadProgress(
                ((fileIndex + (i + 1) / totalParts) / totalFiles) * 100
              );
            }
          },
        });
        
      } catch (error) {
        console.error("Erro ao enviar parte:", error);
        throw error;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOptions.length === 0) {
      toast.error("Selecione pelo menos um produto");
      return;
    }

    if (!fotoFiles) {
      toast.error("Por favor, selecione imagens de até 1 MB.");
      return;
    }

    setLoading(true);
    const selectedProductIds = selectedOptions.map((option) => option.value);

    try {
      const totalFiles = fotoFiles.length;
      for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
        const file = fotoFiles[fileIndex];
        await uploadImageInParts(
          file,
          fileIndex,
          totalFiles,
          selectedProductIds
        );
      }

      toast.success("Combos de produtos associados com sucesso!");
      setLoading(false);
      setIsOpen(false);
      triggerUpdate();

      // Limpa os campos do formulário
      setNomeProduto("");
      setDescricao("");
      setCategoria("");
      setNivelEnsino("");
      setValor("");
      setComponenteCurricular("");
      setUrl(""); // Limpa o campo URL
      setSelectedOptions([]);
      setFotoFiles(null);
    } catch (error) {
      toast.error("Erro ao associar combos de produtos");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <FaPlus className="mr-2" /> Combos de Produtos
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar Combos de Produtos
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para criar produtos já existentes como
            combos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="nomeProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Combo
            </label>
            <input
              type="text"
              id="nomeProduto"
              name="nomeProduto"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="valor"
              className="block text-sm font-medium text-gray-700"
            >
              Valor
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              value={valor}
              onChange={handleValorChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="nivelEnsino"
              className="block text-sm font-medium text-gray-700"
            >
              Nível de Ensino
            </label>
            <select
              id="nivelEnsino"
              name="nivelEnsino"
              value={nivelEnsino}
              onChange={(e) => setNivelEnsino(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Selecione o nível de ensino
              </option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Selecione os produtos para o combo
            </label>
            <Select
              isMulti
              options={options}
              value={selectedOptions}
              onChange={(selected) =>
                setSelectedOptions(selected as OptionType[])
              }
              placeholder="Selecione os produtos..."
            />
          </div>
          <div>
            <label
              htmlFor="fotosProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Fotos do combo
            </label>
            <input
              type="file"
              id="fotosProduto"
              name="fotosProduto"
              onChange={handleFotosChange}
              accept="image/*"
              multiple
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL das imagens
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://exemplo.com/..."
            />
          </div>
          <DialogFooter className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Criar Combos"
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CombosProducts;
