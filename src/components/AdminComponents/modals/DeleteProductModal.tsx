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
import { deleteProduct } from "@/pages/api/adminProducts";
import { toast } from "react-toastify";

interface ConfirmDeleteModalProps {
  productId: number;
  productName: string;
  triggerUpdate: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  productId,
  productName,
  triggerUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteProduct(productId);
      toast.success("Produto excluído com sucesso!");
      triggerUpdate();
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto!");
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
            Tem certeza que deseja excluir o produto{" "}
            <span className="font-bold">{productName}</span> ? Esta ação não
            pode ser desfeita.
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

export default ConfirmDeleteModal;
