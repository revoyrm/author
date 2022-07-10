import { Actions } from './actions';
import type { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SelectBook:
      return { ...state, selectedBook: action.payload };
    default:
      return state;
  }
};
