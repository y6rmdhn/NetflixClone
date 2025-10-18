import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  const handleLogout = async () => {
    const data = { token, email };
    const dbsignout = await apiInstanceExpress.delete("my-token", { data });

    if (dbsignout.status === 204) {
      signOut(auth).then(() => {
        setToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  return (
    <div className="flex dropdown dropdown-hover dropdown-end">
      <div className="avatar" tapIndex={0}>
        <div className="w-14 rounded-full">
          <img src="/sparklr.jpg" />
        </div>
      </div>
      <div className="dropdown-content top-[55px] bg-black/60 px-3 py-4 rounded-md">
        <p className="mb-2">{email}</p>
        <button
          tapIndex={0}
          className="top-14 w-32 bg-[#af2222] hover:bg-[#cc2727] py-1 rounded-md"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
