// services/subscribeService.ts

import { AccountData } from "@/interfaces/AccountData";
import api from "./api";

export const createAccount = async (accountData: AccountData) => {
  try {
    const response = await api.post("/criar-conta", accountData);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
