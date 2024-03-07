import { videogameType, videogameResultReponseType } from "./types";

export const createVideogamesArrayResponse = (
  apiResponse: videogameResultReponseType[]
): videogameType[] => {
  let videogames: videogameType[] = [];

  apiResponse.map((videogame: any) => {
    videogames.push({
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
    });
  });

  return videogames;
};

export const createVideogameResponse = (
  apiResponse: videogameResultReponseType
): videogameType => {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description_raw,
    image: apiResponse.background_image,
    rating: apiResponse.rating,
    released: apiResponse.released,
    metacritic: apiResponse.metacritic,
    platforms: apiResponse.platforms?.map(
      (platform: { platform: { name: string } }) => {
        return platform.platform.name;
      }
    ),
    genres: apiResponse.genres?.map((genre: { name: string }) => genre.name),
    tags: apiResponse.tags?.map((tag: { name: string }) => {
      return tag.name;
    }),
    stores: apiResponse.stores?.map((store: { store: { name: string } }) => {
      return store.store.name;
    }),
    developers: apiResponse.developers?.map((developer: { name: string }) => {
      return developer.name;
    }),
  };
};
