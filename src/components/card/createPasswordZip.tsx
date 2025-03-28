import { ZipWriter, BlobWriter, BlobReader } from "@zip.js/zip.js";

export async function createPasswordZip(
  fileBlob: Blob,
  fileName: string,
  password: string
): Promise<Blob> {
  // Cria o BlobWriter para o ZIP
  const blobWriter = new BlobWriter("application/zip");

  // Inicializa o ZipWriter com a senha desejada
  const zipWriter = new ZipWriter(blobWriter, { password });

  // Adiciona o arquivo PDF ao ZIP
  await zipWriter.add(fileName, new BlobReader(fileBlob));

  // Finaliza a criação do ZIP
  await zipWriter.close();

  // Retorna o Blob do arquivo ZIP criado
  return blobWriter.getData();
}
