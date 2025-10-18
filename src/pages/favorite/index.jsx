import BrowseLayout from "@/components/layouts/browsLayout";
import MovieCard from "@mods/browsePage/movieCard";
import EachUtils from "@/utils/EachUtils";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetching,
  tokenAtom,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import Modal from "@/components/modules/browsePage/modal";

const Favorite = () => {
  const [isHover, setIsHover] = useState(false);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [movieListFavorite, setMovieListFavorite] = useState([]);
  const [isDataFetching, setIsDataFetching] = useAtom(isFetching);
  const [isFavorited] = useAtom(isFavoritedAtom);

  const getFavoriteMovie = async () => {
    setIsDataFetching(true);
    try {
      const url = `my-movies/${emailStorage}/${tokenStorage}`;
      const movie = await apiInstanceExpress.get(url);

      if (movie.status === 200) return movie.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsDataFetching(false);
    }
  };

  useEffect(() => {
    if (emailStorage && tokenStorage) {
      getFavoriteMovie().then((result) => {
        setMovieListFavorite(result.data.favoriteMovies);
      });
    }
  }, [emailStorage, tokenAtom, isFavorited]);

  return (
    <BrowseLayout>
      <div className="mt-32 px-8">
        <h3 className="text-white font-bold text-2xl ">My Favorite Movie</h3>
        {movieListFavorite.length === 0 && (
          <p className="mt-2 italic">
            There are no favorite movies at the moment
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 grid-cols-2 gap-6 px-4 mt-4">
        <EachUtils
          of={movieListFavorite}
          render={(item, index) => {
            return (
              <div
                key={index}
                className="h-72"
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
      <Modal />
    </BrowseLayout>
  );
};

export default Favorite;
