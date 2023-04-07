import { getBookWithId } from '../../pages/utilities/getBookWithId';
import { Actions } from './actions';
import type { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
  const { books } = state;
  switch (action.type) {
    case Actions.UpdateBooks:
      return {
        ...state,
        books: action.payload,
      };
    case Actions.AddBook:
      return {
        ...state,
        books: books ? [...books, action.payload] : [action.payload],
      };
    case Actions.DeleteBook:
      const updatedBooks = books?.filter(
        (book) => String(book.id) !== action.payload
      );
      console.log(JSON.stringify(books, null, 2));
      return {
        ...state,
        books: updatedBooks,
      };
    case Actions.SelectBook:
      return { ...state, selectedBook: action.payload };
    case Actions.SetBooks:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
