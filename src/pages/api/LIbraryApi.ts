import api from "./api";

export const getAllProducts = async () => {
  try {
    const response = await api.get("/produtos/descricao");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
export const getProductById = async (id_product: number) => {
  try {
    const response = await api.get(`/produto/${id_product}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
export const getProductByIdFromPdf = async (id_product: number) => {
  try {
    const response = await api.get(`/produto/${id_product}/pdf`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
