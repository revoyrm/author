import React from "react";
import type { ReactElement } from "react";
import Header from "./Header";
import BookResults from "./BookResults";

const Landing = (): ReactElement => {
  return (
    <div>
      <Header />
      <BookResults />
    </div>
  );
};

export default Landing;
