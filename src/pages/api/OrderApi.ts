// src/services/orderService.ts
import api from "./api";
export const fetchOrderData = async () => {
  try {
    const response = await api.get("/list-payments");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
export const fetchOrderDataBycpf = async (cpf: string) => {
  try {
    const response = await api.get(`/list-payments-cpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
