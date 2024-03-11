import axios from "axios";
import { FetchError } from "../../utils/errors";
import { formatVideogames } from "../../utils/formatVideogames";

import { fetchApiVideogamesType } from "../../utils/types";

export default async function getVideogamesController(page: number) {
  const apiData = (
    await axios.get(`/games?key=${process.env.API_KEY}&page=${page}`)
  ).data as fetchApiVideogamesType;

  if (!apiData) throw new FetchError("Error to fetch videogames data", 404);

  return {
    next: apiData.next ? true : false,
    previous: apiData.previous ? true : false,
    data: apiData.results.map((videogame) => {
      return formatVideogames(videogame);
    }),
  };
}
