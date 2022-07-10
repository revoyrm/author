import type { Dispatch, ReactElement, ReactNode } from 'react';
import { createContext, useMemo, useReducer } from 'react';

import { reducer } from './reducer';
import type { Action, State } from './types';

export const AppContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(reducer, {});
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
