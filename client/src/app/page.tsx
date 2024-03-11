"use client";
import useVideogames from "@/hooks/useVideogames";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { getErrorMessage } from "@/lib/errors";
import SearchBar from "@/components/searchBar/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import VideogamesCards from "@/components/videogamesCards/VideogamesCards";

import { videogameType } from "@/lib/types";

export default function Home() {
  const { nextPageExist } = useSelector(
    (state: RootState) => state.videogamesPage
  );
  const [search, setSearch] = useState<string>("");
  const { data, size, setSize, error, isLoading } = useVideogames(search);
  const { ref, inView } = useInView();
  const [videogames, setVideogames] = useState<videogameType[]>([]);

  useEffect(() => {
    if (inView) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (data) {
      let videogamesToSet: videogameType[] = [];

      data.forEach((page) => {
        if (page !== undefined) videogamesToSet.push(...page);
      });

      setVideogames(videogamesToSet);
    }
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (error)
    return <div className="flex justify-center">{getErrorMessage(error)}</div>;

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
