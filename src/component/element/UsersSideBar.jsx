import React from "react";
import { Link } from "react-router-dom";
const UsersSideBar = () => {
  return (
    <div className="flex flex-col w-full">
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/products">
        PRODUCTS
      </Link>
      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/addproducts">
        ADD PRODUCTS
      </Link>

      <Link className="py-2 px-5 hover:bg-neutral-200 w-full" to="/setting">
        ACCOUNT SETTINGS
      </Link>
    </div>
  );
};

export default UsersSideBar;
