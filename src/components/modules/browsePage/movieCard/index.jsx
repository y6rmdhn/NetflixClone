import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { motion } from "framer-motion";
import { GoChevronDown, GoPlay, GoPlusCircle, GoTrash } from "react-icons/go";
import { useAtom } from "jotai";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetching,
  isOpenModalAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { getMovieKey } from "@/utils/getMovieKey";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { LIST_VIDEO_RECOMMENDATION } from "@/constants/dummyVideo";
import { apiInstanceExpress } from "@/utils/apiInstance";
import Notification from "../../elements/Notification";
import { checkFavoriteMovie } from "@/utils/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover, movieType }) => {
  const navigate = useNavigate();
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isOpenModalAtom);
  const [movieKey, setMovieKey] = useState([]);
  const [isDatafetching] = useAtom(isFetching);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [notification, setNotification] = useState(null);
  const [submit, setIsSubmit] = useState(null);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);
  const [movieTypeState, setMovieTypeState] = useState(null);

  const handleAddFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const addMovie = await apiInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data,
      });

      if (addMovie.status !== 201)
        return setNotification(
          `Film ${data.title} gagal ditambahkan ke favorite list anda`
        );

      setNotification(`Film ${data.title} berhasil ditambahkan`);
      setIsFavorited(true);

      setTimeout(() => {
        setIsSubmit(false);
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification(`Sorry ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotification(null);
      }, 3000);
      console.log(error);
      console.log(emailStorage);
      console.log(tokenStorage);
    }
  };

  const handleRemoveMovie = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const removeMovie = await apiInstanceExpress.delete("my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: data.id,
        },
      });
      if (removeMovie.status !== 204) {
        return setNotification(`film ${data.title} gagal dihapus`);
      }
      setNotification(`film ${data.title} berhasil dihapus!`);
      setIsFavorited(false);

      setTimeout(() => {
        setIsSubmit(false);
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification(`Sorry, ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotification(null);
      }, 3000);
    }
  };

  if (isDatafetching) return <Skeleton />;

  return (
    <>
      {submit && notification && <Notification message={notification} />}
      {isHover && idMovie === data.id && movieType === movieTypeState ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0 }}
          className="relative shadow-md rounded-md overflow-hidden transition-all w-full"
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieKey}`}
            playing={true}
            loop={true}
            muted={true}
            width={"100%"}
            height={"180px"}
            controls={false}
          />

          <div className="h-auto p-2 bg-[#141414] flex flex-col gap-2 rounded-b-md">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/watch/" + movieKey)}
                  className="hover:text-white"
                >
                  <GoPlay size={30} />
                </button>
                <button
                  onClick={
                    isFavorited ? handleRemoveMovie : handleAddFavoriteMovie
                  }
                  className="hover:text-white"
                >
                  {isFavorited ? (
                    <GoTrash size={30} />
                  ) : (
                    <GoPlusCircle size={30} />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-white"
                >
                  <GoChevronDown size={25} />
                </button>
              </div>
            </section>
            <section className="text-left">
              <h2 className="font-semibold">{data.title}</h2>
              <p className="text-green-500">Popularity: {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) : (
        <img
          onMouseEnter={() => {
            setIsHover(true);
            setIdMovie(data.id);
            getMovieKey(data.id).then((result) => setMovieKey(result));
            checkFavoriteMovie({
              emailStorage,
              tokenStorage,
              idMovie: data.id,
            }).then((result) => {
              setIsFavorited(result);
              console.log(result);
            });
            setMovieTypeState(movieType);
          }}
          src={`${import.meta.env.VITE_BASE_URL_IMAGE_TMDB}${data.poster_path}`}
          className="w-full max-h-80 h-72 cursor-pointer object-cover rounded-md"
        />
      )}
    </>
  );
};

export default MovieCard;
