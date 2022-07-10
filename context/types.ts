import type { Book } from '../components/types';
import { Actions } from './actions';

export type State = {
  books?: Book[];
  selectedBook?: number;
};
export type Action = {
  type: Actions.SelectBook;
  payload?: number;
};
