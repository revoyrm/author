import { ReactElement } from "react";
import { FaSearch } from "react-icons/fa";

const Search = (): ReactElement => {
  return (
    <div className="rounded-lg w-1/5 p-2 text-primary bg-[white] flex justify-between">
      <input className="w-5/6 focus:outline-none" placeholder="book" />
      <FaSearch className="w-1/6 mt-1" />
    </div>
  );
};

export default Search;
