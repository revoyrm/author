import type { ReactElement } from 'react';

import { BookCard } from './BookCard';

const labels = {
  setting: 'setting',
  character: 'character',
  chapter: 'chapter',
};

const books = [
  {
    id: 1,
    title: 'Tarsier',
    author: 'Fay Avery',
    summary: 'kids in space',
    notes: [
      {
        label: 'setting',
        note: 'the dawn of blah and time and 42 and such',
      },
      {
        label: 'character',
        note: 'Alya',
      },
    ],
  },
  {
    id: 2,
    title: 'Spirit',
    author: 'Fay Avery',
    summary: 'kids in space',
    notes: [
      {
        label: 'setting',
        note: 'Calister Isle',
      },
      {
        label: 'character',
        note: 'Arya',
      },
    ],
  },
  {
    id: 3,
    title: 'Tally hoe',
    author: 'Fay Avery',
    summary: 'whatever you want to happen, happens. an on demand circus',
    notes: [
      {
        label: 'setting',
        note: 'the dusk',
      },
      {
        label: 'character',
        note: 'ayla',
      },
    ],
  },
];

export function BookResults(): ReactElement {
  return (
    <section className="flex h-3/4 justify-between p-20">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </section>
  );
}
