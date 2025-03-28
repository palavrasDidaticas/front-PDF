// src/interfaces/decodeType.ts

export interface Usuario {
  id: number;
  nome: string;
  senha: string;
  datanascimento: string;
  email: string;
  admin: boolean;
  compras: string[];
  cpf: string;
  telefonecelular: string;
  sexo: string | null;
  rua: string | null;
  bairro: string | null;
  cidadeuf: string | null;
  cep: string | null;
  pais: string | null;
}

export interface DecodedToken {
  usuario: Usuario;
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}
