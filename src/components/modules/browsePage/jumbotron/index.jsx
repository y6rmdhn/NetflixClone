import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMovieKey } from "@/utils/getMovieKey";
import { getMovieList } from "@/utils/getMovieList";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GoMute, GoPlay, GoUnmute } from "react-icons/go";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const Jumbotron = () => {
  const navigate = useNavigate();
  const [isMute, setIsMute] = useState(true);
  const [popularMovie, setPopularMovie] = useState([]);
  const [idMovie, setIdMovie] = useState(null);
  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [keyMovie, setKeyMovie] = useState(null);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [filterLengthDesc, setFilterLengthDesc] = useState("");

  useEffect(() => {
    if (popularMovie?.overview) {
      const textFilter =
        popularMovie.overview.length >= 200
          ? popularMovie.overview.substring(0, 200) + "..."
          : popularMovie.overview;
      setFilterLengthDesc(textFilter);
    }
  }, [popularMovie]);

  useEffect(() => {
    getMovieList("popular").then((result) => {
      setPopularMovie(result[0]);
      setIdMovie(result[0].id);
    });
  }, []);

  useEffect(() => {
    if (idMovie) {
      getMovieKey(idMovie).then((result) => setKeyMovie(result));
    }
  }, [idMovie]);

  return (
    <div className="relative w-full h-[500px]">
      <ReactPlayer
        url={"https://youtube.com/watch?v=" + keyMovie}
        width={"100%"}
        height={"700px"}
        playing={true}
        muted={isMute}
        controls={false}
        loop={true}
        style={{ opacity: "75%" }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-5xl font-black">{popularMovie.title}</h1>
          <p className="hidden lg:block">{filterLengthDesc}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              navigate("/watch/" + keyMovie);
              setIsMute(true);
            }}
            className="bg-gray-200 py-2 px-8 rounded-md text-xl font-bold text-black flex items-center gap-1"
          >
            {" "}
            <GoPlay /> Play
          </button>
          <button
            onClick={() => {
              setIdMovieAtom(idMovie);
              setIsOpenModal(true);
            }}
            className="bg-stone-600/80 py-2 px-8 rounded-md text-white"
          >
            More Detail
          </button>
        </div>
      </div>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white">
        <div
          className="border p-1 rounded-full cursor-pointer"
          onClick={() => setIsMute(!isMute)}
        >
          {isMute ? <GoMute size={24} /> : <GoUnmute size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
