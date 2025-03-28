// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { login, loginSendEmail } from "./api/LoginApi";
import { LoginData } from "@/interfaces/LoginData";
import TwoStepLoginModal from "@/components/loginComponents/confirmationCodeModal";
import ChangePasswordModal from "@/components/About/modals/ChangePasswordModal";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    senha: "",
  });
  const [emailSubscribe, setEmailSubscribe] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [tokenReturn, setTokenReturn] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const response: any = await login(loginData);
    if (response.status === 200) {
      setShowCodeModal(true);
      setTokenReturn(response.data.token);
      loginSendEmail({ email: loginData.email });
      toast.success("Código enviado para o seu e-mail!");
      setIsSubmitting(false);
    } else if (response && response.status === 401) {
      toast.error(response.data.error || "Acesso não autorizado.");
      setIsSubmitting(false);
    } else {
      toast.error("Erro inesperado Contate o Administrador.");
      setIsSubmitting(false);
    }
  };

  const handleLoginSuccess = (token: string) => {
    sessionStorage.setItem("jwt", tokenReturn);
    router.push("/");
  };

  const handleRedirectToSubscribe = () => {
    if (!emailSubscribe) {
      toast.warn("Por favor, insira um e-mail antes de continuar!");
      return;
    }
    router.push(`/Subscribe?email=${encodeURIComponent(emailSubscribe)}`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-6 gap-6 ">
      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Já Sou Cadastrado!
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-black text-sm font-medium">E-mail</label>
          <input
            className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <label className="block text-black text-sm font-medium">Senha</label>
          <input
            className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            type="password"
            name="senha"
            value={loginData.senha}
            onChange={handleChange}
          />
          {/* <ChangePasswordModal
            bg=""
            color="black"
            title="Esqueceu a sua senha?"
            subtitle="Preencha os campos abaixo para recuperar."
          /> */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-800 text-white p-3 font-jost text-base font-semibold rounded-md mt-8 hover:bg-blue-600 transition-all duration-200"
          >
            {isSubmitting ? "Enviando código..." : "Entrar"}
          </button>
        </form>
      </div>

      <div className="m-4 p-8 bg-white shadow-md rounded-xl w-full max-w-md border border-black">
        <h2 className="text-black text-center font-jost text-3xl font-semibold capitalize mb-8">
          Ainda não possuo cadastro
        </h2>
        <p className="text-black text-center font-jost text-lg font-medium mb-8">
          Primeiro acesso? <br />
          <Link
            href="/Subscribe"
            className="text-black font-jost text-base font-normal hover:underline"
          >
            Faça seu cadastro aqui!
          </Link>
        </p>

        <label className="block text-black text-sm font-medium">E-mail</label>
        <input
          className="w-full p-2 mb-4 mt-2 border rounded bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          type="email"
          name="emailSubscribe"
          value={emailSubscribe || ""}
          onChange={(e) => setEmailSubscribe(e.target.value)}
        />
        <button
          onClick={handleRedirectToSubscribe}
          className="w-full bg-blue-800 text-white p-3 font-jost text-base font-semibold rounded-md mt-8 hover:bg-blue-600 transition-all duration-200"
        >
          Cadastrar
        </button>
      </div>

      {/* Renderiza o modal para o código se o primeiro passo foi concluído */}
      {showCodeModal && (
        <TwoStepLoginModal
          email={loginData.email}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Login;
