import React, { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { DETAIL_VIDEO, LIST_VIDEOS } from "@/constants/dummyVideo";
import { MdClose } from "react-icons/md";
import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { GoPlay, GoPlusCircle } from "react-icons/go";
import Recomendation from "./Recomendation";
import { getDetailMovie } from "@/utils/getDetailMovie";
import ReactPlayer from "react-player";
import { getMovieKey } from "@/utils/getMovieKey";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [idMovie] = useAtom(idMovieAtom);
  const [detailMovie, setDetailMovie] = useState([]);
  const [keyMovie, setKeyMovie] = useState(null);

  useEffect(() => {
    if (idMovie && isOpenModal) {
      getDetailMovie(idMovie).then((result) => setDetailMovie(result));
      getMovieKey(idMovie).then((result) => setKeyMovie(result));
    }
  }, [idMovie, isOpenModal]);

  const mappingGendre = (genres) => {
    if (genres) {
      let result = "";
      genres.map((genre, index) => {
        if (genre.length - 1 === index) {
          result += genre.name;
        } else {
          result += genre.name + ", ";
        }
      });
      console.log({ result });
      return result;
    }
  };

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""} `}>
      <div className="modal-box w-full max-w-screen-md  p-0">
        <div className="relative">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${keyMovie}`}
            width={"100%"}
            height={"380px"}
            controls={false}
            playing={true}
            muted={true}
          />
          <button onClick={() => setIsOpenModal(false)}>
            <MdClose
              className="absolute top-2 right-2 hover:text-white"
              size={32}
            />
          </button>
          <div className="absolute bottom-1/2 left-10">
            <h2 className="text-4xl font-bold text-white">
              {detailMovie?.title}
            </h2>
          </div>
          <div className="absolute bottom-1/3 left-12">
            <div className="flex gap-2">
              <div className="bg-white hover:bg-[#f0f0f0] px-4 rounded-md flex justify-center items-center gap-2 py-1 cursor-pointer">
                <button
                  className="hover:text-slate-50"
                  onClick={() => {
                    navigate("/watch/" + keyMovie);
                    setIsOpenModal(false);
                    setDetailMovie([]);
                    setKeyMovie(null);
                  }}
                >
                  <GoPlay size={32} className="text-black" />
                </button>
                <p className="text-black font-bold text-xl">Play</p>
              </div>
              <button className="hover:text-white  cursor-pointer">
                <GoPlusCircle size={36} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 px-4 py-2 text-white">
          <div>
            <div className="flex gap-4">
              <p>{detailMovie?.release_date}</p>
              <p className="text-green-500">{detailMovie?.runtime} Minutes</p>
            </div>
            <p className="mt-3">{detailMovie?.overview}</p>
          </div>
          <div>
            <div>
              <p>Gendre: {mappingGendre(detailMovie?.genres)}</p>
              <p>Polularity: {detailMovie?.popularity}</p>
            </div>
          </div>
        </div>
        <Recomendation />
      </div>
    </dialog>
  );
};

export default Modal;
