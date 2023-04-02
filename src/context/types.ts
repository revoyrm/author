import type { Book } from '../types/services';
import type { Actions } from './actions';

export type State = {
  books?: Book[];
  selectedBook?: number;
};
export type Action =
  | {
      type: Actions.SelectBook;
      payload?: number;
    }
  | {
      type: Actions.SetBooks;
      payload: Book[];
    };
