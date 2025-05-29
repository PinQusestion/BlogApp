import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";
import { LogOut } from "lucide-react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
    });
  };
  return (
    <button
      className="inline-flex items-center gap-1.5 px-6 py-2 duration-200 hover:text-cyan-400 rounded-full"
      onClick={logoutHandler}
    >
      <LogOut size={18}/>
      Logout
    </button>
  );
}

export default LogoutBtn;
