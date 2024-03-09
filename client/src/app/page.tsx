"use client";
import useVideogames from "@/hooks/useVideogames";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { getErrorMessage } from "@/lib/errors";

import VideogamesCards from "@/components/videogamesCards/VideogamesCards";

import { videogameType } from "@/lib/types";

export default function Home() {
  const { data, size, setSize, isLoading, error } = useVideogames();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (error)
    return <div className="flex justify-center">{getErrorMessage(error)}</div>;

  return (
    <section>
      {data?.map((page: videogameType[], i: number) => (
        <VideogamesCards key={i} videogames={page} />
      ))}

      <Spinner
        ref={ref}
        className="flex justify-center"
        size="lg"
        label="Loading more videogames"
        labelColor="primary"
      />
    </section>
  );
}
