import React from "react";
import type { ReactElement } from "react";

const Header = (): ReactElement => {
  return (
    <div className="w-full bg-primary">
      <div>
        <h1 className="text-secondary">Author</h1>
      </div>
      <hr />
    </div>
  );
};

export default Header;
