import { useRouter } from 'next/router';
import type { MouseEvent, ReactElement } from 'react';
import { useCallback } from 'react';

import { ConfirmButton } from './ConfirmButton';
import { Card } from './layout/Card';

type BookItemCardProps = {
  id: number;
  bookId: string;
  header: string;
  body?: string;
  path: string;
  onDelete: (id: number, bookId?: string) => Promise<void>;
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
  const handleSelectBookItem = (): void => {
    Router.push(`/book/${bookId}/${path}/${id}`).catch(console.error);
  };

  const handleRemoveBookItem = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      onDelete(id, bookId).catch(console.error);
    },
    [bookId, id, onDelete]
  );

  return (
    <Card onClick={handleSelectBookItem} onEnter={handleSelectBookItem}>
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
