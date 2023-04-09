import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';

import type { NoteFormData } from '../types/forms';
import type { Book, Note } from '../types/services';
import { BookItemCard } from './BookItemCard';
import { NoteForm } from './forms/NoteForm';
import { Cards } from './layout/Cards';
import { NewCard } from './NewCard';

export function Notes({
  notes,
  bookId,
  book,
  initialLabels,
  createNote,
  deleteNote,
}: {
  notes: Note[];
  bookId: string;
  book?: Book;
  initialLabels?: string[];
  createNote: (
    title: string,
    note: string,
    labelIds: string[]
  ) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}): ReactElement {
  const [isCreating, setIsCreating] = useState(false);

  const handleNewNote = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsCreating(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: NoteFormData): Promise<void> => {
      const { noteTitle, noteDescription, noteLabels } = data;

      await createNote(noteTitle, noteDescription, noteLabels ?? []);

      setIsCreating(false);
    },
    [createNote]
  );

  return isCreating || notes.length === 0 ? (
    <div className="w-full p-8">
      <NoteForm
        book={book}
        initialLabels={initialLabels}
        onCancel={isCreating ? handleCancel : undefined}
        onSubmit={handleSubmit}
      />
    </div>
  ) : (
    <Cards>
      <NewCard
        label="New Note"
        onClick={handleNewNote}
        onEnter={handleNewNote}
      />
      {notes.map((note) => (
        <BookItemCard
          key={`note_${note.id}`}
          body={note.note}
          bookId={bookId}
          header={note.title}
          id={note.id}
          path="notes"
          onDelete={deleteNote}
        />
      ))}
    </Cards>
  );
}
