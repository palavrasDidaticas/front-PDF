import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProductData } from "@/interfaces/ProductData";

const CardComponent: React.FC<ProductData> = ({
  id,
  title,
  description,
  price,
  category,
  imageSrc,
  imageAlt,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Link href={`/page_Product?id=${id}`} passHref>
      <div className="flex flex-col border items-center justify-center rounded shadow-lg p-3 cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transition-transform transform hover:scale-105 mx-auto">
        {imageSrc && (
          <Image
            objectFit="contain"
            quality={100}
            src={imageSrc}
            alt={imageAlt || "Product Image"}
            width={200}
            height={300}
            className="w-full max-h-44 min-h-44 object-contain"
          />
        )}
        <div className="flex flex-col px-3 py-2 w-full">
          <p className="text-black font-jost text-sm md:text-base lg:text-lg font-extrabold leading-5 truncate">
            {title}
          </p>
          <p className="text-gray-700  text-xs md:text-sm lg:text-base mt-1 line-clamp-2 overflow-hidden">
            {truncateText(description, 20)}
          </p>
          <p className="text-gray-600 text-xs md:text-sm mt-1">{category}</p>

          <div className="flex items-center mt-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="text-blue-800 font-bold text-sm md:text-lg lg:text-xl">
              R$ {price.toFixed(2)}
            </div>
            <span className="text-gray-900 text-xs md:text-sm">no pix</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
