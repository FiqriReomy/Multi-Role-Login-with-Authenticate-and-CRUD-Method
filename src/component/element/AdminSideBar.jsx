import React from "react";
import { Link } from "react-router-dom";
const AdminSideBar = () => {
  return (
    <div className="flex flex-col w-full">
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/userslist">
        USERS LIST
      </Link>
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/addusers">
        ADD NEW USERS
      </Link>
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/products">
        PRODUCTS LIST
      </Link>
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/addproducts">
        ADD NEW PRODUCTS
      </Link>
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/setting">
        ACCOUNT SETTINGS
      </Link>
    </div>
  );
};

export default AdminSideBar;
