import { useEffect, useState } from "react";
import decryptJwt from "@/components/decripted/decript";
import { DecodedToken } from "@/interfaces/decodeType";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import EditDataModal from "./modals/EditDataModal";

import { GetAbout } from "@/pages/api/about";
import { toast } from "react-toastify";
import EditAddressModal from "./modals/editAdresModal";

const Account = () => {
  const [accountData, setAccountData] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const fetchData = async () => {
    try {
      const data = decryptJwt();
      setAccountData(data); // Define o token decodificado no estado

      const response = await GetAbout(data!.usuario.id);
      if (response.status === 200) {
        setAccountData(response.data);
        setLoading(false);
      } else {
        toast.error("Erro ao buscar dados da conta.");
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response) {
        const { error: errorMessage, message } = error.response.data;
        toast.error(`${errorMessage}: ${message}`, {
          autoClose: 4000,
        });
      } else {
        toast.error("Erro ao buscar dados da conta.");
        console.error("Erro ao buscar dados da conta:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  const triggerUpdate = () => {
    setUpdateTrigger(!updateTrigger);
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Conta</h2>
      <div className="border-2 rounded-xl py-5">
        {loading ? (
          <div className=" text-center p-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Dados Cadastrais</h3>
              <p>
                <strong>Nome:</strong> {accountData?.usuario.nome}
              </p>
              {/* <p>
                <strong>Sexo:</strong> {accountData?.usuario.sexo}
              </p> */}
              <p>
                <strong>Data de nascimento:</strong>{" "}
                {accountData?.usuario.datanascimento}
              </p>
              <p>
                <strong>Email:</strong> {accountData?.usuario.email}
              </p>
              <p>
                <strong>Telefone celular:</strong>{" "}
                {accountData?.usuario.telefonecelular}
              </p>
              <div className="mt-4 flex gap-2">
                <ChangePasswordModal
                  bg="blue-600"
                  color="white"
                  title="Alterar Senha"
                  subtitle="Preencha os campos abaixo para alterar sua senha."
                  triggerUpdate={triggerUpdate}
                />
                <EditDataModal
                  triggerUpdate={triggerUpdate}
                  defaultData={{
                    nome: accountData?.usuario.nome || "",
                    sexo: accountData?.usuario.sexo || "",
                    dataNascimento: accountData?.usuario.datanascimento || "",
                    email: accountData?.usuario.email || "",
                    telefoneCelular: accountData?.usuario.telefonecelular || "",
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Endereço Principal</h3>
              <p>
                <strong>Endereço:</strong> {accountData?.usuario.rua}
              </p>
              <p>
                <strong>Bairro:</strong> {accountData?.usuario.bairro}
              </p>
              <p>
                <strong>Cidade/UF:</strong> {accountData?.usuario.cidadeuf}
              </p>
              <p>
                <strong>CEP:</strong> {accountData?.usuario.cep}
              </p>
              <p>
                <strong>País:</strong> {accountData?.usuario.pais}
              </p>
              <div className="mt-4 flex gap-2">
                <EditAddressModal
                  triggerUpdate={triggerUpdate}
                  defaultAddress={{
                    endereco: accountData?.usuario.rua || "",
                    bairro: accountData?.usuario.bairro || "",
                    cidadeuf: accountData?.usuario.cidadeuf || "",
                    cep: accountData?.usuario.cep || "",
                    pais: accountData?.usuario.pais || "",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
