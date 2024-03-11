"use server";

export default async function fetcher(url: string) {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function fetcherVideogames(url: string) {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.results.videogames)
    .catch((error) => console.log(error));
}
