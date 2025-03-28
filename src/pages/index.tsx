import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Banner from "@/images/banner-1.jpg";
import Banner2 from "@/images/banner-2.jpg";
import Carousel from "@/components/carrosel/carrosel";
import CategoryButton from "@/components/category/CategoryButton";
import { categories } from "@/components/data/CategoryesImagesArray";
import { ProductData } from "@/interfaces/ProductData";
import Link from "next/link";
import { getAllProducts } from "./api/LIbraryApi";

const Home = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        const mappedProducts: ProductData[] = products.map((product: any) => ({
          id: product.id.toString(),
          title: product.nome_produto,
          description: product.descricao,
          price: parseFloat(product.valor),
          link: "/categories",
          // Junte as partes do array `fotos` em uma única string Base64
          imageSrc: `data:image/png;base64,${product.fotos.join("")}`,
          imageAlt: product.nome_produto,
          category: product.categoria,
        }));

        setCards(mappedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Carregando...</p>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Banner Carrossel */}
      <div className="w-full">
        <Slider {...sliderSettings}>
          <div>
            <Image
              className="w-full h-auto"
              src={Banner}
              alt="Banner 1"
              layout="responsive"
            />
          </div>
          <div>
            <Image
              className="w-full h-auto"
              src={Banner2}
              alt="Banner 2"
              layout="responsive"
            />
          </div>
        </Slider>
      </div>

      {/* Card Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 mt-20">
        <h2 className="text-black text-center font-jost text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
          Categorias
        </h2>

        {/* Grid Responsivo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.path}>
              <CategoryButton
                name={category.name}
                path={category.path}
                imageSrc={category.image}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Differentiator Section */}
      <div className="flex flex-col items-center mt-20 space-y-4">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Diferencial
        </h2>
        <p className="text-center md:text-start text-xl pb-12 font-medium text-gray-500">
          Conheça o nosso diferencial das outras plataformas
        </p>

        {/* Differentiator Cards */}
        <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
            >
              <circle cx="48.5" cy="48" r="48" fill="#004AAD" />
              <path
                d="M62.1009 51.0771H46.7604L47.2304 50.6252L51.2425 46.7676C52.863 47.5522 54.6485 47.9706 56.4627 47.9906C58.2888 47.9953 60.0808 47.5148 61.6409 46.6022C66.385 43.8407 68.9271 37.4485 68.4411 29.5024C68.4182 29.126 68.2524 28.7708 67.9751 28.5043C67.6979 28.2377 67.3285 28.0783 66.937 28.0563C58.6728 27.5909 52.0245 30.0332 49.1525 34.5946C47.2804 37.5658 47.2324 41.1542 48.9785 44.5945L46.1004 47.3618L43.6583 45.0137C44.8583 42.4657 44.7723 39.8215 43.3803 37.6138C41.2062 34.1543 36.2221 32.3101 30.0459 32.6581C29.6551 32.6805 29.2864 32.8399 29.0096 33.106C28.7328 33.3722 28.5671 33.7266 28.5438 34.1023C28.1798 40.0388 30.0999 44.8311 33.7 46.9233C34.9044 47.6304 36.2889 48.0032 37.7001 48.0002C38.9804 47.988 40.2432 47.7133 41.4042 47.1945L43.8363 49.5387L42.2362 51.0771H33.3C32.8756 51.0771 32.4686 51.2392 32.1686 51.5277C31.8685 51.8162 31.6999 52.2075 31.6999 52.6156C31.6999 53.0236 31.8685 53.4149 32.1686 53.7034C32.4686 53.9919 32.8756 54.154 33.3 54.154H35.218L37.8601 65.5904C38.015 66.2753 38.4098 66.8884 38.9784 67.327C39.5471 67.7656 40.2552 68.0032 40.9842 68H54.4186C55.1476 68.0032 55.8557 67.7656 56.4244 67.327C56.9931 66.8884 57.3879 66.2753 57.5427 65.5904L60.1848 54.154H62.1009C62.5252 54.154 62.9322 53.9919 63.2323 53.7034C63.5323 53.4149 63.7009 53.0236 63.7009 52.6156C63.7009 52.2075 63.5323 51.8162 63.2323 51.5277C62.9322 51.2392 62.5252 51.0771 62.1009 51.0771ZM51.9005 36.1889C53.9926 32.8697 58.9488 30.9966 65.301 31.0793C65.383 37.1965 63.4389 41.9599 59.9868 43.9638C57.6847 45.3099 54.9066 45.2214 52.1306 43.7368C50.5845 41.0773 50.5005 38.4023 51.9005 36.1889ZM40.5222 44.1753C38.6821 45.1234 36.8601 45.1676 35.356 44.2907C33.056 42.9503 31.7299 39.7907 31.6999 35.6927C35.9621 35.7216 39.2502 36.9965 40.6422 39.208C41.5542 40.6542 41.5002 42.4061 40.5222 44.1753ZM54.4186 64.9231H40.9842L38.5001 54.154H56.9007L54.4186 64.9231Z"
                fill="white"
              />
            </svg>
            <p className="text-black mt-6 text-lg font-semibold leading-normal">
              Entrega Digital
            </p>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="p-4 mt-40">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Mais Vendidos
        </h2>
        <div className="mx-auto px-4 sm:px-2 md:px-8 lg:px-20 xl:px-40">
          <Carousel cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Home;
