import axios from "axios";
import { videogamesResponseType, videogameType } from "../../utils/types";
import { createVideogamesArrayResponse } from "../../utils/createResponse";

export default async function getVideogameByNameController(name: string) {
  const videogamesResponse = (
    await axios.get(`/games?key=${process.env.API_KEY}&search=${name}`)
  ).data as videogamesResponseType;

  const videogames: videogameType[] = createVideogamesArrayResponse(
    videogamesResponse.results
  );

  return videogames;
}
