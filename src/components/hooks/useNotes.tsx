import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useState } from 'react';

import { ApiRoutes } from '../../ApiRoutes';
import type { Note } from '../../types/services';

type UseNotesType = {
  notes: Note[];
  getCurrentNote: (noteId: string) => Note | undefined;
  updateNote: (
    oldNote: Note,
    newNote: Pick<Note, 'note' | 'title'> & { labelIds: string[] }
  ) => Promise<void>;
  createNote: (
    title: string,
    note: string,
    labelIds: string[]
  ) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
};

const isNote = (maybeNote: unknown): maybeNote is Note => {
  if (
    maybeNote &&
    typeof maybeNote === 'object' &&
    !Array.isArray(maybeNote) &&
    'id' in maybeNote &&
    'title' in maybeNote &&
    'note' in maybeNote
  ) {
    return true;
  }
  return false;
};

export const useNotes = (initialNotes: Note[]): UseNotesType => {
  const [notes, setNotes] = useState(initialNotes);

  const getCurrentNote = (noteId: string): Note | undefined =>
    notes.find((note) => String(note.id) === noteId);

  const updateNote = useCallback(
    async (
      oldNote: Note,
      newNote: Pick<Note, 'note' | 'title'> & { labelIds: string[] }
    ): Promise<void> => {
      const notesCopy = _cloneDeep(notes);

      const idx = notesCopy.findIndex((note) => note.id === oldNote.id);

      console.log('idx', idx);

      if (idx > -1) {
        const noteToUpdate = notesCopy[idx];
        console.log({ noteToUpdate });

        try {
          const { data } = await axios.post<Note>(ApiRoutes.UpdateNote, {
            id: noteToUpdate.id,
            title: newNote.title,
            note: newNote.note,
            labelIds: newNote.labelIds,
          });

          console.log('DATA', { data });

          notesCopy[idx] = data;
          setNotes(notesCopy);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [notes]
  );

  const createNote = useCallback(
    async (title: string, note: string, labelIds: string[]) => {
      try {
        const notesCopy = _cloneDeep(notes);

        const response = await axios.post(ApiRoutes.CreateNote, {
          title,
          note,
          labelIds,
        });

        if (isNote(response.data)) {
          notesCopy.push(response.data);

          setNotes(notesCopy);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [notes]
  );

  const deleteNote = useCallback(
    async (id: number): Promise<void> => {
      try {
        const notesCopy = _cloneDeep(notes);

        const response = await axios.post(ApiRoutes.DeleteNote, { id });

        if (response.data) {
          const newNotes = notesCopy.filter((note) => note.id !== id);

          setNotes(newNotes);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [notes]
  );

  return {
    notes,
    getCurrentNote,
    updateNote,
    createNote,
    deleteNote,
  };
};
