import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useContext } from 'react';

import { ApiRoutes } from '../../ApiRoutes';
import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book, Chapter } from '../../types/services';
import { getBookIdxWithId } from '../../utilities/getBookIdxWithId';
import { getBookWithId } from '../../utilities/getBookWithId';

type UseChaptersType = {
  getChapters: (bookId: string) => Chapter[];
  updateChapter: (
    bookId: string,
    oldChapter: Chapter,
    newChapter: Pick<Chapter, 'description' | 'name' | 'number'>
  ) => Promise<void>;
  createChapter: (
    bookId: string,
    name: string,
    number: number,
    description: string
  ) => Promise<void>;
  deleteChapter: (id: number, bookId?: string) => Promise<void>;
};

const isChapter = (maybeChapter: unknown): maybeChapter is Chapter => {
  if (
    maybeChapter &&
    typeof maybeChapter === 'object' &&
    !Array.isArray(maybeChapter) &&
    'id' in maybeChapter &&
    'name' in maybeChapter &&
    'number' in maybeChapter &&
    'description' in maybeChapter
  ) {
    return true;
  }
  return false;
};

export const useChapters = (): UseChaptersType => {
  const { state, dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const getClonedChaptersFromBook = useCallback(
    (bookId: string): Chapter[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const { chapters } = books[currentBookIdx];

        return _cloneDeep(chapters ?? []);
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const getBooksWithUpdatedChapters = useCallback(
    (bookId: string, newChapters: Chapter[]): Book[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const updatedBooks = _cloneDeep(books);
        updatedBooks[currentBookIdx].chapters = newChapters;

        return updatedBooks;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const updateChapter = useCallback(
    async (
      bookkId: string,
      oldChapter: Chapter,
      newChapter: Pick<Chapter, 'description' | 'name' | 'number'>
    ): Promise<void> => {
      const chapters = getClonedChaptersFromBook(bookkId);

      const idx = chapters.findIndex((chapter) => chapter.id === oldChapter.id);

      if (idx > -1) {
        chapters[idx] = {
          ...oldChapter,
          name: newChapter.name,
          number: newChapter.number,
          description: newChapter.description,
        };

        const chapterToUpdate = chapters[idx];

        try {
          await axios.post(ApiRoutes.UpdateChapter, {
            id: chapterToUpdate.id,
            name: chapterToUpdate.name,
            number: chapterToUpdate.number,
            description: chapterToUpdate.description,
            labelId: chapterToUpdate.label.id,
          });
        } catch (e) {
          console.error(e);
        }

        const updatedBooks = getBooksWithUpdatedChapters(bookkId, chapters);

        dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
      }
    },
    [dispatch, getBooksWithUpdatedChapters, getClonedChaptersFromBook]
  );

  const createChapter = useCallback(
    async (
      bookId: string,
      name: string,
      number: number,
      description: string
    ) => {
      try {
        const chapters = getClonedChaptersFromBook(bookId);

        const response = await axios.post(ApiRoutes.CreateChapter, {
          bookId,
          name,
          number,
          description,
        });

        if (isChapter(response.data)) {
          chapters.push(response.data);

          const updatedBooks = getBooksWithUpdatedChapters(bookId, chapters);

          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedChapters, getClonedChaptersFromBook]
  );

  const deleteChapter = useCallback(
    async (id: number, bookId?: string): Promise<void> => {
      if (!bookId) return;
      try {
        const chapters = getClonedChaptersFromBook(bookId);

        const response = await axios.post(ApiRoutes.DeleteChapter, { id });

        if (response.data) {
          const newChapters = chapters.filter((chapter) => chapter.id !== id);
          const updatedBooks = getBooksWithUpdatedChapters(bookId, newChapters);
          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedChapters, getClonedChaptersFromBook]
  );

  const getChapters = (bookId: string): Chapter[] => {
    const { books } = state ?? {};

    const currentBook = getBookWithId(bookId, books ?? []);

    if (!currentBook) return [];

    const { chapters } = currentBook;

    return chapters ?? [];
  };

  return {
    getChapters,
    updateChapter,
    createChapter,
    deleteChapter,
  };
};
