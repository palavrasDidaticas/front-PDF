import decryptJwt from "@/components/decripted/decript";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DecodedToken } from "@/interfaces/decodeType";
import { useState } from "react";

interface ViewTermsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  termsHistory: string[] | null;
}

const ViewTermsHistoryModal: React.FC<ViewTermsHistoryModalProps> = ({
  isOpen,
  onClose,
  termsHistory,
}) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Histórico de Termos Aceitos
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mt-4 text-lg text-gray-600">
          {termsHistory && termsHistory.length > 0 ? (
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Dia
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                </tr>
              </thead>
              <tbody>
                {termsHistory.map((term, index) => {
                  const date = new Date(term);
                  const day = date.toLocaleDateString("pt-BR"); // Formata a data (dia/mês/ano)
                  const time = date.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }); // Formata a hora (hora:minuto)

                  return (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-3 text-sm text-gray-900">{day}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {time}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">
              Este usuário não aceitou nenhum termo ainda.
            </p>
          )}
        </DialogDescription>

        <DialogFooter className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-md shadow-md transition-transform transform hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Fechar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTermsHistoryModal;
