import axios from "axios";
import { FetchError } from "../utils/errors";

interface genresApiType {
  id: string;
  name: string;
}

export default async function getGenresController() {
  let genres: genresApiType[] = [];
  const genresApi = (
    await axios.get(`/genres?key=${process.env.API_KEY}&ordering=id`)
  ).data;

  if (!genresApi) throw new FetchError("Error to fetch genres data", 404);

  genresApi.results.forEach((genre: genresApiType) => {
    genres.push({ id: genre.id, name: genre.name });
  });

  return genres;
}
