import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ email }) => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="py-2 bg-slate-900">
      <div className="mx-auto px-5 max-w-screen-xl">
        <div className="flex justify-between items-center">
          <div className="logo text-white text-[20px]">MYDASHBOARD</div>
          <div className="menu flex gap-2">
            <div className="name text-white">{email}</div>
            <button className="py-1 px-4 bg-neutral-500 text-white" onClick={Logout}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
