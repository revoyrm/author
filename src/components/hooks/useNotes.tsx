import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useContext, useState } from 'react';

import { getBookIdxWithId } from '../../../pages/utilities/getBookIdxWithId';
import { getBookWithId } from '../../../pages/utilities/getBookWithId';
import { ApiRoutes } from '../../ApiRoutes';
import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book, Note } from '../../types/services';

type UseNotesType = {
  notes: Note[];
  updateNote: (
    bookId: string,
    oldNote: Note,
    newNote: Pick<Note, 'note' | 'title'> & { labelIds: string[] }
  ) => Promise<void>;
  createNote: (
    bookId: string,
    title: string,
    note: string,
    labelIds: string[]
  ) => Promise<void>;
  deleteNote: (bookId: string, id: number) => Promise<void>;
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

  const updateNote = useCallback(
    async (
      bookkId: string,
      oldNote: Note,
      newNote: Pick<Note, 'note' | 'title'> & { labelIds: string[] }
    ): Promise<void> => {
      const notesCopy = _cloneDeep(notes);

      const idx = notesCopy.findIndex((note) => note.id === oldNote.id);

      if (idx > -1) {
        const noteToUpdate = notesCopy[idx];

        try {
          const { data } = await axios.post<Note>(ApiRoutes.UpdateNote, {
            id: noteToUpdate.id,
            title: newNote.title,
            note: newNote.note,
            labelIds: newNote.labelIds,
          });
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
    async (bookId: string, title: string, note: string, labelIds: string[]) => {
      try {
        const notesCopy = _cloneDeep(notes);

        const response = await axios.post(ApiRoutes.CreateNote, {
          bookId,
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
    async (bookId: string, id: number): Promise<void> => {
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
    updateNote,
    createNote,
    deleteNote,
  };
};
