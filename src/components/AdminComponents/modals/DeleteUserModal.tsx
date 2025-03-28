import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { DeleteUser } from "@/pages/api/users";

interface ConfirmDeleteUserModalProps {
  userId: string;
  userName: string;
  triggerUpdate: () => void;
}

const ConfirmDeleteUserModal: React.FC<ConfirmDeleteUserModalProps> = ({
  userId,
  userName,
  triggerUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await DeleteUser(userId);
      toast.success("Usuário excluído com sucesso!");
      triggerUpdate(); 
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-800 hover:text-gray-400">
          <FaTrash />
        </button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Tem certeza que deseja excluir o usuário{" "}
            <span className="font-bold">{userName}</span>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteUserModal;
