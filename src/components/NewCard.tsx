import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';
import React from 'react';
import { BiPlusMedical } from 'react-icons/bi';

import { Card } from './layout/Card';

export function NewCard({
  label,
  onEnter,
  onClick,
}: {
  label: string;
  onEnter: KeyboardEventHandler;
  onClick: MouseEventHandler<HTMLButtonElement>;
}): ReactElement {
  return (
    <Card onClick={onClick} onEnter={onEnter}>
      <BiPlusMedical className="mx-auto flex-grow text-8xl" />
      <p className="self-center pb-4 text-xl font-bold">{label}</p>
    </Card>
  );
}
