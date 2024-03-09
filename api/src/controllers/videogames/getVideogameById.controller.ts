import axios from "axios";
import { FetchError } from "../../utils/errors";
import { formatVideogameDetails } from "../../utils/formatVideogames";

import { videogameApiType } from "../../utils/types";

export default async function getVideogameByIdController(id: number) {
  const videogameDetails: videogameApiType = (
    await axios.get(`/games/${id}?key=${process.env.API_KEY}`)
  ).data;

  if (!videogameDetails)
    throw new FetchError("Error to fetch videogame details data", 404);

  return formatVideogameDetails(videogameDetails);
}
