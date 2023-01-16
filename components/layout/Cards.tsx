import type { ReactElement, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type CardsProps = { children: ReactElement[] };

export function Cards({ children }: CardsProps): ReactElement {
  return (
    <section className="m-4 grid h-fit w-fit justify-evenly bg-[red] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </section>
  );
}
