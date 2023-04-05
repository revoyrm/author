import { useContext } from 'react';

import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book } from '../../types/services';
import axios from 'axios';
import { ApiRoutes } from '../../ApiRoutes';

type UseBooksType = {
  updateBooks: (newBooks: Book[]) => void;
  books: Book[];
  createBook: (title: string, author: string, summary: string) => Promise<void>;
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

  const createBook = async (title: string, author: string, summary: string) => {
    try {
      const response = await axios.post(ApiRoutes.CreateBook, {
        title,
        author,
        summary,
      });

      console.log('createbook', response);
      dispatch({ type: Actions.AddBook, payload: response.data });
    } catch (e) {
      console.error(e);
    }
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
    createBook,
    getBooks,
    setSelectedBook,
    getSelectedBook,
  };
};
