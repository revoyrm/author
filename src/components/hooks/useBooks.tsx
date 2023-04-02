import { useContext } from 'react';

import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book } from '../../types/services';

type UseBooksType = {
  updateBooks: (newBooks: Book[]) => void;
  books: Book[];
  getBooks: () => Book[];
  setSelectedBook: (id: number) => void;
  getSelectedBook: () => void;
};

export const useBooks = (): UseBooksType => {
  const { state, dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const updateBooks = (newBooks: Book[]): void => {
    dispatch({
      type: Actions.SetBooks,
      payload: newBooks,
    });
  };

  const getBooks = (): Book[] => state?.books ?? [];

  const setSelectedBook = (id: number): void => {
    dispatch({
      type: Actions.SelectBook,
      payload: id,
    });
  };

  const getSelectedBook = (): void => {};

  return {
    updateBooks,
    books: state?.books ?? [], //Todo initial state
    getBooks,
    setSelectedBook,
    getSelectedBook,
  };
};
