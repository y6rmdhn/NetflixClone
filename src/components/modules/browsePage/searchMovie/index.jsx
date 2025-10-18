import { idMovieAtom, isFetching, searchQueryAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import MovieCard from "../movieCard";
import { getSearchMovie } from "@/utils/getSearchMovie";
import CarouselLayout from "@/components/layouts/carouselLayout";

const SearchMovie = () => {
  const [isHover, setIsHover] = useState(false);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [movieList, setMovieList] = useState([]);
  const [querySearchFromAtom] = useAtom(searchQueryAtom);
  const [, setDataIsFetching] = useAtom(isFetching);

  useEffect(() => {
    if (querySearchFromAtom) {
      getSearchMovie(querySearchFromAtom)
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
  }, [querySearchFromAtom]);

  return (
    <div className="mt-32 p-8">
      <h3 className="text-3xl font-semibold">
        Search Results For {querySearchFromAtom}
      </h3>
      <div className="grid grid-cols-4 mt-10 gap-4">
        <EachUtils
          of={movieList}
          render={(item, index) => {
            return (
              <div
                className="h-72"
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
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SearchMovie;
