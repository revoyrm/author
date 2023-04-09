import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { isBookFormData } from '../../types/forms';
import type { Book } from '../../types/services';
import { getBookWithId } from '../../utilities/getBookWithId';
import { Button, Text, TextArea } from '../formControls';
import { useBooks } from '../hooks/useBooks';
import { Form } from './Form';

export function BookForm({
  bookId,
  initialValues,
  onCancel,
  onSubmit,
}: {
  bookId?: number;
  initialValues?: Book;
  onCancel?: () => void;
  onSubmit?: () => void;
}): ReactElement {
  const { books, createBook, updateBook } = useBooks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isBookFormData(data)) {
        setIsSubmitting(true);
        const { bookTitle, bookAuthor, bookSummary } = data;
        if (bookId) {
          const bookToUpdate = getBookWithId(bookId, books);
          if (bookToUpdate) {
            await updateBook(bookToUpdate, {
              title: bookTitle,
              author: bookAuthor,
              summary: bookSummary,
            });
          }
        } else {
          await createBook(bookTitle, bookAuthor, bookSummary);
        }
        setIsSubmitting(false);
        onSubmit?.();
      }
    },
    [bookId, books, createBook, onSubmit, updateBook]
  );

  const defaultValues = initialValues
    ? {
        bookTitle: initialValues.title,
        bookAuthor: initialValues.author,
        bookSummary: initialValues.summary,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Book Title" name="bookTitle" required />
      <Text className="mt-4" label="Author" name="bookAuthor" required />
      <TextArea className="mt-4" label="Summary" name="bookSummary" required />
      <div
        className={clsx('flex w-full', {
          'justify-between': onCancel,
          'justify-end': !onCancel,
        })}
      >
        {onCancel && (
          <Button
            className="mt-4 w-36"
            isLoading={false}
            isSubmit={false}
            label="Cancel"
            onClick={onCancel}
          />
        )}
        <Button
          className="mt-4 w-36"
          isLoading={isSubmitting}
          label="Submit"
          isSubmit
        />
      </div>
    </Form>
  );
}
