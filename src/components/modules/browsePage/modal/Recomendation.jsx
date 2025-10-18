import EachUtils from "@/utils/EachUtils";

import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMovieKey } from "@/utils/getMovieKey";
import { getMoviesRecomendation } from "@/utils/getMoviesRecomendation";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GoPlay, GoStar } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Recomendation = () => {
  const navigate = useNavigate();
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [movieRecomendation, setMovieRecomendation] = useState([]);
  const [keyMovie, setKeyMovie] = useState(null);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  useEffect(() => {
    if (idMovie) {
      getMoviesRecomendation(idMovie).then((result) =>
        setMovieRecomendation(result)
      );
    }
  }, [idMovie]);

  return (
    <div className="py-2 px-4">
      <h2 className="text-2xl font-bold mt-4">Movies Recomendation</h2>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <EachUtils
          of={movieRecomendation}
          render={(item, index) => {
            return (
              <div
                onMouseEnter={() => {
                  getMovieKey(item.id).then((result) => {
                    setKeyMovie(result);
                  });
                }}
                key={index}
                className="w-full h-auto cursor-pointer rounded-md bg-[#141414]"
              >
                <div className="relative">
                  <img
                    src={
                      import.meta.env.VITE_BASE_URL_IMAGE_TMDB +
                      item.poster_path
                    }
                    alt=""
                  />
                  <button
                    onClick={() => {
                      navigate("/watch/" + keyMovie);
                      setIsOpenModal(false);
                      setIdMovie(null);
                    }}
                    className="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2"
                  >
                    <GoPlay size={32} />
                  </button>
                </div>
                <div className="p-2">
                  <div>
                    <p>{item.release_date}</p>
                    <p className="flex text-green-500 items-center gap-2">
                      <GoStar /> {item.vote_average}
                    </p>
                  </div>
                  <p className="text-wrap pt-2 max-h-36 overflow-y-scroll">
                    {item.overview}
                  </p>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Recomendation;
