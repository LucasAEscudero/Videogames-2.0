import axios from "axios";
import { FetchError } from "../utils/errors";

export default async function getGenresController() {
  let genres: string[] = [];
  const genresApi = (await axios.get(`/genres?key=${process.env.API_KEY}`))
    .data;

  if (!genresApi) throw new FetchError("Error to fetch genres data", 404);

  genresApi.results.forEach((genre: { name: string }) => {
    genres.push(genre.name);
  });

  return genres;
}
