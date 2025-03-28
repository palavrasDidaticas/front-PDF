// components/TwoStepLoginModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { loginCode } from "@/pages/api/LoginApi";

interface TwoStepLoginModalProps {
  email: string;
  onSuccess: (token: string) => void;
}

const TwoStepLoginModal: React.FC<TwoStepLoginModalProps> = ({ email, onSuccess }) => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const handleCodigoSubmit = async () => {
    if (codigo.length !== 6) {
      toast.error("Por favor, insira os 6 dígitos do código.");
      return;
    }
    setLoading(true);
    try {
      const loginDataCode = { email, codigo };
      const response = await loginCode(loginDataCode);
      toast.success("Login realizado com sucesso!");
      onSuccess(response.token);
      setOpen(false);
    } catch (error) {
      toast.error("Falha ao confirmar o código. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirmação de Código
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Por favor, insira os 6 dígitos que enviamos para o seu e-mail.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <input 
            type="text" 
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Digite o código"
          />
        </div>
        <DialogFooter className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCodigoSubmit}
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TwoStepLoginModal;
