"use client";
import useSWRInfinite from "swr/infinite";

import { useDispatch } from "react-redux";
import { validateVideogamesExist } from "@/redux/videogamesSlice";

import { videogamesQueryType } from "@/lib/types";

async function fetcherVideogames(url: string) {
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res?.data?.results)
    .catch((error) => {
      console.log(error);
    });
}

const generateVideogamesGetKey = (query: videogamesQueryType) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/videogames?`;

  if (query.search) url += `&search=${query.search}`;
  if (query.genres) url += `&genres=${query.genres}`;
  if (query.platforms) url += `&platforms=${query.platforms}`;
  if (query.ordering) url += `&ordering=${query.ordering}`;

  return url;
};

export default function useVideogames(query: videogamesQueryType) {
  const url = generateVideogamesGetKey(query);

  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (index, previousPageData): string | null => {
      if (previousPageData && !previousPageData.length) return null;
      return `${url}&page=${index + 1}`;
    },
    fetcherVideogames
  );

  const dispatch = useDispatch();
  if (data) {
    if (!data[data.length - 1] || !data[data.length - 1].length)
      dispatch(validateVideogamesExist(false));
    else dispatch(validateVideogamesExist(true));
  }

  return { data, size, setSize, isLoading, error };
}
