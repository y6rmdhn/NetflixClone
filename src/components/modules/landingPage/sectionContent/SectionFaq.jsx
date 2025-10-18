import React, { useState } from "react";
import DefaultButton from "@mods/landingPage/defaultBtn";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { languageL } from "@/jotai/atoms";
import {
  FAQ_TITLE_EN,
  FAQ_TITLE_ID,
  LIST_FAQ_EN,
  LIST_FAQ_ID,
} from "@/constants/listFAQ";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";

const SectionFaq = () => {
  const [language] = useAtom(languageL);
  const [openContentIndex, setOpenContentIndex] = useState(null);

  return (
    <div className="bg-black border-t-4 border-stone-700 py-16 px-32 w-full">
      <h2 className="text-5xl mb-8 font-black text-white text-center">
        {language === "en" ? FAQ_TITLE_EN : FAQ_TITLE_ID}
      </h2>
      <ul className="flex flex-col gap-2 py-4">
        <EachUtils
          of={language === "en" ? LIST_FAQ_EN : LIST_FAQ_ID}
          render={(item, index) => {
            return (
              <li key={index}>
                <div className="bg-[#2d2d2d] hover:bg-[#414141] border-[3px] border-[#494949] text-white rounded-xl">
                  <button
                    onClick={() =>
                      setOpenContentIndex(
                        openContentIndex == index ? null : index
                      )
                    }
                    className="flex justify-between items-center w-full p-8"
                  >
                    <span className="font-semibold text-2xl">{item.title}</span>
                    <motion.div
                      animate={{ rotate: openContentIndex == index ? 135 : 0 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        role="img"
                        aria-hidden="true"
                        className="elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </motion.div>
                  </button>
                </div>

                <motion.div
                  initial={{ translateY: -10 }}
                  animate={{
                    translateY: openContentIndex == index ? 0 : -10,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: openContentIndex == index ? "block" : "none",
                  }}
                  className="p-8 text-left text-2xl font-semibold text-white bg-[#2d2d2d]  mt-2 rounded-xl"
                >
                  <p>{item.desc}</p>
                </motion.div>
              </li>
            );
          }}
        />
      </ul>
      <div className="max-w-2xl flex justify-center mx-auto mt-8">
        <EachUtils
          of={language === "en" ? LIST_CTA_EN : LIST_CTA_ID}
          render={(item, index) => {
            return (
              <div className="flex flex-col items-center justify-center">
                <DefaultButton
                  key={index}
                  text={item.buttonSubmit}
                  style={"rounded-full w-40 text-xl font-semibold"}
                />
                <p className="mt-3 text-xl text-center">{item.title}</p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SectionFaq;
