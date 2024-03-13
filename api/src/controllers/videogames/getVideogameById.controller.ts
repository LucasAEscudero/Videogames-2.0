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

  const slug = videogameDetails.slug;

  const screenshots: { results: { image: string }[] } = (
    await axios.get(`/games/${slug}/screenshots?key=${process.env.API_KEY}`)
  ).data;

  return formatVideogameDetails(videogameDetails, screenshots.results);
}
