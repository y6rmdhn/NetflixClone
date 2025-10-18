import React from "react";
import InputMembership from "@mods/landingPage/inputMembership";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { languageL } from "@/jotai/atoms";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "@/constants/listJumbotron";

const Jumbotron = () => {
  const [language] = useAtom(languageL);

  return (
    <div className="mb-64">
      <img
        src={JUMBOTRON_IMAGE}
        alt="jumbotron-image"
        className="object-cover w-full h-[1000px] absolute top-0 left-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>

      <EachUtils
        of={language === "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-col items-center text-center justify-center mt-44 gap-4"
            >
              <h1 className="text-5xl font-bold text-white">{item.title}</h1>
              <p className="text-white">{item.desc}</p>
              <InputMembership />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Jumbotron;
