import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "@/pages/api/users";

interface ChangePasswordModalProps {
  title: string;
  subtitle: string;
  bg: string;
  color: string;
  triggerUpdate?: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  triggerUpdate,
  subtitle,
  title,
  bg,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    novaSenha: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await changePassword(formData);
      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        if (triggerUpdate) {
          triggerUpdate();
        }
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Erro ao alterar a senha.");
      console.error("Erro ao alterar a senha:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={`px-4 py-2 bg-${bg || ""} rounded  text-${color}`}>
          {title || ""}
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {subtitle || ""}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Seu Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="novaSenha"
              className="block text-sm font-medium text-gray-700"
            >
              Nova Senha
            </label>
            <input
              type="password"
              name="novaSenha"
              required
              value={formData.novaSenha}
              onChange={handleChange}
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

export default ChangePasswordModal;
