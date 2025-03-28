"use client";
import React, { useState } from "react";
import Image from "next/image";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getProductByIdFromPdf } from "@/pages/api/LIbraryApi";
import { ProductData } from "@/interfaces/ProductData";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

function base64ToUint8Array(base64: string): Uint8Array {
  const raw = atob(base64);
  const array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

interface PdfCardProps extends ProductData {
  userName: string;
  userCPF: string; // CPF completo do usuário
}

const PdfCardComponent: React.FC<PdfCardProps> = ({
  id,
  title,
  imageSrc,
  imageAlt,
  userName,
  userCPF,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePdfClick = async () => {
    const lastFourDigits = userCPF.slice(-4);

    if (enteredPassword !== lastFourDigits) {
      toast.error("Senha incorreta. Verifique e tente novamente.");
      return;
    }

    try {
      setLoading(true);
      // Obtém o PDF (em base64) a partir da sua API
      const response = await getProductByIdFromPdf(Number(id));
      const base64Pdf = response.pdf;

      // Converte o PDF base64 para bytes e carrega o documento
      const pdfBytes = base64ToUint8Array(base64Pdf);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Adiciona uma marca d'água em todas as páginas
      pages.forEach((page) => {
        const { height } = page.getSize();
        const text = `Comprado por: ${userName} Nº ${id}`;
        page.drawText(text, {
          x: 580,
          y: height / 20,
          size: 12,
          font,
          color: rgb(0, 0, 0),
          rotate: degrees(90),
          opacity: 0.3,
        });
      });

      // Salva as alterações no PDF e gera um Blob
      const updatedPdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([updatedPdfBytes], { type: "application/pdf" });

      // Converte o Blob para base64 para enviar à API de criptografia
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async () => {
        const resultStr = reader.result?.toString();
        if (!resultStr) return;
        // Remove o header "data:application/pdf;base64,"
        const base64data = resultStr.split(",")[1];

        // Envia o PDF para a rota de API que aplica a criptografia (HummusJS no backend)
        const encryptionResponse = await fetch("/api/encrypt-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pdfBase64: base64data,
            password: lastFourDigits,
          }),
        });

        const encryptionResult = await encryptionResponse.json();

        if (encryptionResponse.ok) {
          // Força o download do PDF criptografado
          const encryptedPdfBase64 = encryptionResult.pdfEncryptedBase64;
          const linkSource = `data:application/pdf;base64,${encryptedPdfBase64}`;
          const downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = `${title}-criptografado.pdf`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          toast.error(encryptionResult.message);
        }
        setLoading(false);
      };

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Ocorreu um erro ao gerar o PDF.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col border items-center justify-center rounded shadow-lg p-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      {imageSrc && (
        <Image
          objectFit="contain"
          quality={100}
          src={imageSrc}
          alt={imageAlt || "Product Image"}
          width={200}
          height={300}
          className="w-full max-h-44 min-h-44 object-contain"
        />
      )}
      <div className="flex flex-col px-3 py-2 w-full">
        <p className="text-black font-jost text-sm md:text-base lg:text-lg font-extrabold leading-5 truncate">
          {title}
        </p>

        {/* Botão para abrir o modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ver PDF
            </button>
          </DialogTrigger>
          <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Digite a Senha
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-700 mb-4">
              Informe os últimos 4 dígitos do seu CPF para visualizar o PDF.
            </p>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="****"
              maxLength={4}
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <DialogFooter className="flex justify-end mt-4">
              <button
                onClick={handlePdfClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Processando..." : "Confirmar"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancelar
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PdfCardComponent;
