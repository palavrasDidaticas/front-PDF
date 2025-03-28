export interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  link: string;
  nivelEnsino: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  url: string;
}
export interface ProductAdmin {
  id: number;
  nome_produto: string;
  descricao: string;
  categoria: string;
  nivel_ensino: string;
  valor: string;
  componente_curricular: string;
  fotos: string[];
  selectedproducts: null | any[];
  url: string | null;
}

export interface FetchedProduct {
  id: number;
  nome_produto: string;
  descricao: string;
  categoria: string;
  nivel_ensino: string;
  valor: string;
  componente_curricular: string;
  fotos: string[];
}
