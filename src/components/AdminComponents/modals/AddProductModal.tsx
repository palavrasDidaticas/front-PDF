import { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { addProduct } from "@/pages/api/adminProducts";
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

interface AddProductModalProps {
  triggerUpdate: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ triggerUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivelEnsino, setNivelEnsino] = useState("");
  const [valor, setValor] = useState("");
  const [componenteCurricular, setComponenteCurricular] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fotoFiles, setFotoFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
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

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(e.target.files ? e.target.files[0] : null);
  };

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Verifique o tamanho de cada imagem e impeça a seleção se alguma for maior que 1 MB
      const isValid = Array.from(files).every((file) => {
        if (file.size > 1024 * 1024) {
          // 1 MB
          toast.error(
            `A imagem ${file.name} excede o limite de 1 MB. Por favor, escolha outra imagem.`
          );
          return false;
        }
        return true;
      });

      // Atualiza o estado apenas se todas as imagens forem válidas
      if (isValid) {
        setFotoFiles(files);
      } else {
        setFotoFiles(null); // Nenhuma imagem será definida
      }
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verifique se as fotos são válidas antes de permitir o envio
    if (
      !fotoFiles ||
      Array.from(fotoFiles).some((file) => file.size > 1024 * 1024)
    ) {
      toast.error("Por favor, selecione imagens de até 1 MB.");
      return; // Interrompe o envio se houver alguma imagem inválida
    }
    setLoading(true);

    const partSize = 1024 * 1024 * 2; // 4 MB por parte
    const nomeArquivo = pdfFile?.name || "";
    const totalParts = Math.ceil(pdfFile!.size / partSize || 0);

    const uploadPdfInParts = async (file: File) => {
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

        // Adiciona as fotos apenas na primeira parte
        if (i === 0 && fotoFiles) {
          Array.from(fotoFiles).forEach((file) => {
            formData.append("fotos", file);
          });
        }

        try {
          await api.post("/adicionar-produto-v2", formData, {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                setUploadProgress(progress);
              }
            },
          });

          // Atualiza o progresso do upload
          setUploadProgress(((i + 1) / totalParts) * 100);
        } catch (error) {
          console.error("Erro ao enviar parte:", error);
          setLoading(false);
          return;
        }
      }

      console.log("Upload completo");
      toast.success("Produto Cadastrado com sucesso!");
      setLoading(false);
      setIsOpen(false);
      triggerUpdate();
      // Limpar os campos do formulário
      setNomeProduto("");
      setDescricao("");
      setCategoria("");
      setNivelEnsino("");
      setValor("");
      setComponenteCurricular("");
      setPdfFile(null);
      setFotoFiles(null);
    };

    if (pdfFile) {
      uploadPdfInParts(pdfFile);
    } else {
      alert("Selecione um arquivo PDF para enviar");
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
          <FaPlus className="mr-2" /> Adicionar Produto
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Adicionar Produto
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para adicionar um novo produto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="nomeProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Produto
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

          <div>
            <label
              htmlFor="uploadProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Upload do produto (PDF)
            </label>
            <input
              type="file"
              id="uploadProduto"
              name="uploadProduto"
              onChange={handlePdfChange}
              accept="application/pdf"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://exemplo.com/..."
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
          <div>
            <label
              htmlFor="fotosProduto"
              className="block text-sm font-medium text-gray-700"
            >
              Fotos do produto
            </label>
            <input
              type="file"
              id="fotosProduto"
              name="fotosProduto"
              onChange={handleFotosChange}
              accept="image/*"
              multiple
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
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
                "Adicionar Produto"
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

export default AddProductModal;
