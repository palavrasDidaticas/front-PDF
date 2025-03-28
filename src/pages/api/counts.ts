import api from "./api";

export const DeleteCount = async (idUser: number) => {
  try {
    const response = await api.delete(`/contas/${idUser}`);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
export const GetAllCounts = async () => {
  try {
    const response = await api.get(`/contas`);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
