import type { ReactElement } from 'react';

import type { Note } from '../../types/services';
import { Cards } from '../layout/Cards';
import { NoteCard } from './NoteCard';

export function Notes({ notes }: { notes: Note[] }): ReactElement {
  return (
    <Cards>
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </Cards>
  );
}
