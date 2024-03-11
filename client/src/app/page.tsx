"use client";
import { useState, useEffect } from "react";
import useVideogames from "@/hooks/useVideogames";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getErrorMessage } from "@/lib/errors";

import VideogamesCards from "@/components/videogamesCards/VideogamesCards";
import SearchBar from "@/components/searchBar/SearchBar";

import { Spinner } from "@nextui-org/react";
import { videogameType } from "@/lib/types";

export default function Home() {
  // nextPage = true or false
  const { nextPageExist } = useSelector(
    (state: RootState) => state.videogamesPage
  );
  // search input
  const [search, setSearch] = useState<string>("");
  // useSWRInfinite hook to fetch videogames pages
  const { data, size, setSize, error, isLoading } = useVideogames(search);
  // inView function
  const { ref, inView } = useInView();
  // videogames filter by page to render in the page
  const [videogames, setVideogames] = useState<videogameType[]>([]);

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
        if (page !== undefined) videogamesToSet.push(...page);
      });

      setVideogames(videogamesToSet);
    }
  }, [data]);

  // set to search state the input value
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // show error
  if (error)
    return (
      <div className="flex justify-center mt-[10rem]">
        <h2>Error: {getErrorMessage(error)}</h2>
      </div>
    );

  return (
    <section>
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        placeholder="Videogame name"
      />
      <div>
        {!isLoading && <VideogamesCards videogames={videogames} />}

        {nextPageExist && (
          <Spinner
            ref={ref}
            className="flex justify-center m-5 p-1"
            size="lg"
            label="Loading more videogames"
            labelColor="primary"
          />
        )}
      </div>
    </section>
  );
}
