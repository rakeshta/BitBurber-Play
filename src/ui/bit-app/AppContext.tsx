import { Context } from '/scripts/lib/context';
import { invariant } from '/scripts/lib/invariant';

import { React } from '/ui/lib/react';

// context -------------------------------------------------------------------------------------------------------------

/** App context type. */
export type AppContext = Context;

const AppContext = React.createContext<AppContext>({} as AppContext);

/** App context hook. */
export function useAppContext(): AppContext {
  const ctx = React.useContext(AppContext);
  invariant(ctx.ns, 'Not in an app context hierarchy');
  return ctx;
}

// provider ------------------------------------------------------------------------------------------------------------

export interface Props {
  ctx: Context;
  children?: React.ReactNode;
}

export function AppContextProvider({ ctx, children }: Props) {
  return <AppContext.Provider value={{ ...ctx }}>{children}</AppContext.Provider>;
}
