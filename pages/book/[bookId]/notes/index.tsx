import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { BookLayout } from '../../../../components/layout/BookLayout';
import { Cards } from '../../../../components/layout/Cards';
import library from '../../../../mockLibrary/library.json';
import type { Note } from '../../../../types/library-types';
import { getBookWithId } from '../../../utilities/get-book-with-id';

type NotesProps = {
  notes: Note[];
  currentBookId: string;
};

export default function Notes({
  notes,
  currentBookId,
}: NotesProps): ReactElement {
  return (
    <BookLayout
      bookId={currentBookId}
      heading="Book Name"
      searchType="Characters"
    >
      <Cards>
        {notes.map((note) => (
          <BookItemCard
            key={`note_${note.id}`}
            body={note.note}
            header={note.title}
            onClick={(): void => {}}
          />
        ))}
      </Cards>
    </BookLayout>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: NotesProps;
} {
  const bookId = context.query.bookId as string;
  const book = getBookWithId(bookId, library.books);

  return {
    props: {
      notes: book?.notes ?? [],
      currentBookId: context.query.bookId as string,
    },
  };
}
