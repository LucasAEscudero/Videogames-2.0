import { videogameApiType } from "./types";

export function formatVideogames(videogame: videogameApiType) {
  return {
    id: videogame.id,
    name: videogame.name,
    image: videogame.background_image,
    rating: videogame.rating,
    released: videogame.released,
    metacritic: videogame.metacritic,
    platforms: videogame.platforms?.map(
      (platform: { platform: { name: string } }) => {
        return platform.platform.name;
      }
    ),
    genres: videogame.genres?.map((genre: { name: string }) => genre.name),
    tags: videogame.tags
      ?.filter((tag: { language: string }) => tag.language === "eng")
      .map((tag: { name: string }) => {
        return tag.name;
      }),
    stores: videogame.stores?.map((store: { store: { name: string } }) => {
      return store.store.name;
    }),
    developers: videogame.developers?.map((developer: { name: string }) => {
      return developer.name;
    }),
  };
}

export function formatVideogameDetails(videogame: videogameApiType) {
  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description_raw,
    image: videogame.background_image,
    rating: videogame.rating,
    released: videogame.released,
    metacritic: videogame.metacritic,
    platforms: videogame.platforms?.map(
      (platform: { platform: { name: string } }) => {
        return platform.platform.name;
      }
    ),
    genres: videogame.genres?.map((genre: { name: string }) => genre.name),
    tags: videogame.tags?.map((tag: { name: string }) => {
      return tag.name;
    }),
    stores: videogame.stores?.map((store: { store: { name: string } }) => {
      return store.store.name;
    }),
    developers: videogame.developers?.map((developer: { name: string }) => {
      return developer.name;
    }),
  };
}
