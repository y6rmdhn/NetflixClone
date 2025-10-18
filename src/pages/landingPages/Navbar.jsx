import OptionLanguage from "@mods/landingPage/optionLanguage";
import DefaultButton from "@mods/landingPage/defaultBtn";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-20">
      <nav className="flex justify-between flex-wrap items-center pr-10 pl-7 py-4">
        <div>
          <img
            onClick={() => navigate("/")}
            src="/netflix-logo-icon-dea-afrizal.png"
            alt="logo-netflix"
            width={200}
            height={45}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <OptionLanguage />
          <DefaultButton text={"Sign in"} onClick={() => navigate("/login")} />
        </div>
      </nav>
    </header>
  );
};
