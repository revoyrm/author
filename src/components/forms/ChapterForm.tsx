import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { getBookWithId } from '../../../pages/utilities/getBookWithId';
import { isBookFormData } from '../../types/forms';
import type { Book } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useBooks } from '../hooks/useBooks';
import { Form } from './Form';

export function ChapterForm({
  chapterId,
  initialValues,
  onCancel,
  onSubmit,
}: {
  chapterId?: number;
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
        if (chapterId) {
          const bookToUpdate = getBookWithId(chapterId, books);
          if (bookToUpdate) {
            await updateBook(bookToUpdate, {
              id: chapterId,
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
    [chapterId, books, createBook, onSubmit, updateBook]
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
