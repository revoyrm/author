import React from "react";
import type { ReactElement } from "react";
import Search from "./Search";
import { FaBook } from "react-icons/fa";

const Header = (): ReactElement => {
  return (
    <div className="w-full bg-primary py-8 px-4 flex justify-between">
      <div className="w-1/2">
        <FaBook className="text-secondary text-3xl inline-block mr-4 mb-3" />
        <h1 className="text-secondary font-bold text-3xl w-1/2 inline-block">
          Author
        </h1>
      </div>
      <Search />
    </div>
  );
};

export default Header;
