import type { ReactElement } from 'react';

import type { Note } from '../../types/services';

type NoteCardProps = Note & {
  bookId: string;
  onDelete: (id: number) => Promise<void>;
};

export function NoteCard({
  id,
  bookId,
  title,
  note,
  labels,
  onDelete,
}: NoteCardProps): ReactElement {
  return (
    <div>
      <input value={title} />
      <textarea>{note}</textarea>
    </div>
  );
}
