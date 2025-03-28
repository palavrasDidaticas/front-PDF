"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { createAccount } from "./api/SubscribeApi";
import { useRouter } from "next/router"; // Alterado para o hook correto
import InputMask from "react-input-mask";

interface AccountData {
  nome: string;
  senha: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  telefoneCelular: string;
}

const Subscribe = () => {
  const [accountData, setAccountData] = useState<AccountData>({
    nome: "",
    senha: "",
    dataNascimento: "",
    email: "",
    cpf: "",
    telefoneCelular: "",
  });

  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (email && typeof email === "string") {
      setAccountData((prevData) => ({
        ...prevData,
        email,
      }));
    }
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...accountData,
        cpf: accountData.cpf.replace(/\D/g, ""),
        telefoneCelular: accountData.telefoneCelular.replace(/\D/g, ""),
      };
      const response = await createAccount(cleanData);
      if (response.message === 'Conta criada com sucesso') {
        toast.success("Conta criada com sucesso!");
        window.location.href = "/Login";
      }else{
        toast.error(response.message || "");
      }
    } catch (error) {
      console.error("Failed to create account:", error);
      toast.error("Falha ao criar a conta. Por favor, tente novamente.");
    }
  };

  return (
    <div className="m-4 flex flex-col justify-center px-4 sm:px-8 lg:px-28">
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="bg-white p-6 sm:p-8 lg:p-12">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left">
              Seus dados para acesso
            </h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={accountData.nome}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={accountData.email}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  required
                  value={accountData.cpf}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  name="senha"
                  required
                  value={accountData.senha}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Data de Nascimento
                </label>
                <InputMask
                  mask="99/99/9999"
                  name="dataNascimento"
                  required
                  value={accountData.dataNascimento}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Telefone Celular
                </label>
                <InputMask
                  mask="(99) 99999-9999"
                  name="telefoneCelular"
                  required
                  value={accountData.telefoneCelular}
                  onChange={handleChange}
                  className="form-input py-2 px-3 bg-gray-200 w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              id="agreement"
              type="checkbox"
              required
              className="form-checkbox bg-gray-200"
            />
            <label htmlFor="agreement" className="ml-2">
              Li e concordo com os termos de uso.
            </label>
          </div>
          <div className="flex items-center mb-6">
            <Link href="/Terms">
              <span className="hover:text-gray-400 underline">
                Termos de Uso
              </span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-1/3 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-center font-inter text-lg font-semibold capitalize"
            >
              Cadastrar
            </button>

            <button className="w-full sm:w-1/3 py-3 px-4 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition-all text-center font-inter text-lg font-semibold capitalize">
              <Link href="/Login">Cancelar</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
