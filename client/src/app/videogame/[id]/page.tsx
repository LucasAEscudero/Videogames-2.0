// "use client";
import fetcher from "@/lib/fetcher";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
// import { useState, useEffect } from "react";
import { Metadata } from "next";

import Items from "@/components/items/Items";
import Carousel from "@/components/carrousel/Carrousel";
import VideogameDetailsHeader from "@/components/videogameDetailsHeader/VideogameDetailsHeader";
import { videogameDetailsType } from "@/lib/types";

interface videogameDetailsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: videogameDetailsProps): Promise<Metadata> {
  const videogame: videogameDetailsType = await fetcher(`/videogames/${id}`);

  return {
    title: videogame.name,
    description: videogame.description,
    openGraph: {
      images: [
        {
          url: videogame.image,
        },
      ],
    },
  };
}

export default async function VideogamesDetails({
  params: { id },
}: videogameDetailsProps) {
  const videogame: videogameDetailsType = await fetcher(`/videogames/${id}`);
  // const [videogame, setVideogame] = useState<videogameDetailsType | null>(null);

  // useEffect(() => {
  //   fetcher(`/videogames/${id}`).then((data) => setVideogame(data));
  // }, []);

  if (!videogame) return <Spinner />;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* responsive header */}
        <div className="flex flex-col gap-5 sm:hidden">
          <VideogameDetailsHeader
            name={videogame.name}
            released={videogame.released}
            rating={videogame.rating}
            metacritic={videogame.metacritic}
          />
        </div>
        {/* image */}
        <Image
          as={NextImage}
          src={
            videogame.image ||
            "https://res.cloudinary.com/dub4acwkh/image/upload/v1710040327/default_image_qep19b.jpg"
          }
          alt={`${videogame.name} Image`}
          title={`${videogame.name} ${
            videogame.image ? "Image" : "not contain an image"
          }`}
          width={600}
          height={450}
          radius="sm"
          shadow="lg"
          loading="lazy"
          disableSkeleton
          isBlurred
        />
        {/* header */}
        <div className="hidden sm:flex flex-col gap-5 flex-wrap">
          <VideogameDetailsHeader
            name={videogame.name}
            released={videogame.released}
            rating={videogame.rating}
            metacritic={videogame.metacritic}
            images={videogame.screenshots}
          />
        </div>
      </div>
      {/* screenshots */}
      {/* {videogame.screenshots && ( */}
      <div className="sm:hidden inline-block">
        <Carousel images={videogame.screenshots} imagesType="Screenshot" />
      </div>
      {/* )} */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-10">
        {/* description */}
        <div className="col-span-2">
          <h3 className="text-2xl font-bold mb-2">About</h3>
          <p>{videogame.description}</p>
          {/* genres and platforms items */}
          <div className="hidden sm:grid grid-cols-3">
            <Items title="Genres" array={videogame.genres} />
            <div className="col-span-2">
              <Items title="Platforms" array={videogame.platforms} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* genres and platforms items responsive */}
          <div className="flex flex-col sm:hidden">
            <Items title="Genres" array={videogame.genres} />
            <Items title="Platforms" array={videogame.platforms} />
          </div>
          {/* tags, developers and stores items */}
          <Items title="Tags" array={videogame.tags} />
          <Items title="Developers" array={videogame.developers} />
          <Items title="Stores" array={videogame.stores} />
        </div>
      </div>
    </section>
  );
}
