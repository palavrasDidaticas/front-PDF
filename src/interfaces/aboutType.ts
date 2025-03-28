// src/interfaces/AccountData.ts

export interface Endereco {
  endereco: string;
  bairro: string;
  cidadeUF: string;
  cep: string;
  pais: string;
}

export interface AccountData {
  id: number;
  nome: string;
  senha: string;
  admin: boolean;
  compras: string[];
  datanascimento: string;
  email: string;
  cpf: string;
  telefonecelular: string;
  sexo: string | null;
  endereco: Endereco | null;
  iat: number;
  exp: number;
}
