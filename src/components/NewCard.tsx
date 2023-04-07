import type { MouseEventHandler, ReactElement } from 'react';
import React from 'react';
import { BiPlusMedical } from 'react-icons/bi';

import { Card } from './layout/Card';

export function NewCard({
  label,
  onClick,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}): ReactElement {
  return (
    <Card onClick={onClick} onKeyDown={onClick}>
      <BiPlusMedical className="mx-auto flex-grow text-8xl" />
      <p className="self-center pb-4 text-xl font-bold">{label}</p>
    </Card>
  );
}
