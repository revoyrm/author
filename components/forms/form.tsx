import type { ReactElement } from 'react';

export function Form({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement {
  return (
    <form className="mx-auto mt-4 h-fit w-5/6 rounded-xl bg-secondary px-8 py-4">
      {children}
    </form>
  );
}
