import { Loading } from "@/components/modules/elements/Loading";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import { Navbar } from "@brows/Navbar";
import { useAtom } from "jotai";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const BrowseLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [token] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);

  if (loading) return <Loading />;

  if (error) return <p>error</p>;

  if (!user && !token && !emailStorage) return location.replace("/");

  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default BrowseLayout;
