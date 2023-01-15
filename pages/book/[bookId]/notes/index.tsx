import type { NextPageContext } from 'next/types';
import type { ReactElement } from 'react';
import React from 'react';

import { BookItemCard } from '../../../../components/BookItemCard';
import { Header } from '../../../../components/Header';
import { Cards } from '../../../../components/layout/Cards';
import type { Note } from '../../../../types/library-types';

type NotesProps = {
  notes: Note[];
};

export default function Notes({ notes }: NotesProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
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
    </div>
  );
}
