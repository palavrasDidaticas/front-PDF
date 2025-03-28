import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditAbout } from "@/pages/api/about";
import decryptJwt from "@/components/decripted/decript";
import { DecodedToken } from "@/interfaces/decodeType";
import InputMask from "react-input-mask";

interface EditAddressModalProps {
  triggerUpdate: () => void;
  defaultAddress: {
    endereco: string;
    bairro: string;
    cidadeuf: string;
    cep: string;
    pais: string;
  };
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  triggerUpdate,
  defaultAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountData, setAccountData] = useState<DecodedToken | null>(null);

  const fetchData = () => {
    try {
      const data = decryptJwt();
      setAccountData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      rua: formData.get("endereco"),
      bairro: formData.get("bairro"),
      cidadeUF: formData.get("cidadeuf"),
      cep: formData.get("cep"),
      pais: formData.get("pais"),
    };

    try {
      const response = await EditAbout(data, accountData!.usuario.id);
      if (response.status === 200) {
        toast.success("Endereço alterado com sucesso!");
        triggerUpdate();
        setIsOpen(false);
      }
    } catch (error: any) {
      if (error.response) {
        const { error: errorMessage, message } = error.response.data;
        toast.error(`${errorMessage}: ${message}`, {
          autoClose: 4000,
        });
      } else {
        toast.error("Erro ao alterar o endereço.");
        console.error("Erro ao alterar o endereço:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Editar Endereço Principal
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Endereço Principal
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para editar o endereço principal.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="endereco"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              defaultValue={defaultAddress.endereco}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="bairro"
              className="block text-sm font-medium text-gray-700"
            >
              Bairro
            </label>
            <input
              type="text"
              name="bairro"
              defaultValue={defaultAddress.bairro}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="cidadeuf"
              className="block text-sm font-medium text-gray-700"
            >
              Cidade/UF
            </label>
            <input
              type="text"
              name="cidadeuf"
              defaultValue={defaultAddress.cidadeuf}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-700"
            >
              CEP
            </label>
            <InputMask
              mask="99999-999"
              name="cep"
              defaultValue={defaultAddress.cep}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="pais"
              className="block text-sm font-medium text-gray-700"
            >
              País
            </label>
            <input
              type="text"
              name="pais"
              defaultValue={defaultAddress.pais}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <DialogFooter className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Salvar
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressModal;
