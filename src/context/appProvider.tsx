import axios from 'axios';
import type { Dispatch, ReactElement, ReactNode } from 'react';
import { createContext, useEffect, useMemo, useReducer } from 'react';

import type { Book } from '../types/services';
import { reducer } from './reducer';
import type { Action, State } from './types';

export const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export function AppProvider({
  books = [],
  children,
}: {
  books?: Book[];
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(reducer, { books });
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
