import { useRouter } from 'next/router';
import type {
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from 'react';
import { useCallback } from 'react';

import { ConfirmButton } from './ConfirmButton';
import { Card } from './layout/Card';

type BookItemCardProps = {
  id: number;
  bookId: string;
  header: string;
  body?: string;
  path: string;
  onDelete: (bookId: string, id: number) => Promise<void>;
};

export function BookItemCard({
  id,
  bookId,
  header,
  body,
  path,
  onDelete,
}: BookItemCardProps): ReactElement {
  const Router = useRouter();
  // todo fix event handler type
  const handleSelectBookItem = (): void => {
    Router.push(`/book/${bookId}/${path}/${id}`).catch(console.error);
  };

  const handleRemoveBookItem = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      onDelete(bookId, id).catch(console.error);
    },
    [bookId, id, onDelete]
  );

  return (
    <Card onClick={handleSelectBookItem} onKeyDown={handleSelectBookItem}>
      <h2 className="mb-1 font-bold">{header}</h2>
      <hr className="border-1 mb-1 border-primary-light bg-primary-light" />
      <p className="flex-grow">{body}</p>
      <ConfirmButton
        isSubmit={false}
        label="remove"
        onClick={handleRemoveBookItem}
      />
    </Card>
  );
}
