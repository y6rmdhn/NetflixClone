import React from "react";
import EachUtils from "@/utils/EachUtils";
import OptionLanguage from "@mods/landingPage/optionLanguage";

import { useAtom } from "jotai";
import { languageL } from "@/jotai/atoms";
import { LIST_FOOTER_EN, LIST_FOOTER_ID } from "@/constants/listFooter";

const Footer = () => {
  const [language] = useAtom(languageL);

  return (
    <footer className="w-full bg-black border-t-4 border-stone-700 py-8 px-32">
      <div>
        Question? Call <a href="">123-456-789</a>
      </div>
      <ul className="grid sm:grid-cols-4 gap-4 py-8">
        <EachUtils
          of={language === "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
          render={(item, index) => {
            return (
              <li key={index}>
                <a href={item.url} className="underline">
                  {item.title}
                </a>
              </li>
            );
          }}
        />
      </ul>
      <OptionLanguage />
      <p className="mt-4 mb-20">Netflix Indonesia</p>
    </footer>
  );
};

export default Footer;
