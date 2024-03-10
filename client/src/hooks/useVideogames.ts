const url = "http:/localhost:3001";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/videogames?page=${index + 1}`;
};

async function videogamesFetcher(url: string) {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export default function useVideogames() {
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    getKey,
    videogamesFetcher
  );

  return { data, size, setSize, isLoading, error };
}
