import Router from 'next/router';
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';
import React from 'react';

import type { Book } from '../types/services';
import { Card } from './layout/Card';

type BookItemCardProps = {
  header: string;
  body?: string;
  onClick: KeyboardEventHandler | MouseEventHandler;
};

export function BookItemCard({
  header,
  body,
  onClick,
}: BookItemCardProps): ReactElement {
  // todo fix event handler type
  return (
    <Card
      onClick={onClick as MouseEventHandler}
      onKeyDown={onClick as KeyboardEventHandler}
    >
      <h2 className="mb-1 font-bold">{header}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p>{body}</p>
    </Card>
  );
}
