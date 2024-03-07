import axios from "axios";
import { videogameType } from "../../utils/types";

export default async function getVideogameByIdController(id: number) {
  const videogameDetails = (
    await axios.get(`/games/${id}?key=${process.env.API_KEY}`)
  ).data;

  let videogame: videogameType = {
    id: videogameDetails.id,
    name: videogameDetails.name,
    description: videogameDetails.description_raw,
    image: videogameDetails.background_image,
    rating: videogameDetails.rating,
    released: videogameDetails.released,
    metacritic: videogameDetails.metacritic,
    platforms: videogameDetails.platforms?.map(
      (platform: { platform: { name: string } }) => {
        return platform.platform.name;
      }
    ),
    genres: videogameDetails.genres?.map(
      (genre: { name: string }) => genre.name
    ),
    tags: videogameDetails.tags?.map((tag: { name: string }) => {
      return tag.name;
    }),
    stores: videogameDetails.stores?.map(
      (store: { store: { name: string } }) => {
        return store.store.name;
      }
    ),
    developers: videogameDetails.developers?.map(
      (developer: { name: string }) => {
        return developer.name;
      }
    ),
  };

  return videogame;
}
