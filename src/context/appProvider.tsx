import axios from 'axios';
import type { Dispatch, ReactElement, ReactNode } from 'react';
import { createContext, useEffect, useMemo, useReducer } from 'react';

import type { Book } from '../../types/library-types';
import { Actions } from './actions';
import { reducer } from './reducer';
import type { Action, State } from './types';

export const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Only run once
const useLoadInitialBooks = (dispatch: Dispatch<Action>): void => {
  useEffect(() => {
    const loadInitialBooks = async (): Promise<void> => {
      const response = await axios.get<Book[]>('/api/get-books');
      dispatch({ type: Actions.UpdateBooks, payload: response.data });
    };

    loadInitialBooks().catch(console.error);
  }, [dispatch]);
};

export function AppProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(reducer, {});
  const value = useMemo(() => ({ state, dispatch }), [state]);

  useLoadInitialBooks(dispatch);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
