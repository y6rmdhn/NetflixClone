import BrowseLayout from "@/components/layouts/browsLayout";
import React, { useEffect } from "react";
import { GoChevronLeft } from "react-icons/go";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <BrowseLayout>
      <div
        onClick={() => navigate("/browse")}
        className="absolute top-28 left-6 cursor-pointer hover:text-white"
      >
        <GoChevronLeft size={34} />
      </div>
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=" + id}
        muted={false}
        playing={true}
        width={"100%"}
        height={"100vh"}
        controls={false}
      />
    </BrowseLayout>
  );
};

export default Watch;
