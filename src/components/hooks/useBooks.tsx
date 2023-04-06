import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useContext } from 'react';

import { ApiRoutes } from '../../ApiRoutes';
import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book } from '../../types/services';

type UseBooksType = {
  books: Book[];
  updateBooks: (newBooks: Book[]) => void;
  updateBook: (oldBook: Book, newBook: Book) => Promise<void>;
  createBook: (title: string, author: string, summary: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  getBooks: () => Book[];
  setSelectedBook: (id: number) => void;
  getSelectedBook: () => Book | undefined;
};

const isBook = (maybeBook: unknown): maybeBook is Book => {
  if (
    maybeBook &&
    typeof maybeBook === 'object' &&
    !Array.isArray(maybeBook) &&
    'id' in maybeBook &&
    'title' in maybeBook &&
    'author' in maybeBook &&
    'summary' in maybeBook
  ) {
    return true;
  }
  return false;
};

export const useBooks = (): UseBooksType => {
  const { state, dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const updateBooks = useCallback(
    (newBooks: Book[]): void => {
      dispatch({
        type: Actions.SetBooks,
        payload: newBooks,
      });
    },
    [dispatch]
  );

  const updateBook = useCallback(
    async (oldBook: Book, newBook: Book): Promise<void> => {
      const { books } = state ?? {};
      if (books) {
        const updatedBooks = _cloneDeep(books);
        const idx = updatedBooks.findIndex((book) => book.id === oldBook.id);
        if (idx > -1) {
          updatedBooks[idx] = {
            ...oldBook,
            title: newBook.title,
            author: newBook.author,
            summary: newBook.summary,
          };

          const bookToUpdate = updatedBooks[idx];

          try {
            await axios.post(ApiRoutes.UpdateBook, {
              id: bookToUpdate.id,
              title: bookToUpdate.title,
              author: bookToUpdate.author,
              summary: bookToUpdate.summary,
              labelId: bookToUpdate.label?.id,
            });
          } catch (e) {
            console.error(e);
          }

          updateBooks(updatedBooks);
        }
      }
    },
    [state, updateBooks]
  );

  const createBook = useCallback(
    async (title: string, author: string, summary: string) => {
      try {
        const response = await axios.post(ApiRoutes.CreateBook, {
          title,
          author,
          summary,
        });

        if (isBook(response.data)) {
          dispatch({ type: Actions.AddBook, payload: response.data });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch]
  );

  const deleteBook = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await axios.post(ApiRoutes.DeleteBook, { id });

        if (response.data) {
          dispatch({ type: Actions.DeleteBook, payload: id });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch]
  );

  const getBooks = (): Book[] => state?.books ?? [];

  const setSelectedBook = useCallback(
    (id: number): void => {
      dispatch({
        type: Actions.SelectBook,
        payload: id,
      });
    },
    [dispatch]
  );

  const getSelectedBook = useCallback((): Book | undefined => {
    const { books, selectedBook } = state ?? {};
    return books?.find((book) => book.id === selectedBook);
  }, [state]);

  return {
    books: state?.books ?? [],
    updateBooks,
    updateBook,
    createBook,
    deleteBook,
    getBooks,
    setSelectedBook,
    getSelectedBook,
  };
};
