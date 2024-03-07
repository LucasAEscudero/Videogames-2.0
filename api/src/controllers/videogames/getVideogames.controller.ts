import axios from "axios";
import { videogamesResponseType } from "../../utils/types";
import { createVideogamesArrayResponse } from "../../utils/createResponse";

export default async function getVideogamesController(page: number) {
  const videogamesApi = (
    await axios.get(`/games?key=${process.env.API_KEY}&page=${page}`)
  ).data as videogamesResponseType;

  return {
    next: videogamesApi.next ? true : false,
    previous: videogamesApi.previous ? true : false,
    results: createVideogamesArrayResponse(videogamesApi.results),
  };
}
