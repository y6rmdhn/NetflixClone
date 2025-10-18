import InputSearchMovie from "@mods/browsePage/inputSearchMovie";
import EachUtils from "@/utils/EachUtils";
import React from "react";

import { LIST_NAVBAR } from "@/constants/listNavbar";
import AccountMenu from "@/components/modules/browsePage/accountMenu";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="relative z-30">
      <nav className="bg-[#141414] fixed text-white top-0 left-0 px-8 w-full z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              onClick={() => navigate("/browse")}
              src="/netflix-logo-icon-dea-afrizal.png"
              className="w-[180px] ml-2 cursor-pointer"
            />
            <ul className="sm:flex hidden items-center gap-4">
              <EachUtils
                of={LIST_NAVBAR}
                render={(item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  );
                }}
              />
            </ul>
          </div>
          <div className="flex items-center gap-5">
            <InputSearchMovie />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
