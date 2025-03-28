import api from "./api";

export const addProduct = async (formData: FormData) => {
  try {
    const response = await api.post("/adicionar-produto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const updateProduct = async (id_product: number, formData: FormData) => {
  try {
    const response = await api.put(`/produto/${id_product}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/produtos/descricao");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const deleteProduct = async (id_product: number) => {
  try {
    const response = await api.delete(`/produto/${id_product}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
};
