import { Actions } from './actions';
import type { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.AddBook:
      const { books } = state;
      return {
        ...state,
        books: books ? [...books, action.payload] : [action.payload],
      };
    case Actions.SelectBook:
      return { ...state, selectedBook: action.payload };
    case Actions.SetBooks:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
