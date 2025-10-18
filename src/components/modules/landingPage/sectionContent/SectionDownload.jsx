import React from "react";
import SectionLayout from "@layouts/sectionLayout";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { languageL } from "@/jotai/atoms";
import {
  DOWNLOAD_COVER_IMAGE,
  DOWNLOAD_PHONE_IMAGE,
} from "@/constants/listAsset";
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from "@/constants/listContent";

const SectionDownload = () => {
  const [language] = useAtom(languageL);

  return (
    <SectionLayout>
      <div className="relative max-w-xl">
        <img src={DOWNLOAD_PHONE_IMAGE} alt="" />
        <div className="absolute flex gap-5 items-center border border-white rounded-xl py-2 w-[60%] px-3 left-1/2 -translate-x-1/2 top-1/2 translate-y-28 bg-black">
          <img src={DOWNLOAD_COVER_IMAGE} alt="" className="max-h-20" />
          <div className="flex flex-col">
            <p className="font-bold">Stranger Things</p>
            <p className="text-blue-500 font-semibold">Download...</p>
          </div>
        </div>
      </div>
      <EachUtils
        of={language === "en" ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID}
        render={(item, index) => {
          return (
            <div key={index}>
              <h2 className="text-5xl font-black">{item.title}</h2>
              <p className="text-2xl mt-4">{item.desc}</p>
            </div>
          );
        }}
      />
    </SectionLayout>
  );
};

export default SectionDownload;
