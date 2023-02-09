import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminSideBar from "./element/AdminSideBar";
import UsersSideBar from "./element/UsersSideBar";

const AdminLayout = ({ isAdmin }) => {
  return (
    <div className="main min-h-screen flex flex-wrap">
      <div className="sidebar w-full  bg-slate-400 md:w-[20%]">
        <div className="content flex justify-center ">{isAdmin ? <AdminSideBar /> : <UsersSideBar />}</div>
      </div>
      <div className="rightcontent w-full md:w-[80%] p-2">{<Outlet />}</div>
    </div>
  );
};

export default AdminLayout;
