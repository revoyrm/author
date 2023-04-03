import type { ReactElement, ReactNode } from 'react';

type CardsProps = { children: ReactNode };

export function Cards({ children }: CardsProps): ReactElement {
  return (
    <section className="m-4 h-fit w-full @container/cards ">
      <div className="mx-auto grid h-full w-fit justify-evenly @lg/cards:grid-cols-2 @3xl/cards:grid-cols-3 @5xl/cards:grid-cols-4 @7xl/cards:grid-cols-5">
        {children}
      </div>
    </section>
  );
}
