import React from "react";
import SectionLayout from "@layouts/sectionLayout";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { languageL } from "@/jotai/atoms";
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from "@/constants/listContent";
import { WATCH_DEVICE_IMAGE, WATCH_DEVICE_VIDEO } from "@/constants/listAsset";

const SectionWatch = () => {
  const [language] = useAtom(languageL);

  return (
    <SectionLayout>
      <EachUtils
        of={language === "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
        render={(item, index) => {
          return (
            <div className="px-8" key={index}>
              <h2 className="text-5xl font-black">{item.title}</h2>
              <p className="text-2xl mt-4">{item.desc}</p>
            </div>
          );
        }}
      />

      <div className="relative max-w-xl mx-auto">
        <img src={WATCH_DEVICE_IMAGE} alt="" className="relative z-20" />
        <div className="w-[60%] absolute top-10 left-1/2 -translate-x-1/2">
          <video autoPlay muted loop>
            <source src={WATCH_DEVICE_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </SectionLayout>
  );
};

export default SectionWatch;
