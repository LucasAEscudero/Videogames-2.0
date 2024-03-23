"use client";
import { useState, useEffect } from "react";
import useVideogames from "@/hooks/useVideogames";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import { setGenres, setPlatforms } from "@/redux/videogamesSlice";
import { RootState } from "@/redux/store";
import { getErrorMessage } from "@/lib/errors";
import fetcher from "@/lib/fetcher";

import VideogamesCards from "@/components/videogamesCards/VideogamesCards";
import HomeBar from "@/components/homeBar/HomeBar";

import { Spinner } from "@nextui-org/react";
import {
  videogameType,
  genreApiType,
  platformApiType,
  userType,
} from "@/lib/types";

export default function Page() {
  const dispatch = useDispatch();
  const { videogamesExist } = useSelector(
    (state: RootState) => state.videogames
  );
  const [query, setQuery] = useState({
    search: "",
    genres: "",
    platforms: "",
    ordering: "",
  });
  // useSWRInfinite hook to fetch videogames pages
  const { data, size, setSize, error, isLoading } = useVideogames(query);
  // inView function
  const { ref, inView } = useInView();
  // videogames filter by page to render in the page
  const [videogames, setVideogames] = useState<videogameType[]>([]);

  const handleQuery = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  };

  // fetch genres and platforms and set in the redux toolkit global state
  useEffect(() => {
    fetcher("/genres").then((data) =>
      dispatch(
        setGenres(
          data?.map((genre: genreApiType) => {
            return { label: genre.name, value: genre.id };
          })
        )
      )
    );

    fetcher("/platforms").then((data) =>
      dispatch(
        setPlatforms(
          data?.map((platform: platformApiType) => {
            return { label: platform.name, value: platform.id };
          })
        )
      )
    );
  }, []);
  // fetch next page when spinner is in view
  useEffect(() => {
    if (inView) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // push videogames pages for render videogames
  useEffect(() => {
    if (data) {
      let videogamesToSet: videogameType[] = [];

      data.forEach((page) => {
        if (page !== undefined)
          videogamesToSet.push(...(page as videogameType[]));
      });

      setVideogames(videogamesToSet);
    }
  }, [data]);

  // show error
  if (error)
    return (
      <div className="flex justify-center mt-[10rem]">
        <h2>Error: {getErrorMessage(error)}</h2>
      </div>
    );

  return (
    <section>
      <HomeBar query={query} handleQuery={handleQuery} />
      {!isLoading && <VideogamesCards videogames={videogames} />}
      {videogamesExist && (
        <Spinner
          ref={ref}
          className="flex justify-center m-5 p-1"
          size="lg"
          label="Loading more videogames..."
          labelColor="primary"
        />
      )}
      {!videogames.length && !videogamesExist && (
        <h2 className="text-center text-lg text-[#0070f0] mt-[5rem]">
          The videogames does not exist
        </h2>
      )}
    </section>
  );
}
