import { NextPage } from "next";
import Head from "next/head";
import amostraImg from "@/images/banner_amostra.jpg";
import Image from "next/image";

const AmostraGratis: NextPage = () => {
  const openLinkInNewTab = () => {
    window.open(
      "https://drive.google.com/drive/folders/1ds80-jR25R5DeYrhVpbQSYufP_bmnV_b?usp=drive_link",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Amostra Grátis</title>
        <meta
          name="description"
          content="Amostra grátis do site Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center mt-20 md:mt-40 w-full flex-1 px-4 sm:px-6 md:px-8 text-left">
        <Image
          src={amostraImg}
          alt="Amostra grátis"
          className="cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={openLinkInNewTab}
        />
      </main>
    </div>
  );
};

export default AmostraGratis;
