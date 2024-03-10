"use client";
import VideogamesCard from "../videogamesCard/VideogamesCard";

import { videogameType } from "@/lib/types";

interface VideogamesCardsProps {
  videogames: videogameType[];
}

export default function VideogamesCards({ videogames }: VideogamesCardsProps) {
  return (
    <section className="flex flex-wrap gap-5 items-start justify-center justify-items-center my-5">
      {videogames?.map((videogame: videogameType, i: number) => (
        <VideogamesCard
          key={videogame.id}
          id={videogame.id}
          name={videogame.name}
          image={videogame.image}
          rating={videogame.rating}
          released={videogame.released}
          metacritic={videogame.metacritic}
          platforms={videogame.platforms}
          genres={videogame.genres}
          tags={videogame.tags}
          stores={videogame.stores}
          index={i}
        />
      ))}
    </section>
  );
}
