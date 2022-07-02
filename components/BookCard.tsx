import React from "react";
import type { Book } from "./types";

const BookCard = ({ id, title, author, summary, notes }: Book) => {
  return (
    <div className="border">
      <h2>{`${title} - ${author}`}</h2>
      <hr />
      <h3>{summary}</h3>
    </div>
  );
};

export default BookCard;
