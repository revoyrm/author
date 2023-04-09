import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import library from '../../../../mockLibrary/library.json';
import { BookItemCard } from '../../../../src/components/BookItemCard';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Cards } from '../../../../src/components/layout/Cards';
import type { Note } from '../../../../src/types/services';
import { getBookWithId } from '../../../utilities/getBookWithId';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

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
      activeNav={SidebarLabels.AllNotes}
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
