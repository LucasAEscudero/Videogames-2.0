"use client";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetcherVideogames } from "@/lib/fetcher";
import { useDispatch } from "react-redux";
import { validateNextPage } from "@/redux/videogamesPageSlice";

const getKeyVideogames: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/videogames?page=${index + 1}`;
};

export default function useVideogames(search = "") {
  const dispatch = useDispatch();
  const getKeyFunction = !search
    ? getKeyVideogames
    : (index: number, previousPageData: []): string | null => {
        if (previousPageData && !previousPageData.length) return null;
        return `${process.env.NEXT_PUBLIC_API_URL}/videogames/${search}?page=${
          index + 1
        }`;
      };
  const { data, size, setSize, isLoading, error, isValidating } =
    useSWRInfinite(getKeyFunction, fetcherVideogames);

  // console.log(data);
  if (data) {
    if (data[data.length - 1] === undefined) dispatch(validateNextPage(false));
    else dispatch(validateNextPage(true));
  }

  return { data, size, setSize, isLoading, error };
}
