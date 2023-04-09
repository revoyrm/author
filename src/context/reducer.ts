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
    case Actions.SelectBook:
      return { ...state, selectedBook: action.payload };
    default:
      return state;
  }
};
