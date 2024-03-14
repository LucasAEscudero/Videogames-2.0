import fetcher from "@/lib/fetcher";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

import Items from "@/components/items/Items";
import Carousel from "@/components/carrousel/Carrousel";
import VideogameDetailsHeader from "@/components/videogameDetailsHeader/VideogameDetailsHeader";
import ShortText from "@/components/shortText/ShortText";
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

// async fetcher
async function fetchVideogameDetails(id: string) {
  const videogameDetails = await fetcher(`/videogames/${id}`);

  revalidatePath(`/videogame/${id}`);

  return videogameDetails;
}

// component
export default async function VideogamesDetails({
  params: { id },
}: videogameDetailsProps) {
  const {
    name,
    description,
    image,
    released,
    rating,
    metacritic,
    screenshots,
    genres,
    platforms,
    tags,
    developers,
    stores,
  }: videogameDetailsType = await fetchVideogameDetails(id);
  const shortDescription = description.split(" ").splice(0, 150).join(" ");

  if (!name) return <Spinner />;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* responsive header */}
        <div className="flex flex-col gap-5 sm:hidden">
          <VideogameDetailsHeader
            name={name}
            released={released}
            rating={rating}
            metacritic={metacritic}
          />
        </div>
        {/* image */}
        <Image
          as={NextImage}
          src={
            image ||
            "https://res.cloudinary.com/dub4acwkh/image/upload/v1710040327/default_image_qep19b.jpg"
          }
          alt={`${name} Image`}
          title={`${name} ${image ? "Image" : "not contain an image"}`}
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
            name={name}
            released={released}
            rating={rating}
            metacritic={metacritic}
            images={screenshots}
          />
        </div>
      </div>
      {/* screenshots */}
      <div className="sm:hidden inline-block">
        <Carousel images={screenshots} imagesType="Screenshot" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-10">
        {/* description */}
        <div className="col-span-2">
          <h3 className="text-2xl font-bold mb-2">About</h3>
          {shortDescription === description ? (
            <p>{description}</p>
          ) : (
            <ShortText text={description} shortedText={shortDescription} />
          )}
          {/* genres and platforms items */}
          <div className="hidden sm:grid grid-cols-3">
            <Items title="Genres" array={genres} />
            <div className="col-span-2">
              <Items title="Platforms" array={platforms} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* genres and platforms items responsive */}
          <div className="flex flex-col sm:hidden">
            <Items title="Genres" array={genres} />
            <Items title="Platforms" array={platforms} />
          </div>
          {/* tags, developers and stores items */}
          <Items title="Tags" array={tags} />
          <Items title="Developers" array={developers} />
          <Items title="Stores" array={stores} />
        </div>
      </div>
    </section>
  );
}
