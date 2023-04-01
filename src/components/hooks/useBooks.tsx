import { useContext } from 'react';

import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book } from '../../types/library-types';

type UseBooksType = {
  updateBooks: (newBooks: Book[]) => void;
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
      type: Actions.UpdateBooks,
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
    getBooks,
    setSelectedBook,
    getSelectedBook,
  };
};
