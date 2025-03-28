import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CategoryButtonProps {
  name: string;
  path: string;
  imageSrc: StaticImageData;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  name,
  path,
  imageSrc,
}) => {
  return (
    <Link href={path} legacyBehavior>
      <div className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-300 rounded-lg bg-white transition-all duration-300 hover:bg-gray-100 shadow-sm hover:shadow-md w-full h-full">
        <Image
          src={imageSrc}
          alt={name}
          width={80}
          height={80}
          className="object-contain"
        />
        <span className="text-black font-jost text-sm font-medium text-center">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default CategoryButton;
