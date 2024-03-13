import axios from "axios";
import { FetchError } from "../../utils/errors";
import { formatVideogames } from "../../utils/formatVideogames";

import {
  fetchApiVideogamesType,
  videogamesQuerysType,
} from "../../utils/types";

export default async function getVideogamesController(
  page: number,
  extraQuerys: videogamesQuerysType
) {
  const url = createVideogamesUrl(page, extraQuerys);

  const apiData = (await axios.get(url)).data as fetchApiVideogamesType;

  if (!apiData) throw new FetchError("Error to fetch videogames data", 404);

  return {
    next: apiData.next ? true : false,
    previous: apiData.previous ? true : false,
    results: apiData.results.map((videogame) => {
      return formatVideogames(videogame);
    }),
  };
}

const createVideogamesUrl = (page: number, querys: videogamesQuerysType) => {
  let url = `/games?key=${process.env.API_KEY}&page=${page}`;

  if (querys.search !== undefined) url += `&search=${querys.search}`;
  if (querys.genres) url += `&genres=${querys.genres}`;
  if (querys.platforms) url += `&platforms=${querys.platforms}`;
  if (querys.ordering) url += `&ordering=${querys.ordering}`;

  return url;
};
