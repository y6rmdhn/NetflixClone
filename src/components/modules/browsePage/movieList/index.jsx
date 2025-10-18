import EachUtils from "@/utils/EachUtils";
import MovieCard from "../movieCard";

import React, { useEffect, useState } from "react";
import CarouselLayout from "@/components/layouts/carouselLayout";
import { useAtom } from "jotai";
import { idMovieAtom, isFetching } from "@/jotai/atoms";
import { getMovieList } from "@/utils/getMovieList";

const MovieList = ({ title, movieType }) => {
  const [isHover, setIsHover] = useState(false);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [movieList, setMovieList] = useState([]);
  const [, setDataIsFetching] = useAtom(isFetching);

  useEffect(() => {
    if (movieType) {
      getMovieList(movieType)
        .then((result) => {
          setDataIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setDataIsFetching(false);
          }, 500);
        });
    }
  }, [movieType]);

  return (
    <section className="px-8 pt-6 relative">
      <h3 className="text-3xl font-semibold mb-2 text-white">{title}</h3>
      <CarouselLayout className="grid grid-cols-4 gap-10">
        <EachUtils
          of={movieList}
          render={(item, index) => {
            return (
              <div
                className="w-1/2 md:w-1/4 xl:w-1/6 carousel-item"
                key={index}
                onMouseLeave={() => {
                  setIsHover(false);
                  setIdMovie(null);
                }}
              >
                <MovieCard
                  data={item}
                  isHover={isHover}
                  setIsHover={setIsHover}
                  movieType={movieType}
                />
              </div>
            );
          }}
        />
      </CarouselLayout>
    </section>
  );
};

export default MovieList;
