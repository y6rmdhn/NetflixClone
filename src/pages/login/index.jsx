import DefaultLayout from "@/components/layouts/default_layout";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import { emailAtom, emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import { auth } from "@/utils/firebase";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState(null);
  const [, setToken] = useAtom(tokenAtom);
  const [, setEmailStorage] = useAtom(emailStorageAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await getIdToken(login.user);

      const addToken = await apiInstanceExpress.post("my-token", {
        email,
        password,
        token: firebaseToken,
      });
      if (addToken.status !== 200)
        return toast("can't sign-in now, try again later.");

      toast("Login Success");
      setToken(firebaseToken);

      setEmailStorage(login.user.email);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/browse");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast(error.code);
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <ToastContainer theme="dark" />
      <img
        src={JUMBOTRON_IMAGE}
        alt=""
        className="w-full h-[100vh] object-cover opacity-70"
      />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full">
        <form action="" className="flex flex-col gap-4">
          <div className="flex gap-3 ">
            <GoChevronLeft
              onClick={() => navigate("/")}
              size={28}
              className=" hover:text-white cursor-pointer"
            />
            <h3 className="text-white text-xl font-semibold mb-2">Sign In</h3>
          </div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent "
            />
            <label className="absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-[6px] transition-all text-lg peer-focus:text-sm duration-300">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent "
            />
            <label className="absolute top-0 left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:top-[6px] transition-all text-lg peer-focus:text-sm duration-300">
              Password
            </label>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              disabled={isLoading}
              onClick={handleLogin}
              className="bg-red-500 py-3 w-full text-white font-bold rounded-md disabled:bg-red-400 disabled:cursor-wait"
            >
              {isLoading ? "Please wait" : "Sign in"}
            </button>
            <p>
              Not Have An Account?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 underline cursor-pointer ml-2"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;
