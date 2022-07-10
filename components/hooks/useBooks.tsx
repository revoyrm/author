import { useContext } from 'react';

import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book } from '../types';

type UseBooksType = {
  updateBooks: () => void;
  setSelectedBook: (id: number) => void;
  getSelectedBook: () => void;
};

export const useBooks = (): UseBooksType => {
  const { dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const updateBooks = (newBooks: Book[]): void => {
    dispatch({
      type: Actions.UpdateBooks,
      payload: newBooks,
    });
  };

  const setSelectedBook = (id: number): void => {
    dispatch({
      type: Actions.SelectBook,
      payload: id,
    });
  };

  const getSelectedBook = (): void => {};

  return {
    updateBooks,
    setSelectedBook,
    getSelectedBook,
  };
};
