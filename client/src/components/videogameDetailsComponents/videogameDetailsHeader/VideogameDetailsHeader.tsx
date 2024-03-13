import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import Carousel from "@/components/carrousel/Carrousel";

interface VideogameDetailsHeaderProps {
  name: string;
  released: string;
  metacritic: number;
  rating: number;
  images?: string[];
}

export default function VideogameDetailsHeader({
  name,
  released,
  metacritic,
  rating,
  images,
}: VideogameDetailsHeaderProps) {
  return (
    <>
      {/* name */}
      <h2 className="text-5xl">{name}</h2>
      <div className="flex gap-5 items-center">
        {/* released */}
        <h5 className="bg-white p-1 px-2 text-black rounded" title="Released">
          {released || "-"}
        </h5>
        {/* metacritic */}
        <h5
          className={`p-1 px-2 border rounded ${
            metacritic >= 75
              ? "border-[#00ce7a] text-[#00ce7a]"
              : metacritic
              ? "border-[#ffbd3f] text-[#ffbd3f]"
              : "border-[#ff6874] text-[#ff6874]"
          }`}
          title="Metacritic"
        >
          {metacritic || "0"}
        </h5>
        {/* rating */}
        <h5 className="flex gap-2 items-center p-2 px-1" title="Rating">
          <span className="text-yellow-300">
            {rating >= 4 ? (
              <FaStar size={25} />
            ) : rating > 2 ? (
              <FaStarHalfAlt size={25} />
            ) : (
              <FaRegStar size={25} />
            )}
          </span>
          {rating || "-"}
        </h5>
      </div>
      {images && (
        <div className="mt-7">
          <Carousel images={images} imagesType="Screenshot" />
        </div>
      )}
    </>
  );
}
