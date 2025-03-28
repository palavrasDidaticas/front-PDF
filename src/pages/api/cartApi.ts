import api from "./api";

export const payment = async (cpf: string, data: {}) => {
  try {
    const response = await api.post(`/payment/${cpf}`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const paymentOK = async (data: {}) => {
  try {
    const response = await api.post(`/send-product-ids`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
