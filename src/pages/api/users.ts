import api from "./api";

export const GetUsers = async () => {
    try {
      const response = await api.get(`/contas`);
      return response;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };
export const DeleteUser = async (idUser: string) => {
    try {
      const response = await api.delete(`/contas/${idUser}`);
      return response;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };
export const changePassword = async (data: {}) => {
    try {
      const response = await api.post(`/esqueci-senha`,data);
      return response;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };