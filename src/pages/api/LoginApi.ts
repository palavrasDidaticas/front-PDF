import { LoginData } from "@/interfaces/LoginData";
import api from "./api";

export const login = async (loginData: LoginData) => {
  try {
    const response = await api.post("/login", loginData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const loginCode = async (loginDataCode: {}) => {
  try {
    const response = await api.post("/verificar-codigo", loginDataCode);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const loginSendEmail = async (loginDataSendMail: {}) => {
  try {
    const response = await api.post("/enviar-codigo", loginDataSendMail);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
