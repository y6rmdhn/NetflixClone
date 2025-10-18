import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/jotai/atoms";

const InputSearchMovie = () => {
  const [isShow, setIsShow] = useState(true);
  const [, setMovieQuery] = useAtom(searchQueryAtom);

  const handleChange = (e) => {
    if (e.target.value.length > 3) {
      setMovieQuery(e.target.value);
    } else {
      setMovieQuery(null);
    }
  };

  return (
    <div className="relative">
      <motion.input
        onChange={handleChange}
        initial={{ width: "10px" }}
        animate={{
          width: isShow ? "10px" : "290px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="py-3 pl-12 rounded-full bg-black/20 "
        placeholder="title, people, gendres..."
      />
      <GoSearch
        onClick={() => setIsShow(!isShow)}
        className={
          "absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer z-10"
        }
        size={24}
      />
    </div>
  );
};

export default InputSearchMovie;
