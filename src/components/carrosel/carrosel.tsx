import React from "react";
import Slider, { Settings } from "react-slick";
import CardComponent from "../card/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import left from "@/images/arrowLeft.png";
import rigth from "@/images/arrowRigth.jpg";
import Image from "next/image";
import { ProductData } from "@/interfaces/ProductData";

interface CarouselProps {
  cards: ProductData[];
}

// Componentes de setas personalizadas utilizando Tailwind CSS
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="slick-next absolute z-10 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
  >
    {/* Ícone de seta para a direita */}
    <Image className="h-6 w-8" src={rigth} alt="seta para direita" />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="slick-prev absolute z-10 left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
  >
    {/* Ícone de seta para a esquerda */}
    <Image className="h-6 w-8" src={left} alt="seta para esquerda" />
  </div>
);

const Carousel: React.FC<CarouselProps> = ({ cards }) => {

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="px-4">
            <CardComponent {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
