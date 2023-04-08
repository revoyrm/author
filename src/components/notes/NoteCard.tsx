import type { ReactElement } from 'react';

import type { Note } from '../../types/services';

export function NoteCard({ title, note, labels }: Note): ReactElement {
  return (
    <div>
      <p>{title}</p>
      <p>{note}</p>
    </div>
  );
}
