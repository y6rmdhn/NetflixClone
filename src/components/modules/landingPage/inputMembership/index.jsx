import React from "react";
import EachUtils from "@/utils/EachUtils";
import DefaultButton from "@mods/landingPage/defaultBtn";

import { useAtom } from "jotai";
import { emailAtom, languageL } from "@/jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import { useNavigate } from "react-router-dom";

const InputMembership = () => {
  const [language] = useAtom(languageL);
  const navigate = useNavigate();
  const [, setEmail] = useAtom(emailAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <form>
      <EachUtils
        of={language === "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => {
          return (
            <div key={index}>
              <h3 className="text-white">{item.title}</h3>
              <div className="relative flex justify-center items-center gap-5 py-4">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={item.labelInput}
                  className="w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent "
                />
                <label className="absolute top-0 left-0 pl-4 peer-placeholder-shown:top-8 peer-focus:top-[18px] transition-all text-lg peer-focus:text-sm duration-300">
                  {item.labelInput}
                </label>
                <DefaultButton
                  onClick={handleSubmit}
                  text={item.buttonSubmit}
                  isArrowIcon={true}
                  style={
                    "flex py-4 w-[170px] justify-center items-center gap-2 text-xl"
                  }
                />
              </div>
            </div>
          );
        }}
      />
    </form>
  );
};

export default InputMembership;
