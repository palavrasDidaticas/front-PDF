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
import axios from "axios";
import { toast } from "react-toastify";
import { EditAbout } from "@/pages/api/about";
import { DecodedToken } from "@/interfaces/decodeType";
import decryptJwt from "@/components/decripted/decript";
import InputMask from "react-input-mask";

interface EditDataModalProps {
  triggerUpdate: () => void;
  defaultData: {
    nome: string;
    sexo: string;
    dataNascimento: string;
    email: string;
    telefoneCelular: string;
  };
}

const EditDataModal: React.FC<EditDataModalProps> = ({
  triggerUpdate,
  defaultData,
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
      nome: formData.get("nome"),
      sexo: formData.get("sexo"),
      dataNascimento: formData.get("dataNascimento"),
      email: formData.get("email"),
      telefoneCelular: formData.get("telefoneCelular"),
    };

    try {
      const response = await EditAbout(data, accountData!.usuario.id);
      if (response.status === 200) {
        toast.success("Dados alterados com sucesso!", {
          autoClose: 2000,
        });
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
        toast.error("Erro ao alterar os dados.");
        console.error("Erro ao alterar os dados:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Editar Dados
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Dados
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Preencha os campos abaixo para editar seus dados.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              name="nome"
              defaultValue={defaultData.nome}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label
              htmlFor="dataNascimento"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Nascimento
            </label>
            <InputMask
              mask="99/99/9999"
              name="dataNascimento"
              defaultValue={defaultData.dataNascimento}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={defaultData.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="telefoneCelular"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone Celular
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="telefoneCelular"
              defaultValue={defaultData.telefoneCelular}
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

export default EditDataModal;
