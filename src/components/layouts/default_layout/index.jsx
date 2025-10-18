import { Loading } from "@/components/modules/elements/Loading";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { Navbar } from "@/pages/landingPages/Navbar";
import { auth } from "@/utils/firebase";
import { useAtom } from "jotai";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const DefaultLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [token] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);

  if (loading) return <Loading />;

  if (error) return <p>error</p>;

  if (user && token && emailStorage) return location.replace("/browse");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DefaultLayout;
