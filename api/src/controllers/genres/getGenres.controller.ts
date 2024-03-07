import axios from "axios";

export default async function getGenresController() {
  let genres: string[] = [];
  const genresApi = (await axios.get(`/genres?key=${process.env.API_KEY}`))
    .data;

  genresApi.results.forEach((genre: { name: string }) => {
    genres.push(genre.name);
  });

  return genres;
}
