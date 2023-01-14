import type { ReactElement } from 'react';

type CardsProps = { children: ReactElement[] };

export function Cards({ children }: CardsProps): ReactElement {
  return (
    <section className="m-4 mx-auto flex h-fit max-w-4xl flex-wrap justify-evenly">
      {children}
    </section>
  );
}
