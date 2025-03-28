import { DecodedToken } from "@/interfaces/decodeType";
import jwt from "jsonwebtoken";

export default function decryptJwt(): DecodedToken | null {
  const token = sessionStorage.getItem("jwt");

  if (token) {
    try {
      const decodedToken: DecodedToken = jwt.decode(token) as DecodedToken;
      return decodedToken;
    } catch (error) {
      console.error("Erro ao decodificar o token JWT:", error);
      return null;
    }
  } else {
    console.warn("Token JWT não encontrado no sessionStorage");
    return null;
  }
}
