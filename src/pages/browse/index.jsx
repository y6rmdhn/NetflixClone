import Jumbotron from "@mods/browsePage/jumbotron";
import MovieList from "@mods/browsePage/movieList";
import BrowseLayout from "@layouts/browsLayout";
import React, { useEffect } from "react";
import Modal from "@/components/modules/browsePage/modal";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/jotai/atoms";
import SearchMovie from "@mods/browsePage/searchMovie";
import Footer from "@/components/modules/landingPage/footer";

const Browse = () => {
  const [querySearch] = useAtom(searchQueryAtom);

  return (
    <BrowseLayout>
      {querySearch ? (
        <SearchMovie />
      ) : (
        <>
          <Jumbotron />
          <MovieList title={"Popular Movies"} movieType={"popular"} />
          <MovieList title={"Now Playing"} movieType={"now_playing"} />
          <MovieList title={"Top Rated Movies"} movieType={"top_rated"} />
          <MovieList title={"upcoming"} movieType={"upcoming"} />
        </>
      )}
      <div className="mt-32">
        <Footer />
      </div>
      <Modal />
    </BrowseLayout>
  );
};

export default Browse;
