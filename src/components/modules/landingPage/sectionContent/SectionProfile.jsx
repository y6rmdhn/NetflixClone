import React from "react";
import SectionLayout from "@layouts/sectionLayout";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { languageL } from "@/jotai/atoms";
import { PROFILE_KIDS_IMAGE } from "@/constants/listAsset";
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from "@/constants/listContent";

const SectionProfile = () => {
  const [language] = useAtom(languageL);

  return (
    <SectionLayout>
      <div>
        <img src={PROFILE_KIDS_IMAGE} alt="" />
      </div>
      <EachUtils
        of={language === "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
        render={(item, index) => {
          return (
            <div key={index} className="px-8">
              <h2 className="text-5xl font-black">{item.title}</h2>
              <p className="text-2xl mt-4">{item.desc}</p>
            </div>
          );
        }}
      />
    </SectionLayout>
  );
};

export default SectionProfile;
