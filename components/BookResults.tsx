import { ReactElement } from "react";
import BookCard from "./BookCard";

const labels = {
  setting: "setting",
  character: "character",
  chapter: "chapter",
};

const books = [
  {
    id: 1,
    title: "Tarsier",
    author: "Fay Avery",
    summary: "kids in space",
    notes: [
      {
        label: "setting",
        note: "the dawn",
      },
      {
        label: "character",
        note: "Alya",
      },
    ],
  },
  {
    id: 2,
    title: "Spirit",
    author: "Fay Avery",
    summary: "kids in space",
    notes: [
      {
        label: "setting",
        note: "Calister Isle",
      },
      {
        label: "character",
        note: "Arya",
      },
    ],
  },
  {
    id: 3,
    title: "Tally hoe",
    author: "Fay Avery",
    summary: "whatever",
    notes: [
      {
        label: "setting",
        note: "the dusk",
      },
      {
        label: "character",
        note: "ayla",
      },
    ],
  },
];

const BookResults = (): ReactElement => {
  return (
    <section className="h-3/4 flex justify-between p-20">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </section>
  );
};

export default BookResults;
